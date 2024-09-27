export interface UserCertificateInfo {
  id: number;
  user_id: number;
  course_id: number;
  status: number;
}
export interface UserCertificateState {
  loading: {
    userCertificate: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    userCertificateErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  userCertificate: UserCertificateInfo[];
  create: UserCertificateInfo | null;
  update: UserCertificateInfo | null;
  delete: string | null;
}
