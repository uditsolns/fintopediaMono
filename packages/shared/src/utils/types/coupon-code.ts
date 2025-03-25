import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CouponCodeParams {
  id?: number;
  course_id?: number;
  desc?: string;
  discount?: null | string;
  expiry_date?: string;
  discount_code?: string;
}

export interface CouponCodeResponse {
  id?: number;
  course_id?: number;
  desc?: string;
  discount: null | string;
  expiry_date: string;
  discount_code: string;
  course?: CoursesResponse;
}
export interface CouponCodeState {
  loading: {
    coupon_code: boolean;
    single_coupon_code: boolean;
    apply_coupon_code: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    coupon_code_err: any;
    single_coupon_code_err: any;
    apply_coupon_code_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  coupon_code: CouponCodeResponse[];
  single_coupon_code: CouponCodeResponse | null;
  apply_coupon_code: any;
  create: CouponCodeResponse | null;
  update: CouponCodeResponse | null;
  delete: string | null;
}
