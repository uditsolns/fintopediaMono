const baseUrl = "https://nivada.in/hiring-management-backend/public/api/";
const version = "v1/";
export const ONESIGNAL_APP_ID = "68193542-f006-48da-8ed9-34111ef4cd74";
export const OTPLESS_APP_ID = "8TU4ZOYC6S9Q6VMC5LLF";

const buildUrl = (endpoint: string) => {
  return `${baseUrl}${version}${endpoint}`;
};

export default {
  AUTH: {
    LOGIN: buildUrl("login"),
    SIGNUP: buildUrl("register"),
    FORGOT: buildUrl("forget-password"),
    FORGOTCONFIRM: buildUrl("update-password"),
    GOOGLE: buildUrl("google-login"),
    VERIFYOTP: buildUrl("verifyOtp"),
    VERIFYMOBILENUMBER: buildUrl("verify_mobileno"),
    OTPLOGIN: buildUrl("login_otp"),
  },
  USER: {
    GET: buildUrl("users"),
    UPDATE: buildUrl("users"),
    DELETE: buildUrl("users"),
  },
  CATEGORIES: {
    GET: buildUrl("categories_open"),
    POST: buildUrl("categories"),
    UPDATE: buildUrl("categories"),
    DELETE: buildUrl("categories"),
  },
  COURSES: {
    GET: buildUrl("coursesget"),
    POST: buildUrl("courses"),
    UPDATE: buildUrl("courses"),
    DELETE: buildUrl("courses"),
  },
  COURSE_SECTIONS: {
    GET: buildUrl("courses_sections"),
    POST: buildUrl("courses_sections"),
    UPDATE: buildUrl("courses_sections_update"),
    DELETE: buildUrl("courses_sections"),
  },
  COURSES_RATING_REVIEWS: {
    GET: buildUrl("courses_rating_reviews_open"),
    POST: buildUrl("courses_rating_reviews"),
    UPDATE: buildUrl("courses_rating_reviews"),
    DELETE: buildUrl("courses_rating_reviews"),
  },
  COURSE_ADD_TO_CART: {
    GET: buildUrl("course_add_cart"),
    POST: buildUrl("course_add_cart"),
    UPDATE: buildUrl("course_add_cart"),
    DELETE: buildUrl("course_add_cart"),
  },
  PURCHASE_HISTORY: {
    GET: buildUrl("purchase_history"),
    POST: buildUrl("purchase_history"),
    UPDATE: buildUrl("purchase_history"),
    DELETE: buildUrl("purchase_history"),
  },
  USER_COURSE_HISTORY: {
    GET: buildUrl("user_course_history"),
    POST: buildUrl("user_course_history"),
    UPDATE: buildUrl("user_course_history"),
    DELETE: buildUrl("user_course_history"),
  },
  USER_CERTIFICATE: {
    GET: buildUrl("user_certificate"),
    POST: buildUrl("user_certificate"),
    UPDATE: buildUrl("user_certificate"),
    DELETE: buildUrl("user_certificate"),
  },
  DOWNLOAD_CERTIFICATE: {
    GET: buildUrl("downloadcertificate"),
  },
  COURSE_SAVE_LATER: {
    GET: buildUrl("courses_save_later"),
    POST: buildUrl("courses_save_later"),
    UPDATE: buildUrl("courses_save_later"),
    DELETE: buildUrl("courses_save_later"),
  },
  NOTIFICATION: {
    GET: buildUrl("notifications"),
    POST: buildUrl("notifications"),
    UPDATE: buildUrl("notifications"),
    DELETE: buildUrl("notifications"),
  },
  BANNERS: {
    GET: buildUrl("banners"),
    POST: buildUrl("banners"),
    UPDATE: buildUrl("banners"),
    DELETE: buildUrl("banners"),
  },
  COLLEGES: {
    GET: buildUrl("colleges_open"),
    POST: buildUrl("colleges"),
    UPDATE: buildUrl("colleges"),
    DELETE: buildUrl("colleges"),
  },
  GAMES: {
    GET: buildUrl("games"),
    POST: buildUrl("games"),
    UPDATE: buildUrl("games"),
    DELETE: buildUrl("games"),
  },
  NEWS: {
    GET: buildUrl("news"),
    POST: buildUrl("news"),
    UPDATE: buildUrl("news"),
    DELETE: buildUrl("news"),
  },
  ROUND_LEVEL_GAMES: {
    GET: buildUrl("round-level-games"),
    POST: buildUrl("round-level-games"),
    UPDATE: buildUrl("round-level-games"),
    DELETE: buildUrl("round-level-games"),
  },
  STOCK_DATAS: {
    GET: buildUrl("stock-datas"),
    POST: buildUrl("stock-datas"),
    UPDATE: buildUrl("stock-datas"),
    DELETE: buildUrl("stock-datas"),
  },
  STOCKS: {
    GET: buildUrl("stocks"),
    POST: buildUrl("stocks"),
    UPDATE: buildUrl("stocks"),
    DELETE: buildUrl("stocks"),
  },
  GAME_USER: {
    GET: buildUrl("game-user"),
  },
  GAME_USERS: {
    GET: buildUrl("game-users"),
    POST: buildUrl("game-users"),
    UPDATE: buildUrl("game-users"),
    DELETE: buildUrl("game-users"),
  },
  TRANSACTIONS: {
    GET: buildUrl("transactions"),
    POST: buildUrl("transactions"),
    UPDATE: buildUrl("transactions"),
    DELETE: buildUrl("transactions"),
  },
  USER_TRANSACTIONS: {
    GET: buildUrl("user-transactions"),
    POST: buildUrl("user-transactions"),
    UPDATE: buildUrl("user-transactions"),
    DELETE: buildUrl("user-transactions"),
  },
  STOP_GAME: {
    GET: buildUrl("stop-game"),
    POST: buildUrl("stop-game"),
    UPDATE: buildUrl("stop-game"),
    DELETE: buildUrl("stop-game"),
  },
  START_GAME: {
    GET: buildUrl("start-game"),
    POST: buildUrl("start-game"),
    UPDATE: buildUrl("start-game"),
    DELETE: buildUrl("start-game"),
  },
  SEARCH_COURSES: {
    GET: buildUrl("course_search"),
    POST: buildUrl("course_search"),
    UPDATE: buildUrl("course_search"),
    DELETE: buildUrl("course_search"),
  },
  PREVIOUS_VIEW_COURSES: {
    GET: buildUrl("course_user_view"),
    POST: buildUrl("course_user_view"),
    UPDATE: buildUrl("course_user_view"),
    DELETE: buildUrl("course_user_view"),
  },
  ONGOING_COURSES: {
    GET: buildUrl("ongoings"),
    POST: buildUrl("ongoings"),
    UPDATE: buildUrl("ongoings"),
    DELETE: buildUrl("ongoings"),
  },
  ONGOING_COURSES_STATUS: {
    GET: buildUrl("ongoing_status"),
    POST: buildUrl("ongoing_status"),
    UPDATE: buildUrl("ongoing_status"),
    DELETE: buildUrl("ongoing_status"),
  },
  COMPLETED_COURSES: {
    GET: buildUrl("completed-courses"),
    POST: buildUrl("completed-courses"),
    UPDATE: buildUrl("completed-courses"),
    DELETE: buildUrl("completed-courses"),
  },
  COUPON_CODE: {
    GET: buildUrl("coupon_code"),
    POST: buildUrl("coupon_code"),
    UPDATE: buildUrl("coupon_code"),
    DELETE: buildUrl("coupon_code"),
    APPLY_COUPON_CODE: buildUrl("coupon_code_apply"),
  },
  COURSE_NOTES: {
    GET: buildUrl("courses_notes"),
    POST: buildUrl("courses_notes"),
    UPDATE: buildUrl("courses_notes"),
    DELETE: buildUrl("courses_notes"),
  },
  COURSE_REVIEW: {
    GET: buildUrl("course-review"),
    POST: buildUrl("course-review"),
    UPDATE: buildUrl("course-review"),
    DELETE: buildUrl("course-review"),
  },
  COURSE_UPLOAD_FILE: {
    GET: buildUrl("course_upload_file"),
    POST: buildUrl("course_upload_file"),
    UPDATE: buildUrl("course_upload_file"),
    DELETE: buildUrl("course_upload_file"),
  },
  COURSE_SECTION: {
    GET: buildUrl("course-section"),
    POST: buildUrl("course-section"),
    UPDATE: buildUrl("course-section"),
    DELETE: buildUrl("course-section"),
  },
  COURSE_LIKE: {
    GET: buildUrl("course_like"),
    POST: buildUrl("course_like"),
    UPDATE: buildUrl("course_like"),
    DELETE: buildUrl("course_like"),
  },
  CONTACT_SUPPORT: {
    GET: buildUrl("contact_support"),
    POST: buildUrl("contact_support"),
    UPDATE: buildUrl("contact_support"),
    DELETE: buildUrl("contact_support"),
  },
  COMPLETION_PERCENTAGE: {
    GET: buildUrl("CompletionPercentage"),
    POST: buildUrl("CompletionPercentage"),
    UPDATE: buildUrl("CompletionPercentage"),
    DELETE: buildUrl("CompletionPercentage"),
  },
  COURSE_PURCHASE: {
    GET: buildUrl("coursesget_purchase"),
    POST: buildUrl("coursesget_purchase"),
    UPDATE: buildUrl("coursesget_purchase"),
    DELETE: buildUrl("coursesget_purchase "),
  },
};
