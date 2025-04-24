import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { Platform } from "react-native";
import logger from "redux-logger";
import { errorMiddleware } from "./middleware/error.middleware";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth.reducer";
import usersReducer from "./reducers/user.reducer";
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
import courseCartReducer from "./reducers/CourseCart.reducer";
import purchaseHistoryReducer from "./reducers/PurchaseHistory.reducer";
import userCertificateReducer from "./reducers/UserCertificate.reducer";
import userCourseHistoryReducer from "./reducers/UserCourseHistory.reducer";
import startGameReducer from "./reducers/startgame.reducer";
import stopGameReducer from "./reducers/stopgame.reducer";
import checkNavigateReducer from "./reducers/checknavigate.reducer";
import coursesSaveLaterReducer from "./reducers/coursessavelater.reducer";
import notificationsReducer from "./reducers/notifications.reducer";
import courseNotesReducer from "./reducers/course-notes.reducer";
import courseReviewsReducer from "./reducers/course-review.reducer";
import courseUploadFileReducer from "./reducers/course-upload-file.reducer";
import ongoingCourseReducer from "./reducers/ongoing.course.reducer";
import ongoingCourseStatusReducer from "./reducers/ongoing.courses.status.reducer";
import completedCourseReducer from "./reducers/completed-course.reducer";
import previousViewCourseReducer from "./reducers/previous-view-course.reducer";
import couponCodeReducer from "./reducers/coupon-code.reducer";
import searchCoursesReducer from "./reducers/search-courses.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import likeCoursesReducer from "./reducers/course-like.reducer";
import contactReducer from "./reducers/contact.reducer";
import completionPercentageReducer from "./reducers/completion-percentage.reducer";
import coursesgetPurchaseReducer from "./reducers/coursesget-purchase.reducer";

const persistConfig: any = {
  key: "fintopedia",
  storage: storage, // Use platform-appropriate storage
  timeout: null,
  // ⛔️ Remove whitelist if persisting all reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  banner: bannerReducer,
  categories: categoriesReducer,
  college: collegesReducer,
  coursesSection: courseSectionsReducer,
  courses: coursesReducer,
  games: gamesReducer,
  gameUsers: gameusersReducer,
  news: newsReducer,
  roundLevel: roundLevelReducer,
  stockData: stockdatasReducer,
  stocks: stocksReducer,
  transactions: transactionsReducer,
  userTransactions: userTransactionsReducer,
  courseCart: courseCartReducer,
  purchaseHistory: purchaseHistoryReducer,
  userCertificate: userCertificateReducer,
  userCourseHistory: userCourseHistoryReducer,
  startGame: startGameReducer,
  stopGame: stopGameReducer,
  checkNavigate: checkNavigateReducer,
  coursesSaveLater: coursesSaveLaterReducer,
  notifications: notificationsReducer,
  courseNotes: courseNotesReducer,
  courseReviews: courseReviewsReducer,
  courseUploadFile: courseUploadFileReducer,
  ongoingCourse: ongoingCourseReducer,
  ongoingCourseStatus: ongoingCourseStatusReducer,
  completedCourse: completedCourseReducer,
  previousViewCourse: previousViewCourseReducer,
  searchCourses: searchCoursesReducer,
  couponCode: couponCodeReducer,
  likeCourse: likeCoursesReducer,
  contact: contactReducer,
  completionPercentage: completionPercentageReducer,
  coursesgetPurchase: coursesgetPurchaseReducer,
});

// 👇 Apply persistReducer at the root level
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = (getDefaultMiddleware: any) => {
  if (
    process.env.NODE_ENV === "development" ||
    (typeof __DEV__ !== "undefined" && __DEV__)
  ) {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(errorMiddleware, logger);
  }
  return getDefaultMiddleware({
    serializableCheck: false,
  }).concat(errorMiddleware);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);
