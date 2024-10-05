import { CollegeResponse } from "./college";
import { GameUserResponse } from "./gameUsers";
import { NewResponse } from "./news";
import { OnErrorInterface, OnSuccessInterface } from "./roundLevel";
import { StockDatasResponse } from "./stockDatas";

export interface GetGameByIdParams {
  id: number | string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface GamesParams{
  
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
  news?: NewResponse[] | null;
  stock_datas?: StockDatasResponse[] | null;
  college?: CollegeResponse | null;
  game_users?: GameUserResponse[];
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
  games: GamesInfo[];
  create: GamesInfo | null;
  update: GamesInfo | null;
  delete: string | null;
  singleGame: GamesInfo | null;
}
