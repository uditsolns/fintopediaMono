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
export interface StockDataState {
  loading: {
    stockData: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    stockDataErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  stockData: StockDataInfo[];
  create: StockDataInfo | null;
  update: StockDataInfo | null;
  delete: string | null;
}
