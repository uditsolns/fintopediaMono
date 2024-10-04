export interface TransactionsInfo {
  id: string;
  game_id: number;
  user_id: number;
  stock_id: number;
  order_type: string;
  order_qty: number;
  total_price: number;
  stock_current_price: number;
  round_level: number;
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
  transactions: TransactionsInfo[];
  create: TransactionsInfo | null;
  update: TransactionsInfo | null;
  delete: string | null;
}
