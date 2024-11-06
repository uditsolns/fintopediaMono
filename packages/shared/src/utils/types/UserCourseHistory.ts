import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface UserCourseHistoryParams {
  id?: number;
  user_id?: number;
  purchase_id?: number;
  course_id?: number;
  purchase_date?: string;
  status?: number;
}

export interface UserCourseHistoryResponse {
  id?: number;
  user_id?: number;
  purchase_id?: number;
  course_id?: number;
  purchase_date?: string;
  status?: number;
  user?: UserInfo | null;
  course?: CoursesResponse | null;
}
export interface UserCourseHistoryState {
  loading: {
    user_course_history: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    single_user_course_history:boolean
  };
  err: {
    user_course_history_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    single_user_course_history_err:any
  };
  user_course_history: UserCourseHistoryResponse[];
  single_user_course_history: UserCourseHistoryResponse | null;
  create: UserCourseHistoryResponse | null;
  update: UserCourseHistoryResponse | null;
  delete: string | null;
}
