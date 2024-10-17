import { UserInfo } from "./auth";
import { CoursesResponse } from "./courses";

export interface PurchaseHistoryParams {
  id?: number;
  user_id?: number;
  course_id?: number;
  purchase_date?: number;
  status?: number;
  payment_status?: number;
  phone_pe_payment_id?: number;
  payment_type?: string;
  utr?: string;
  upiTransactionId?: string;
  accountHolderName?: string;
  accountType?: string;
  pgTransactionId?: string;
  pgServiceTransactionId?: string;
  cardType?: string;
}
export interface PurchaseHistoryResponse {
  id: number;
  user_id: number;
  course_id: number;
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
  user?: UserInfo | null;
  course?: CoursesResponse | null;
}
export interface PurchaseHistoryState {
  loading: {
    purchaseHistory: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    purchaseHistoryErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  purchaseHistory: PurchaseHistoryResponse[];
  create: PurchaseHistoryResponse | null;
  update: PurchaseHistoryResponse | null;
  delete: string | null;
}
