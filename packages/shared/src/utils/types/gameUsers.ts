export interface GameUsersInfo {
  id: number;
  name: string;
}
export interface GameUsersState {
  loading: {
    gameUsers: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    gameUsersErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  gameUsers: GameUsersInfo[];
  create: GameUsersInfo | null;
  update: GameUsersInfo | null;
  delete: string | null;
}
