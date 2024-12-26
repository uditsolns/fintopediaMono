import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface NotificationsParams {
  id?: number;
  user_id?: number;
  course_id?: number;
  title: string;
  description: string;
  image: null | File | string;
  url: string;
  status?: number | string;
}

export interface NotificationsResponse {
  id: number;
  user_id?: number;
  course_id: number;
  title: string;
  description: string;
  image: null | File | string;
  url: string;
  status?: number | string;
  user?: UserInfo;
  course?: CoursesResponse;
}
export interface NotificationState {
  loading: {
    notifications: boolean;
    single_notifications: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    notifications_err: any;
    single_notifications_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  notifications: NotificationsResponse[];
  single_notifications: NotificationsResponse | null;
  create: NotificationsResponse | null;
  update: NotificationsResponse | null;
  delete: string | null;
}
