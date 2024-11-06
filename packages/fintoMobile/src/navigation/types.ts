import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CoursesResponse} from '@shared/src/utils/types/courses';

export interface StackParams extends ParamListBase {
  Home: undefined;
  Onboarding: undefined;
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  EmailVerification: undefined;
  TwoFAuth: undefined;
  Otp: undefined;
  Search: undefined;
  Notification: undefined;
  Cart: undefined;
  FilterByCourse: undefined;
  CourseCategory: undefined;
  Coupon: undefined;
  Checkout: undefined;
  Billing: undefined;
  PaymentSuccess: undefined;
  DontKnowWhereToStart: undefined;
  BeforeEnrollingCourseDetails: {course?: CoursesResponse; id?: number};
  AfterEnrollingCourseDetails: {course?: CoursesResponse; id?: number};
  ProfileDetails: undefined;
  Certifications: undefined;
  ReferandEarn: undefined;
  MembershipType: undefined;
  ChangePassword: undefined;
  PurchaseHistory: undefined;
  ContactUs: undefined;
  GameWaiting: undefined;
  GameHome: undefined;
  Trade: undefined;
  LatestNews: undefined;
  Portfolio: undefined;
  History: undefined;
  PreviousRoundPrice: undefined;
  BuyStocks: undefined;
  SellStocks: undefined;
  GameWinnerLoading: undefined;
  GameWinner: undefined;
  MockTradeBuyStocks: undefined;
  MockTradeSellStocks: undefined;
  ViewPdf: undefined;
}
export interface TabParams extends ParamListBase {
  HomeTab: undefined;
  MyCourses: undefined;
  MockTrade: undefined;
  Events: undefined;
  Account: undefined;
}

export type TabNav<T extends keyof TabParams> = BottomTabScreenProps<
  TabParams,
  T
>;

export type NavType<T extends keyof StackParams> = NativeStackScreenProps<
  StackParams,
  T
>;
