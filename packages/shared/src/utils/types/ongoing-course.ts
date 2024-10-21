import { UserInfo } from "./auth";
import { CategoriesResponse } from "./categories";
import { CourseSections, CoursesResponse } from "./courses";

export interface OngoingCoursesResponse {
  id: number;
  user_id: number;
  course_id: number;
  section_id: number;
  course_percentage: string | null;
  created_at: string | null;
  updated_at: string | null;
  user?: UserInfo;
  course?: CoursesResponse;
  courses_section?: CourseSections;
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
  single_ongoing_courses:
    | OngoingCoursesResponse
    | OngoingCoursesResponse
    | null;
  create: OngoingCoursesResponse | null;
  update: OngoingCoursesResponse | null;
}
