export interface BannerResponse {
  id: number;
  college_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  bannername: string;
}
export interface BannerPararms {
  id?: number;
  college_id?: number;
  name?: string;
  bannername: string;
}
export interface BannerState {
  loading: {
    banner: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    bannerErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  banner: BannerResponse[];
  create: BannerResponse | null;
  update: BannerResponse | null;
  delete: string | null;
}
