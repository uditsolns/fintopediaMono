export interface StartGameInfo {
  id?: number;
  game_id?: number;
}

export interface StartGameInfo2 {
  game_id: number;
  user_id: number;
  amount: number;
  is_active: number;
  updated_at: string;
  created_at: string;
  id: number;
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
