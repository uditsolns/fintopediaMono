export interface CourseCartInfo {
  id: number;
  user_id: number;
  cources_id: number;
  status: number;
}
export interface CourseCartState {
  loading: {
    courseCart: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    courseCartErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  courseCart: CourseCartInfo[];
  create: CourseCartInfo | null;
  update: CourseCartInfo | null;
  delete: string | null;
}
