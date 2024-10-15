import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CoursesSaveLaterFields {
  id?: number;
  user_id?: number;
  course_id?: number;
  status?: string;
}
export interface CoursesSaveLaterParams {
  params: CoursesSaveLaterFields;
}

export interface CoursesSaveLaterResponse {
  id: number;
  user_id: number;
  course_id: number;
  status?:string;
  user?: UserInfo;
  course?: CoursesResponse;
}
export interface CoursesSaveLaterState {
  loading: {
    courses_save_later: boolean;
    single_courses_save_later: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    courses_save_later_err: any;
    single_courses_save_later_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  courses_save_later: CoursesSaveLaterResponse[];
  single_courses_save_later: CoursesSaveLaterResponse | null;
  create: CoursesSaveLaterResponse | null;
  update: CoursesSaveLaterResponse | null;
  delete: string | null;
}
