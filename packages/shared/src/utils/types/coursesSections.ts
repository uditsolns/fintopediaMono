import { CoursesResponse } from "./courses";

export interface CoursesSectionParams {
  id?: number;
  course_id?: number;
  section_number?: string | number
  section_heading?: string;
  section_topics?: string;
  section_time?: number;
  video?: File;
  text?: string;
  notes?: string;
}
export interface CoursesSectionResponse {
  id: number;
  course_id: number;
  section_number: string | number
  section_heading: string;
  section_topics: string;
  section_time: number;
  video: File;
  text: string;
  notes: string;
  course?: CoursesResponse | null;
}
export interface CoursesSectionState {
  loading: {
    coursesSection: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    singleCourseSection: boolean;
  };
  err: {
    coursesSectionErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    singleCourseSectionErr: any;
  };
  coursesSection: CoursesSectionResponse[];
  singleCourseSection: CoursesSectionResponse | null;
  create: CoursesSectionResponse | null;
  update: CoursesSectionResponse | null;
  delete: string | null;
}
