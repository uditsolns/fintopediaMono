import { BannerResponse } from "./banner";
import { GamesResponse } from "./games";

export interface CollegeInfo {
  id: number;
  name: string;
  address: string;
  location: string;
  pincode: string;
  phone: string;
  college_type: string;
}

export interface CollegeParams {
  id?: number;
  name?: string;
  address?: string;
  location?: string;
  pincode?: null | number | string;
  phone?: string;
  college_type?: string;
  is_school?: number;
}

export interface CollegeResponse {
  id: number;
  name: string;
  address: string;
  location: string;
  pincode: null | number | string;
  phone: string;
  college_type: string;
  is_school: number;
  created_at?: string;
  updated_at?: string;
  banners?: BannerResponse[] | null;
  games?: GamesResponse[] | null;
}
export interface CollegeState {
  loading: {
    college: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    collegeErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  college: BannerResponse[];
  create: BannerResponse | null;
  update: BannerResponse | null;
  delete: string | null;
}
