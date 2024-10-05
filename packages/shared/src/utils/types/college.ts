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
  name: string;
  address: string;
  location: string;
  pincode: null | number | string;
  phone: string;
  college_type: string;
  is_school: number;
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
  college: CollegeInfo[];
  create: CollegeInfo | null;
  update: CollegeInfo | null;
  delete: string | null;
}
