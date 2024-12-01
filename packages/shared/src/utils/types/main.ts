export interface ISVGProps {
  color?: string;
  width?: number;
  height?: number;
  stroke?: number;
}

export interface FormModel {
  name: string;
  label: string;
  placeHolder: string;
  requiredErr: string;
}

export interface ImageType {
  name: string;
  type: string;
  uri?: string;
}

export type Paramkeys =
  | "phone"
  | "password"
  | "first_name"
  | "surname_name"
  | "phone"
  | "role"
  | "password"
  | "password_confirmation"
  | "email"
  | "college"
  | "token"
  | "password"
  | "password_confirmation"
  | "old_password"
  | "user_id"
  | "new_password"
  | "new_password_confirmation"
  | "id"
  | "first_name"
  | "email"
  | "phone"
  | "father_name"
  | "surname_name"
  | "dob"
  | "qualification"
  | "degree"
  | "10th_result"
  | "10th_school_name"
  | "12th_result"
  | "12th_college_name"
  | "grad_result"
  | "grad_school"
  | "postgrad_result"
  | "postgrad_school"
  | "extra_courses"
  | "job_preference"
  | "location"
  | "adhaar_num"
  | "pan_num"
  | "adhaar_file_upload"
  | "work_experience"
  | "age"
  | "res_address"
  | "gender"
  | "cv"
  | "wallet"
  | "feedback"
  | "headline"
  | "bio"
  | "linkedin"
  | "website_url"
  | "photo"
  | "game_id"
  | "user_id"
  | "stock_id"
  | "order_type"
  | "order_qty"
  | "total_price"
  | "stock_current_price"
  | "round_level"
  | "remarks"
  | "course_notes"
  | "user_id"
  | "course_id"
  | "rating"
  | "rating_desc"
  | "last_name"
  | "message"
  | "phone_no"
  | "email_id"
  | "designation"
  | "email"
  | "otp"
  | "new_password"
  | "new_password_confirmation"; 

export type ModelParams = Record<Paramkeys, FormModel>;
