import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { financeApi } from "./financeApi";

export const store = configureStore({
  reducer: {
    [financeApi.reducerPath]: financeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    financeApi.middleware,
  ],
});

setupListeners(store.dispatch);