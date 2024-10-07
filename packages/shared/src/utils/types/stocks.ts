import { StockDatasResponse } from "./stockDatas";

export interface StocksParams {
  id?: number;
  name?: string;
  industry?: string;
}

export interface StocksResponse {
  id: number;
  name:string;
  industry: string;
  created_at: string;
  updated_at: string;
  stock_datas?:StockDatasResponse[] | null
}
export interface StocksState {
  loading: {
    stocks: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    stocksErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  stocks: StocksResponse[];
  create: StocksResponse | null;
  update: StocksResponse | null;
  delete: string | null;
}
