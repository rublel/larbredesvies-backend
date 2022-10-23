/*
  main store file
*/

import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import logger from "redux-logger";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
