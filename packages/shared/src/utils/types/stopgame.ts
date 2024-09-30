export interface StopGameInfo {
    id: number;
    game_id: number;
  }
  export interface StopGameState {
    loading: {
      stopGame: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
    err: {
      stopGameErr: any;
      createErr: any;
      updateErr: any;
      deleteErr: any;
    };
    stopGame: StopGameInfo[];
    create: StopGameInfo | null;
    update: StopGameInfo | null;
    delete: string | null;
  }
  