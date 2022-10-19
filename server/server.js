"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

let timer;

const tickers = new Map([
  ["AAPL", "Apple"],
  ["GOOGL", "Alphabet"],
  ["MSFT", "Microsoft"],
  ["AMZN", "Amazon"],
  ["FB", "Facebook"],
  ["TSLA", "Tesla"],
]);

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes() {
  const quotes = Array.from(tickers).map(([ticker, displayName]) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
    displayName,
  }));

  socketServer.emit("ticker", quotes);
}

function trackTickers(socket, delay) {
  if (timer !== undefined) {
    clearInterval(timer);
  } else {
    // run the first time immediately
    getQuotes();
  }
  console.log(`SETTING THE DELAY TO ${delay}`);
  // every N seconds
  timer = setInterval(function () {
    getQuotes();
  }, delay);

  socket.on("disconnect", function () {
    console.log("DISCONNECT");
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    console.log("CONNECTION STARTED");
    trackTickers(socket, FETCH_INTERVAL);
  });

  socket.on("changeDelay", (arg) => {
    console.log(`RECEIVED ${arg}`);
    if (arg > 0) {
      trackTickers(socket, arg * 1000);
    } else {
      console.warn(`${arg} is an invalid delay`);
    }
  });

  socket.on("addTicker", (arg) => {
    console.log(`Adding ticker ${JSON.stringify(arg)}`);
    if (tickers.has(arg.ticker)) {
      console.warn(`Can't add ${arg.ticker}: ticker already exists`);
    } else {
      tickers.set(arg.ticker, arg.displayName);
      getQuotes();
    }
  });

  socket.on("removeTicker", (arg) => {
    if (!tickers.delete(arg)) {
      console.warn(`Failed to delete ${arg}`);
    } else {
      console.log(`Removing ticker ${arg}`);
      getQuotes();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
