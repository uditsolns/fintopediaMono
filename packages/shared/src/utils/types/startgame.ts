export interface StartGameInfo {
  id?:number;
  game_id?: number;
}

export interface StartGame {
  game_id?: number;
}
export interface CreateStartGame {
  startGameInfo: StartGame;
  onSuccess: (res:any) => void;
  onError: (res:any) => void;
}
export interface StartGameInfo2 {
  id: number;
  game_id: number;
  user_id: number;
  amount: number;
  is_active: number;
  updated_at: string;
  created_at: string;
}

export interface StartGameError {
  error: string;
}

export interface StartGameState {
  loading: {
    startGame: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    startGameErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  startGame: StartGameInfo[];
  create: StartGameInfo | null;
  update: StartGameInfo | null;
  delete: string | null;
}
