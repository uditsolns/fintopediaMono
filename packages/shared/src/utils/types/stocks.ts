export interface StocksInfo {
  id: number;
  name: string;
  industry: string;
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
  stocks: StocksInfo[];
  create: StocksInfo | null;
  update: StocksInfo | null;
  delete: string | null;
}
