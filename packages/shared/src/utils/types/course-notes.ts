import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CourseNotesParams {
  id?: number;
  course_id?: number;
  user_id?: number;
  note_desc: null | string;
}

export interface CourseNotesResponse {
  id?: number;
  course_id?: number;
  user_id?: number;
  note_desc: null | string;
  course?: CoursesResponse;
  user?: UserInfo;
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
