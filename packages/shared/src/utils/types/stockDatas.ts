import { GamesResponse } from "./games";
import { StocksResponse } from "./stocks";

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
  game?: GamesResponse;
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
  stockData: StockDatasResponse[];
  create: StockDatasResponse | null;
  update: StockDatasResponse | null;
  delete: string | null;
  singleStockData: StockDatasResponse | null;
}
