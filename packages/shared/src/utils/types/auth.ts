import { UserTransactionsResponse } from "./user-transactions";

export interface AuthState {
  loading: {
    login: boolean;
    signup: boolean;
    signout: boolean;
    forgot: boolean;
    confirm: boolean;
    google_login: boolean;
    verifyOtp: boolean;
  };
  err: {
    loginErr: any;
    signupErr: any;
    signoutErr: any;
    forgotErr: any;
    confirmErr: any;
    google_login_err: any;
    verifyOtpErr: any;
  };
  token?: string | null;
  auth: AuthResponse | null;
  signup: AuthResponse | null;
  forgot: any;
  confirm: any;
  current_user: UserInfo | null;
  verifyOtp: VerifyOtpResponse | null;
}

export interface AuthParams {
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: UserInfo;
  token: string;
}
// export interface AuthErrorResponse {
//   message: string;
// }

export interface UpdatePasswordResponse {
  code: number;
  status: string;
  status_message: string;
}

export interface ForgotPasswordResponse {
  code: number;
  status: string;
  status_message: string;
  email: string;
  otp: number;
}
export interface VerifyOtpParams {
  email: string;
  otp: number;
  new_password: string;
  new_password_confirmation: string;
}
export interface VerifyOtpResponse {
  code: number;
  status: string;
  status_message: string;
}
export interface UserInfo {
  id: number;
  first_name: string;
  email: string;
  phone: string;
  role: string;
  father_name: string;
  surname_name: string;
  dob: string;
  qualification: string;
  degree: string;
  "10th_result": string;
  "12th_result": string;
  "12th_college_name": string;
  "10th_school_name": string;
  grad_result: string;
  grad_school: string;
  postgrad_result: string;
  postgrad_school: string;
  extra_courses: string;
  job_preference: string;
  location: string;
  adhaar_num: string;
  pan_num: string;
  adhaar_file_upload: string;
  work_experience: string;
  age: null;
  res_address: string;
  gender: string;
  cv: string;
  email_verified_at: null;
  is_degree_completed: string;
  is_approved: string;
  is_active: string;
  created_at: string;
  updated_at: string;
  wallet: string;
  forget_password_token: string;
  is_google_login: string;
  feedback: null;
  college: null;
  designation?: null | string;
  user_transactions?: UserTransactionsResponse[] | null;
  bio?: null | string;
  headline?: null | string;
  linkedin?: null | string;
  website_url?: null | string;
  photo?: string | null;
}

export interface SignupParams {
  first_name: string;
  surname_name: string;
  phone: string;
  role: string;
  password: string;
  password_confirmation: string;
  email: string;
  college_id: string;
  designation: string;
}

export interface ForgotPasswordParams {
  email: string;
}
export interface OnSuccessInterface {
  onSuccess: (data: any) => void;
}
export interface OnErrorInterface {
  onError: (error: any) => void;
}
export interface ResetPasswordParams {
  token?: string;
  password?: string;
  confirmation_password?: string;
}
export interface ResetPasswordParams2 {
  email: string;
  otp: number;
  new_password: string;
  new_password_confirmation: string;
}
export interface UpdatePasswordParams {
  // old_password?: string;
  user_id: string;
  new_password?: string;
  new_password_confirmation?: string;
}
export interface UserUpdateParams {
  id?: number;
  first_name?: string;
  email?: string;
  phone?: string;
  father_name?: string;
  surname_name?: string;
  dob?: string;
  qualification?: string;
  degree?: string;
  "10th_result"?: string;
  "12th_result"?: string;
  "12th_college_name"?: string;
  "10th_school_name"?: string;
  grad_result?: string;
  grad_school?: string;
  postgrad_result?: string;
  postgrad_school?: string;
  extra_courses?: string;
  job_preference?: string;
  location?: string;
  adhaar_num?: string;
  pan_num?: string;
  adhaar_file_upload?: string;
  work_experience?: string;
  age?: string;
  res_address?: string;
  gender?: string;
  cv?: string;
  feedback?: null | string;
  bio?: null | string;
  headline?: null | string;
  linkedin?: null | string;
  website_url?: null | string;
  designation?: null | string;
  photo?: string | null;
}

export interface BuySellParams {
  id?: number;
  game_id?: number;
  user_id: number;
  stock_id: number;
  order_type: string;
  order_qty: number;
  total_price: number;
  stock_current_price: number;
  round_level: number;
}
