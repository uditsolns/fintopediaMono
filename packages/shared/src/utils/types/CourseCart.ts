import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";
import { OnErrorInterface, OnSuccessInterface } from "./roundLevel";

export interface CourseCartFields {
  id?: number;
  user_id?: number;
  course_id?: number;
  status?: string;
}

export interface CourseCartParams {
  params: CourseCartFields;
}
export interface CourseCartResponse {
  id: number;
  user_id: number;
  course_id: number;
  status: string;
  course?: CoursesResponse | null;
  user?: UserInfo | null;
}
export interface DeleteParams extends OnSuccessInterface, OnErrorInterface {
  id: number;
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
