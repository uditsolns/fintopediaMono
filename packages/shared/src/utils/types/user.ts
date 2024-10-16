import { UserInfo } from "./auth";

export interface UserState {
  loading: {
    user: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    single_user: boolean;
  };
  err: {
    userErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    single_user_err: any;
  };
  user: UserInfo[];
  single_user: UserInfo | null;
  create: null;
  update: UserInfo | null;
  delete: string | null;
}
