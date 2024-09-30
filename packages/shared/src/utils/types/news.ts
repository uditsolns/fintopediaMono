export interface NewsInfo {
  id: number;
  name: string;
  set_id: number;
}
export interface NewsState {
  loading: {
    news: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    newsErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  news: NewsInfo[];
  create: NewsInfo | null;
  update: NewsInfo | null;
  delete: string | null;
}
