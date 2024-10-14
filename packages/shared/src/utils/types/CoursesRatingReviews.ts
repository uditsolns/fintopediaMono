import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface CoursesRatingReviewsParams {
  id?: number;
  course_id?: number;
  user_id?: number;
  rating_star?: string;
  review_description?: string;
}
export interface CoursesRatingReviewsResponse {
  id: number;
  course_id: number;
  user_id: number;
  rating_star: string;
  review_description: string;
  course?: CoursesResponse | null;
  user?: UserInfo | null;
}
export interface CoursesRatingReviewsState {
  loading: {
    coursesRatingReviews: boolean;
    singleCoursesRatingReviews: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    coursesRatingReviewsErr: any;
    singleCoursesRatingReviewsErr: any;
    createErr: any;
    updateErr: any; 
    deleteErr: any;
  };
  coursesRatingReviews: CoursesRatingReviewsResponse[];
  singleCoursesRatingReviews: CoursesRatingReviewsResponse | null;
  create: CoursesRatingReviewsResponse | null;
  update: CoursesRatingReviewsResponse | null;
  delete: string | null;
}
