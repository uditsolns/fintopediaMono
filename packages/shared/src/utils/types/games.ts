export interface GamesInfo {
  id: number;
  college_id: number;
  name: string;
  image: string;
  start_time: string;
  end_time: string;
  prize_money: string;
  game_code: string;
  is_active: string;
}
export interface GamesState {
  loading: {
    games: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    gamesErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  games: GamesInfo[];
  create: GamesInfo | null;
  update: GamesInfo | null;
  delete: string | null;
}
