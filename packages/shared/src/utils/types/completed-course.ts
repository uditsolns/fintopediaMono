import { UserInfo } from "./auth";
import { CategoriesResponse } from "./categories";
import { CoursesResponse } from "./courses";

export interface CompletedCoursesResponse {
  id: number;
  category_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  category?: CategoriesResponse;
  course?: CoursesResponse;
  user?: UserInfo;
}
export interface CompletedCoursesPararms {
  id?: number;
}
export interface CompletedCourseState {
  loading: {
    completed_courses: boolean;
    single_completed_courses: boolean;
    create: boolean;
    update: boolean;
  };
  err: {
    completed_courses_err: any;
    single_completed_courses_err: any;
    create_err: any;
    update_err: any;
  };
  completed_courses: CompletedCoursesResponse[];
  single_completed_courses: CompletedCoursesResponse | null;
  create: CompletedCoursesResponse | null;
  update: CompletedCoursesResponse | null;
}
