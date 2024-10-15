import { UserInfo } from "./auth";
import { CategoriesResponse } from "./categories";
import { CoursesResponse } from "./courses";

export interface OngoingCoursesResponse {
  id: number;
  category_id: number;
  course_id: number;
  user_id: number;
  ongoing: number;
  created_at: string;
  updated_at: string;
  category?: CategoriesResponse;
  course?: CoursesResponse;
  user?: UserInfo;
}
export interface OngoingCoursesPararms {
  id?: number;
}
export interface OngoingCourseState {
  loading: {
    ongoing_courses: boolean;
    single_ongoing_courses: boolean;
    create: boolean;
    update: boolean;
  };
  err: {
    ongoing_courses_err: any;
    single_ongoing_courses_err: any;
    create_err: any;
    update_err: any;
  };
  ongoing_courses: OngoingCoursesResponse[];
  single_ongoing_courses: OngoingCoursesResponse | OngoingCoursesResponse | null;
  create: OngoingCoursesResponse | null;
  update: OngoingCoursesResponse | null;
}
