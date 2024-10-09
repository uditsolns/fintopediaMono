import { CategoriesInfo } from "./categories";

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
  category: CategoriesInfo;
}
export interface CoursesState {
  loading: {
    courses: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    coursesErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  courses: CoursesResponse[]; 
  create: CoursesResponse | null;
  update: CoursesResponse | null;
  delete: string | null;
}
