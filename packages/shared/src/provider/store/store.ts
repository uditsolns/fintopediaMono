import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";
import { errorMiddleware } from "./middleware/error.middleware";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth.reducer";
import bannerReducer from "./reducers/banner.reducer";
import categoriesReducer from "./reducers/categories.reducer";
import collegesReducer from "./reducers/colleges.reducer";
import courseSectionsReducer from "./reducers/courseSections.reducer";
import coursesReducer from "./reducers/courses.reducer";
import gamesReducer from "./reducers/games.reducer";
import gameusersReducer from "./reducers/gameusers.reducer";
import newsReducer from "./reducers/news.reducer";
import roundLevelReducer from "./reducers/roundlevelgames.reducer";
import stockdatasReducer from "./reducers/stockdatas.reducer";
import stocksReducer from "./reducers/stocks.reducer";
import transactionsReducer from "./reducers/transactions.reducer";
import userTransactionsReducer from "./reducers/usertransactions.reducer";
import courseCartReducer from "./reducers/coursecart.reducer";
import coursesRatingReviewsReducer from "./reducers/CoursesRatingReviews.reducer";
import purchaseHistoryReducer from "./reducers/purchasehistory.reducer";
import userCertificateReducer from "./reducers/UserCertificate.reducer";
import userCourseHistoryReducer from "./reducers/UserCourseHistory.reducer";
import startGameReducer from "./reducers/startgame.reducer";
import stopGameReducer from "./reducers/stopgame.reducer";
import checkNavigateReducer from './reducers/checknavigate.reducer';
import coursesSaveLaterReducer from './reducers/coursessavelater.reducer';
import notificationsReducer from './reducers/notifications.reducer';

const isNative = Platform.OS !== "web";

const persistConfig: any = {
  key: "fintopedia",
  storage: AsyncStorage,
  timeout: null,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  banner: bannerReducer,
  categories: categoriesReducer,
  college: collegesReducer,
  coursesSection: courseSectionsReducer,
  courses: coursesReducer,
  games: gamesReducer,
  gameUsers: gameusersReducer,
  news: newsReducer,
  roundLevel: persistReducer(persistConfig, roundLevelReducer),
  stockData: stockdatasReducer,
  stocks: stocksReducer,
  transactions: transactionsReducer,
  userTransactions: userTransactionsReducer,
  courseCart: courseCartReducer,
  coursesRatingReviews: coursesRatingReviewsReducer,
  purchaseHistory: purchaseHistoryReducer,
  userCertificate: userCertificateReducer,
  userCourseHistory: userCourseHistoryReducer,
  startGame: startGameReducer,
  stopGame: stopGameReducer,
  checkNavigate:checkNavigateReducer,
  coursesSaveLater:coursesSaveLaterReducer,
  notifications:notificationsReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(errorMiddleware,logger),
});

export const persistor = persistStore(store);
