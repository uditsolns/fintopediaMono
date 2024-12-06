import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface PurchaseHistoryFields {
  id?: number;
  user_id?: number;
  course_id?: number[];
  purchase_date?: string;
  status?: string;
  payment_status?: string;
  phone_pe_payment_id?: string;
  payment_type?: string;
  utr?: string;
  upiTransactionId?: string;
  accountHolderName?: string;
  accountType?: string;
  pgTransactionId?: string;
  pgServiceTransactionId?: string;
  arn?: string;
  cardType?: string;
  brn?: string;
  subtotal?: number | string;
  total_discount?: number | string;
  gst?: number | string;
  grand_total?: number | string;
}
export interface PurchaseHistoryParams {
  params: PurchaseHistoryFields;
}
export interface PurchaseHistoryResponse {
  id: number;
  user_id: number;
  course_id: number[];
  purchase_date: number;
  status: number;
  payment_status: number;
  phone_pe_payment_id: number;
  payment_type: string;
  utr: string;
  upiTransactionId: string;
  accountHolderName: string;
  accountType: string;
  pgTransactionId: string;
  pgServiceTransactionId: string;
  cardType: string;
  grand_total?:number | string;
  user?: UserInfo | null;
  courses?: CoursesResponse[] | null;
}
export interface PurchaseHistoryState {
  loading: {
    purchaseHistory: boolean;
    singlePurchaseHistory: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    purchaseHistoryErr: any;
    singlePurchaseHistoryErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  purchaseHistory: PurchaseHistoryResponse[];
  singlePurchaseHistory: PurchaseHistoryResponse | null;
  create: PurchaseHistoryResponse | null;
  update: PurchaseHistoryResponse | null;
  delete: string | null;
}
