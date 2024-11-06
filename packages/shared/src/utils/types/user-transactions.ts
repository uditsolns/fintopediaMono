import { UserInfo } from "./auth";
import { GamesResponse } from "./games";
import { StocksResponse } from "./stocks";

export interface UserTransactionsParams {
  id?: number;
  game_id?: number;
  user_id?: number;
  stock_id?: number;
  order_qty?: number;
}

export interface UserTransactionsResponse {
  id: number;
  game_id: number;
  user_id: number;
  stock_id: number;
  order_qty: string;
  deleted_at: null | string;
  created_at: null | string;
  updated_at: null | string;
  game?: GamesResponse;
  user?: UserInfo;
  stock?: StocksResponse;
}
export interface UserTransactionsState {
  loading: {
    user_transactions: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    user_transactionsErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  user_transactions: UserTransactionsResponse[];
  single_user_transactions: UserTransactionsResponse | null;
  create: UserTransactionsResponse | null;
  update: UserTransactionsResponse | null;
  delete: string | null;
}
