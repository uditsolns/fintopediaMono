import { CategoriesResponse } from "./categories";

export interface GetCourseIdParams {
  id: number;
}
export interface CoursesParams {
  id?: number;
  category_id?: number;
  name?: string;
  description?: string;
  sale_price?: number;
  actual_price?: number;
  duration_time?: number;
  total_section?: number;
  total_topics?: number;
  course_language?: string;
  course_image?: File;
  course_video?: File;
  resources?: string;
  rating?: number | string;
  course_type?: string;
  reviews?: number;
  is_popular?: number;
  resource_file_upload?: File | string | null;
  offer_start_date?: string;
  offer_end_date?: string;
  offer_status?: string;
}
export interface ResourcesResponse {
  id: number;
  course_id: number;
  resource_file: string | null;
  created_at: string | null;
  course?: CoursesResponse;
}
interface VideoEmbed {
  otp: string;
  playbackInfo: string;
}
export interface CourseSubSections {
  id: number;
  section_id: number;
  subsection_heading: string | null;
  subsection_time: string | null;
  sub_video: string | null;
  sub_video_embed: VideoEmbed;
  subsection_number: string | number | null;
}
export interface CourseSections {
  id: number;
  course_id: number;
  section_number: number | string;
  section_heading: string | null;
  section_topics: string | null;
  section_time: string | null;
  video: string | null;
  text: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  subsections: CourseSubSections[];
}

export interface CourseEmbedvideo {
  otp: string | null;
  playbackInfo: string | null;
}
export interface CoursesResponse {
  id: number;
  category_id: number;
  name: string;
  description: string;
  sale_price: string | number;
  actual_price: string | number;
  duration_time: string | null;
  total_section: string | number;
  total_topics: string | number;
  course_language: string;
  course_image: string | null;
  course_video: string | null;
  resources?: ResourcesResponse[];
  rating: string | null;
  course_type: string | null;
  reviews: string | null;
  is_popular: number;
  resource_file_upload: null | string;
  about_me: null | string;
  created_at: string;
  updated_at: string;
  course_video_embed: VideoEmbed;
  category?: CategoriesResponse | null;
  sections?: CourseSections[];
  offer_start_date?: string;
  offer_end_date?: string;
  offer_status?: string;
  // course_video_embed?: CourseEmbedvideo | null;
}

export interface CoursesState {
  loading: {
    courses: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    singleCourse: boolean;
  };
  err: {
    coursesErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    singleCourseErr: any;
  };
  courses: CoursesResponse[];
  create: CoursesResponse | null;
  update: CoursesResponse | null;
  delete: string | null;
  singleCourse: CoursesResponse | null;
  video_url: null | string;
}
