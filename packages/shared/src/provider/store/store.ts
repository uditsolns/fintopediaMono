"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorMiddleware } from "./middleware/error.middleware";
import authReducer from "./reducers/auth.reducer";
import storage from "redux-persist/lib/storage";

// let storage;

// if (typeof window !== "undefined") {
//   // We are in the browser environment
//   storage = require("redux-persist/lib/storage").default;
// } else {
//   // We are in the React Native environment
//   storage = require("@react-native-async-storage/async-storage").default;
// }

const persistConfig: any = {
  key: "fintopedia",
  storage,
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
