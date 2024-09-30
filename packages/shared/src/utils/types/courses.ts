export interface CoursesInfo {
  id: number;
  category_id: number;
  name: string;
  description: string;
  sale_price: number;
  actual_price: number;
  duration_time: number;
  total_section: number;
  total_topics: number;
  course_language: string;
  course_image: File;
  course_video?: File;
  resources: string;
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
  courses: CoursesInfo[];
  create: CoursesInfo | null;
  update: CoursesInfo | null;
  delete: string | null;
}
