import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CourseUploadFileFields {
  id?: number;
  course_id?: number;
  user_id?: string;
  upload_file: null | File | string;
}
export interface CourseUploadFileParams {
  params: CourseUploadFileFields;
}
export interface CourseUploadFileResponse {
  id?: number;
  course_id?: number;
  user_id?: string;
  upload_file: null | File | string;
  course?: CoursesResponse;
  user?: UserInfo;
}
export interface CourseUploadFileState {
  loading: {
    upload_file: boolean;
    single_upload_file: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    upload_file_err: any;
    single_upload_file_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  upload_file: CourseUploadFileResponse[];
  single_upload_file: CourseUploadFileResponse | null;
  create: CourseUploadFileResponse | null;
  update: CourseUploadFileResponse | null;
  delete: string | null;
}
