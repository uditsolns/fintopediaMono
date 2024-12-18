import { UserInfo } from "./auth";
import { CourseSections, CoursesResponse } from "./courses";

export interface OngoingCoursesFields {
  id?: number;
  user_id: number;
  course_id: number;
  section_id: number;
  sub_section_id: number;
  watching_status: string;
  course_percentage?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  user?: UserInfo;
  course?: CoursesResponse;
  courses_section?: CourseSections;
}

export interface OngoingCoursesParams {
  params: OngoingCoursesFields;
}
export interface OngoingCoursesResponse {
  id: number;
  user_id: number;
  course_id: number;
  section_id: number;
  sub_section_id: number;
  watching_status: string;
  course_percentage: string | null;
  created_at: string | null;
  updated_at: string | null;
  user?: UserInfo | null;
  course?: CoursesResponse | null;
  courses_section?: CourseSections | null;
}

export interface OngoingCoursesState {
  loading: {
    ongoing_courses: boolean;
    single_ongoing_courses: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    ongoing_courses_err: any;
    single_ongoing_courses_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  ongoing_courses: OngoingCoursesResponse[];
  single_ongoing_courses: OngoingCoursesResponse | null;
  create: OngoingCoursesResponse | null;
  update: OngoingCoursesResponse | null;
  delete: string | null;
}
