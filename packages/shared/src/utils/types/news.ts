import { GamesInfo } from "./games";

export interface NewsParams {
  id?: number;
  game_id: number;
  name: number;
  round_level: number | string;
  set_id?: number | string;
}
export interface NewResponse {
  id: number;
  game_id: number;
  name: string;
  round_level: string | number;
  created_at: string;
  updated_at: string;
  set_id: number;
  game?: GamesInfo;
}
export interface NewsState {
  loading: {
    news: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    newsErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  news: NewsInfo[];
  create: NewsInfo | null;
  update: NewsInfo | null;
  delete: string | null;
}
