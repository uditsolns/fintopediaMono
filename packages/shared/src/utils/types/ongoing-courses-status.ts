import { OngoingCoursesResponse } from "./ongoing-course";

export interface OngoingCoursesStatusResponse {
  ongoing: OngoingCoursesResponse;
  sections: [];
}
export interface OngoingCoursesStatusPararms {
  id?: number;
} 
export interface OngoingCourseStatusState {
  loading: {
    ongoing_courses_status: boolean;
    single_ongoing_courses_status: boolean;
    create: boolean;
    update: boolean;
  };
  err: {
    ongoing_courses_status_err: any;
    single_ongoing_courses_status_err: any;
    create_err: any;
    update_err: any;
  };
  ongoing_courses_status: OngoingCoursesStatusResponse[];
  single_ongoing_courses_status:
    | OngoingCoursesStatusResponse
    | OngoingCoursesStatusResponse
    | null;
  create: OngoingCoursesStatusResponse | null;
  update: OngoingCoursesStatusResponse | null;
}
