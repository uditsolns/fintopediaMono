import { UserInfo } from "./auth";
import { StocksResponse } from "./stocks";

export interface TransactionsParams {
  id?: number;
  game_id?: number;
  user_id?: number;
  stock_id?: number;
  order_type?: string;
  order_qty?: number;
  total_price?: number;
  stock_current_price?: number;
  round_level?: string;
  remarks?:string | null;
}

export interface TransactionsResponse {
  id: number;
  game_id: number;
  user_id: number;
  stock_id: number;
  stock_current_price: number | string;
  order_qty: null | number | string;
  order_type: string;
  total_price: null | number | string;
  round_level: string;
  remarks?:string | null;
  deleted_at?: null | string;
  created_at: string | null;
  updated_at: string | number;
  user?: UserInfo;
  stock?: StocksResponse;
}
export interface TransactionsState {
  loading: {
    transactions: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    transactionsErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  transactions: TransactionsResponse[];
  single_transactions: TransactionsResponse | null;
  create: TransactionsResponse | null;
  update: TransactionsResponse | null;
  delete: string | null;
}
