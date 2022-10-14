import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getFinance: builder.query({
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheEntryRemoved, cacheDataLoaded }
      ) {
        const socket = io("http://localhost:4000");
        try {
          await cacheDataLoaded;
          socket.emit("start");
          socket.on("ticker", (data) => {
            updateCachedData(() => {
              return data;
            });
          });
        } catch {
          console.log("error");
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    
    addFinance: builder.mutation({
      query: (ticker) => ({
        url: "/",
        method: "POST",
        body: ticker,
      }),
      invalidatesTags: ["Finance"],
    }),

    removeFinance: builder.mutation({
      query: (ticker) => ({
        url: `/tickers/${ticker}`,
        method: "DELETE",
        body: ticker,
      }),
    }),
  }),
});

export const {
  useGetFinanceQuery,
  useAddFinanceMutation,
  useRemoveFinanceMutation,
} = financeApi;
