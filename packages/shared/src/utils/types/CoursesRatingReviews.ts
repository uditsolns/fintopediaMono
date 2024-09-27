export interface CoursesRatingReviewsInfo {
  id: number;
  course_id: number;
  user_id: number;
  rating_star: number;
  review_description: string;
}
export interface CoursesRatingReviewsState {
  loading: {
    coursesRatingReviews: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    coursesRatingReviewsErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  coursesRatingReviews: CoursesRatingReviewsInfo[];
  create: CoursesRatingReviewsInfo | null;
  update: CoursesRatingReviewsInfo | null;
  delete: string | null;
}
