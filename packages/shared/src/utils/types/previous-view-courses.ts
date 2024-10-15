import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface PreviousViewCoursesParams {
  id?: number;
  user_id?: number;
  course_id?: number;
}
export interface PreviousViewCoursesResponse {
  id: number;
  user_id: number;
  course_id: string;
  created_at: string;
  updated_at: string;
  user?: UserInfo;
  course?: CoursesResponse;
}
export interface PreviousViewCoursesState {
  loading: {
    previous_view_courses: boolean;
    single_previous_view_courses: boolean;
    create: boolean;
    update: boolean;
  };
  err: {
    previous_view_courses_err: any;
    single_previous_view_courses_err: any;
    create_err: any;
    update_err: any;
  };
  previous_view_courses: PreviousViewCoursesResponse[];
  single_previous_view_courses: PreviousViewCoursesResponse | null;
  create: PreviousViewCoursesResponse | null;
  update: PreviousViewCoursesResponse | null;
}
