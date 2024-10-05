export interface GameUsersInfo {
  id: number;
  name: string;
}

export interface GameUserLoginIDGameIDResponse {
  id: number;
  game_id: number;
  user_id: number;
  amount: number | string;
  is_active: number;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}



export interface GameUserLoginIDGameIDPayload {
  user_id: number;
  game_id: number;
  onSuccess: (data: GameUserLoginIDGameIDResponse) => void;
  onError: (error: any) => void;
}

export interface GameUserParams {
  id?: number;
  game_id: number;
  user_id: number;
  amount: number | string;
  is_active: number;
}

export interface GameUserResponse {
  id: number;
  game_id: number;
  user_id: number;
  amount: number | string;
  is_active: number;
  deleted_at?: null | string;
  created_at?: string;
  updated_at?: string;
}

export interface GameUsersState {
  loading: {
    gameUsers: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    gameUserByLoginIDGameID: boolean;
  };
  err: {
    gameUsersErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    gameUserByLoginIDGameIDErr: any;
  };
  gameUsers: GameUsersInfo[];
  create: GameUsersInfo | null;
  update: GameUsersInfo | null;
  delete: string | null;
  gameUserByLoginIDGameID: GameUserLoginIDGameIDResponse | null;
  user_game_amount:number
}
