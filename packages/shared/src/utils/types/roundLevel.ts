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
    singleRoundLevel: boolean;
  };
  err: {
    roundLevelErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    singleRoundLevelErr: any;
  };
  roundLevel: RoundLevelInfo[];
  filterRoundLevelData: RoundLevelInfo | null;
  singleRoundLevel: RoundLevelInfo | null;
  create: RoundLevelInfo | null;
  update: RoundLevelInfo | null;
  delete: string | null;
}
