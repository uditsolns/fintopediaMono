import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface UserCertificateParams {
  id?: number;
  user_id?: number;
  course_id?: number;
  status?: number | string;
}

export interface OnSuccessInterface {
  onSuccess: (data: any) => void;
}
export interface OnErrorInterface {
  onError: (error: any) => void;
}
export interface DownloadCertificateParams extends OnSuccessInterface, OnErrorInterface {
  id: number;
}
export interface UserCertificateResponse {
  id: number;
  user_id: number;
  course_id: number;
  status?: number | string;
  user?:UserInfo;
  course?:CoursesResponse,
  certificate_url?:string | null
}
export interface UserCertificateState {
  loading: {
    userCertificate: boolean;
    singleUserCertificate: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    userCertificateErr: any;
    singleUserCertificateErr:any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  userCertificate: UserCertificateResponse[];
  singleUserCertificate: UserCertificateResponse | null;
  create: UserCertificateResponse | null;
  update: UserCertificateResponse | null;
  delete: string | null;
}
