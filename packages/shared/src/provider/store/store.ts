
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorMiddleware } from "./middleware/error.middleware";
import authReducer from "./reducers/auth.reducer";
import bannerReducer from './reducers/banner.reducer';
import storage from "redux-persist/lib/storage";

const isNative = Platform.OS !== 'web';
const chosenStorage = isNative ? AsyncStorage : storage;

const persistConfig: any = {
  key: "fintopedia",
  storage: chosenStorage,
  timeout: null,
  whitelist: ['auth']
};

const reducers = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  banner:bannerReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(errorMiddleware),
});

export const persistor = persistStore(store);
