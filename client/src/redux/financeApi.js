import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getSocket from "../socket";

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
        const socket = getSocket();
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
      queryFn(arg) {
        getSocket().emit("addTicker", arg);
        return {data : null};
      }
    }),

    removeFinance: builder.mutation({
      queryFn(arg) {
        getSocket().emit("removeTicker", arg);
        return {data : null};
      }
    }),
  }),
});

export const {
  useGetFinanceQuery,
  useAddFinanceMutation,
  useRemoveFinanceMutation,
} = financeApi;
