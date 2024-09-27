export interface PurchaseHistoryInfo {
  id: number;
  user_id: number;
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
  purchaseHistory: PurchaseHistoryInfo[];
  create: PurchaseHistoryInfo | null;
  update: PurchaseHistoryInfo | null;
  delete: string | null;
}
