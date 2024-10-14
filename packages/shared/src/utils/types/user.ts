import { UserInfo } from "./auth";

export interface UserState {
  loading: {
    user: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    userErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  user: UserInfo[];
  create: null;
  update: UserInfo | null;
  delete: string | null;
}
