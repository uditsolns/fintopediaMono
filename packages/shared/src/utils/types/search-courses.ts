import { UserInfo } from "./auth";
import { CategoriesResponse } from "./categories";
import { CoursesResponse } from "./courses";

export interface SearchCoursesResponse {
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
}
export interface SearchCoursesFields {
  name: string;
  sale_price: string | number;
  category_name: string;
  min_sale_price: string | number;
  max_sale_price: string | number;
  course_language: string;
  sort_rating: string;
}
export interface SearchCoursesParams {
  params: SearchCoursesFields;
}
export interface SearchCoursesState {
  loading: {
    search_courses: boolean;
  };
  err: {
    search_courses_err: any;
  };
  search_courses: CoursesResponse[];
}
