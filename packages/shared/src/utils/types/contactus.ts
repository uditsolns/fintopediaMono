export interface ContactFields {
  id?: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string; 
  message: string;
}

export interface ContactParams {
  params: ContactFields;
}
export interface ContactResponse{
  id?: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string;
  message: string;
}

export interface ContactState {
  loading: {
    contact: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    contactErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  contact: ContactResponse[];
  create: ContactResponse | null;
  update: ContactResponse | null;
  delete: string | null;
}
