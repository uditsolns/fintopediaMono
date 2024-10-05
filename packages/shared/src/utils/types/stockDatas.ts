import { GamesResponse } from "./games";
import { StocksResponse } from "./stocks";

export interface StockDataInfo {
  id: number;
  stock_id: number;
  game_id: number;
  stock_current_price: number;
  round_level: number;
  stock: {
    id: number;
    name: string;
    industry: string;
  };
  game: {
    id: number;
    college_id: number;
    name: string;
    image: string | null;
    start_time: string;
  };
}

export interface StockDatasParams {
  id?: number;
  stock_id?: number;
  game_id?: number;
  stock_current_price?: number | string;
  round_level?: number | string;
}
export interface StockDatasResponse {
  id: number;
  stock_id: number;
  game_id: number;
  stock_current_price: number | string;
  round_level: number | string;
  deleted_at?: null | string;
  created_at?: string;
  updated_at?: string;
  stock?: StocksResponse;
  game: GamesResponse;
}
export interface StockDataState {
  loading: {
    stockData: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    singleStockData: boolean;
  };
  err: {
    stockDataErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
    singleStockDataErr: any;
  };
  stockData: StockDataInfo[];
  create: StockDataInfo | null;
  update: StockDataInfo | null;
  delete: string | null;
  singleStockData: StockDataInfo | null;
}
