import { CategoriesResponse } from "./categories";

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
}
export interface CoursesResponse {
  id: number;
  category_id: number;
  name: string;
  description: string;
  sale_price: string;
  actual_price: string;
  duration_time: string;
  total_section: string;
  total_topics: string;
  course_language: string;
  course_image: File | string;
  course_video: File | string;
  resources: string;
  created_at: string;
  updated_at: string;
  category?: CategoriesResponse;
  rating: number;
  course_type: string;
  reviews: number;
  is_popular: number;
  resource_file_upload: File
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
}
