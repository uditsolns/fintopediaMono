import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface LikeCoursesFields {
  id?: number;
  user_id: number;
  course_id: number;
  status: string;
}

export interface LikeCoursesParams {
  params: LikeCoursesFields;
}
export interface LikeCoursesResponse {
  id?: number;
  course_id: number;
  user_id: number;
  status: string;
  course?: CoursesResponse | null;
  user?: UserInfo | null;
}

export interface LikeCoursesState {
  loading: {
    likeCourse: boolean;
    singleLikeCourse: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    likeCourseErr: any;
    singleLikeCourseErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  likeCourse: LikeCoursesResponse[];
  singleLikeCourse: LikeCoursesResponse | null;
  create: LikeCoursesResponse | null;
  update: LikeCoursesResponse | null;
  delete: string | null;
}
