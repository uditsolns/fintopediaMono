import { CollegeResponse } from "./college";
import { GameUsersResponse } from "./gameUsers";
import { NewsResponse } from "./news";
import { StockDatasResponse } from "./stockDatas";

export interface GetGameByIdParams {
  id: number | string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

export interface GamesParams {
  id?: number;
  college_id?: number;
  name?: string;
  image?: null | string;
  start_time?: string;
  end_time?: string;
  prize_money?: string | number;
  game_code?: string | null;
  is_active?: number;
  to_publish_result?: number;
}
export interface GamesResponse {
  id: number;
  college_id: number;
  name: number;
  image: null | string;
  start_time: string;
  end_time: string;
  prize_money: string | number;
  game_code: string;
  is_active: number;
  deleted_at?: null | string;
  created_at?: string;
  updated_at?: string;
  to_publish_result: number;
  news?: NewsResponse[] | null;
  stock_datas?: StockDatasResponse[] | null;
  college?: CollegeResponse | null;
  game_users?: GameUsersResponse[];
}
export interface GamesState {
  loading: {
    games: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    singleGame: boolean;
  };
  err: {
    gamesErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    singleGameErr: any;
  };
  games: GamesResponse[];
  create: GamesResponse | null;
  update: GamesResponse | null;
  delete: string | null;
  singleGame: GamesResponse | null;
}
