import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CourseNotesFields {
  id?: number;
  course_id?: number;
  user_id?: number;
  notes: null | string;
}

export interface CourseNotesParams {
  params: CourseNotesFields;
}
export interface CourseNotesResponse {
  id?: number;
  course_id?: number;
  user_id?: number;
  notes: null | string;
  course?: CoursesResponse;
  user?: UserInfo;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface CourseNotesState {
  loading: {
    course_notes: boolean;
    single_course_notes: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    course_notes_err: any;
    single_course_notes_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  course_notes: CourseNotesResponse[];
  single_course_notes: CourseNotesResponse | null;
  create: CourseNotesResponse | null;
  update: CourseNotesResponse | null;
  delete: string | null;
}
