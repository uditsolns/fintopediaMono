import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CourseCartParams {
  id?: number;
  user_id?: number;
  cources_id?: number;
  status?: number;
}
export interface CourseCartResponse {
  id: number;
  user_id: number;
  cources_id: number;
  status: number;
  course?: CoursesResponse | null;
  user?: UserInfo | null;
}
export interface CourseCartState {
  loading: {
    courseCart: boolean;
    singleCourseCart: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    courseCartErr: any;
    singleCourseCartErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  courseCart: CourseCartResponse[];
  singleCourseCart: CourseCartResponse | null;
  create: CourseCartResponse | null;
  update: CourseCartResponse | null;
  delete: string | null;
}
