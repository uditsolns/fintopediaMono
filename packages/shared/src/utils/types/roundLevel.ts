export interface RoundLevelInfo {
  id: number;
  game_id: number;
  round_level: number;
  start_datetime: string;
  end_datetime: string;
  set_id: number;
  is_active: number;
}
export interface RoundLevelState {
  loading: {
    roundLevel: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    roundLevelErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  roundLevel: RoundLevelInfo[];
  create: RoundLevelInfo | null;
  update: RoundLevelInfo | null;
  delete: string | null;
}
