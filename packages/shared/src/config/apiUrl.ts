const baseUrl = "http://nivada.in/hiring-management-backend/public/api/";
const version = "v1/";

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
  },
  USER: {
    GET: buildUrl("users"),
    UPDATE: buildUrl("users/"),
    DELETE: buildUrl("users/"),
  },
  CATEGORIES: {
    GET: buildUrl("categories"),
    POST: buildUrl("categories/"),
    UPDATE: buildUrl("categories/"),
    DELETE: buildUrl("categories/"),
  },
  COURSES: {
    GET: buildUrl("courses"),
    POST: buildUrl("courses/"),
    UPDATE: buildUrl("courses/"),
    DELETE: buildUrl("courses/"),
  },
  COURSE_SECTIONS: {
    GET: buildUrl("courses_sections"),
    POST: buildUrl("courses_sections/"),
    UPDATE: buildUrl("courses_sections_update/"),
    DELETE: buildUrl("courses_sections/"),
  },
  COURSES_RATING_REVIEWS: {
    GET: buildUrl("courses_rating_reviews"),
    POST: buildUrl("courses_rating_reviews/"),
    UPDATE: buildUrl("courses_rating_reviews/"),
    DELETE: buildUrl("courses_rating_reviews/"),
  },
  COURSE_ADD_TO_CART: {
    GET: buildUrl("course_add_cart"),
    POST: buildUrl("course_add_cart/"),
    UPDATE: buildUrl("course_add_cart/"),
    DELETE: buildUrl("course_add_cart/"),
  },
  PURCHASE_HISTORY: {
    GET: buildUrl("purchase_history"),
    POST: buildUrl("purchase_history/"),
    UPDATE: buildUrl("purchase_history/"),
    DELETE: buildUrl("purchase_history/"),
  },
  USER_COURSE_HISTORY: {
    GET: buildUrl("user_course_history"),
    POST: buildUrl("user_course_history/"),
    UPDATE: buildUrl("user_course_history/"),
    DELETE: buildUrl("user_course_history/"),
  },
  USER_CERTIFICATE: {
    GET: buildUrl("user_certificate"),
    POST: buildUrl("user_certificate/"),
    UPDATE: buildUrl("user_certificate/"),
    DELETE: buildUrl("user_certificate/"),
  },
  COURSE_SAVE_LATER: {
    GET: buildUrl("courses_save_later"),
    POST: buildUrl("courses_save_later/"),
    UPDATE: buildUrl("courses_save_later/"),
    DELETE: buildUrl("courses_save_later/"),
  },
  NOTIFICATION: {
    GET: buildUrl("notifications"),
    POST: buildUrl("notifications/"),
    UPDATE: buildUrl("notifications/"),
    DELETE: buildUrl("notifications/"),
  },
};
