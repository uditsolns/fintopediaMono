"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { errorMiddleware } from "./middleware/error.middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./reducers/auth.reducer";

// let storage;

// if (typeof window !== "undefined") {
//   // We are in the browser environment
//   storage = require("redux-persist/lib/storage").default;
// } else {
//   // We are in the React Native environment
//   storage = require("@react-native-async-storage/async-storage").default;
// }

const persistConfig: any = {
  key: "hurd",
  storage: AsyncStorage,
  timeout: null,
};

const reducers = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(errorMiddleware),
});

export const persistor = persistStore(store);
