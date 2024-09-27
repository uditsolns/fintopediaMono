export interface CollegeInfo {
  id: number;
  name: string;
  address: string;
  location: string;
  pincode: string;
  phone: string;
  college_type: string;
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
