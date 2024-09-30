export interface StartGameInfo {
    id: number;
    game_id: number;
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
  