import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CourseReviewParams {
  id?: number;
  course_id?: number;
  user_id?: string;
  rating: null| string;
  rating_desc: null| string;
}

export interface CourseReviewResponse {
  id?: number;
  course_id?: number;
  user_id?: string;
  rating: null| string;
  rating_desc: null| string;
  course?: CoursesResponse;
  user?: UserInfo;
}
export interface CourseReviewState {
  loading: {
    course_review: boolean;
    single_course_review: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    course_review_err: any;
    single_course_review_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  course_review: CourseReviewResponse[];
  single_course_review: CourseReviewResponse | null;
  create: CourseReviewResponse | null;
  update: CourseReviewResponse | null;
  delete: string | null;
}
