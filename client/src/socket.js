import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:4000";

let socket;

const getSocket = function () {
  if (!socket) {
    console.log("CREATING NEW SOCKET");
    socket = io(SERVER_URL);
  }
  return socket;
};

export default getSocket;
