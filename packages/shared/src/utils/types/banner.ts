export interface BannerInfo {
  id: number;
  college_id: number;
  name: string;
  bannername: File;
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
  banner: BannerInfo[];
  create: BannerInfo | null;
  update: BannerInfo | null;
  delete: string | null;
}
