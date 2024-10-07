import { GamesResponse } from "./games";

export interface RoundLevelParams {
  id?: number;
  game_id?: number;
  round_level?: number;
  start_datetime?: string;
  end_datetime?: string;
  set_id?: number;
  is_active?: number;
}

export interface OnSuccessInterface {
  onSuccess: (data: any) => void;
}
export interface OnErrorInterface {
  onError: (error: any) => void;
}

export interface RoundLevelResponse {
  id: number;
  game_id: number;
  start_datetime: string;
  end_datetime: string;
  round_level: number | string;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  set_id: number | null;
  game?: GamesResponse | null;
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
  roundLevel: RoundLevelResponse[];
  filterRoundLevelData: RoundLevelResponse | null;
  singleRoundLevel: RoundLevelResponse | null;
  create: RoundLevelResponse | null;
  update: RoundLevelResponse | null;
  delete: string | null;
}
