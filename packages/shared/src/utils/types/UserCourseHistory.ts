export interface UserCourseHistoryInfo {
  id: number;
  user_id: number;
  purchase_id: number;
  course_id: number;
  purchase_date: string;
  status: number;
}
export interface UserCourseHistoryState {
  loading: {
    userCourseHistory: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    userCourseHistoryErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  userCourseHistory: UserCourseHistoryInfo[];
  create: UserCourseHistoryInfo | null;
  update: UserCourseHistoryInfo | null;
  delete: string | null;
}
