export interface CoursesgetPurchaseFields {
  id?: number;
  course_id: number;
  course_name: string;
  is_purchased: boolean;
}

export interface CoursesgetPurchaseParams {
  params: CoursesgetPurchaseFields;
}
export interface CoursesgetPurchaseResponse {
  id: number;
  course_id: number;
  course_name: string;
  is_purchased: boolean;
}

export interface CoursesgetPurchaseState {
  loading: {
    courseget_purchase: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    courseget_purchase_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  courseget_purchase: CoursesgetPurchaseResponse[];
  create: CoursesgetPurchaseResponse | null;
  update: CoursesgetPurchaseResponse | null;
  delete: string | null;
}
