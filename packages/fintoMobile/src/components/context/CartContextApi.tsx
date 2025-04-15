import React, {createContext, ReactNode, useContext, useState} from 'react';

interface OrderType {
  expireAt: number;
  orderId: string;
  state: string;
  token: string;
}
interface CartContextType {
  totalPaymentAmount: string | number;
  setTotalPaymentAmount: (amount: string | number) => void;
  keepTotalPaymentAmount: string | number;
  setKeepTotalPaymentAmount: (amount: string | number) => void;
  isCouponCodeApply: boolean;
  setIsCouponCodeApply: (code: boolean) => void;
  couponCodePercentage: string | number;
  setCouponCodePercentage: (percentage: string | number) => void;
  couponCodePercentageDiscount: string;
  setCouponCodePercentageDiscount: (percentage: string) => void;
  couponCodePercentageDiscountAmount: number | string;
  setCouponCodePercentageDiscountsAmount: (percentage: number) => void;
  orderId: OrderType | null;
  setOrderId: (order: OrderType | null) => void;
  merchantOrderID: string;
  setMerchantOrderID: (order: string) => void;
  accessToken: string;
  setAccessToken: (order: string) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<string | number>(
    '',
  );
  const [keepTotalPaymentAmount, setKeepTotalPaymentAmount] = useState<
    string | number
  >('');
  const [isCouponCodeApply, setIsCouponCodeApply] = useState<boolean>(false);
  const [couponCodePercentage, setCouponCodePercentage] = useState<
    string | number
  >(0);
  const [couponCodePercentageDiscount, setCouponCodePercentageDiscount] =
    useState<string>('');
  const [
    couponCodePercentageDiscountAmount,
    setCouponCodePercentageDiscountsAmount,
  ] = useState<string | number>('');

  const [orderId, setOrderId] = useState<OrderType | null>(null);
  const [merchantOrderID, setMerchantOrderID] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  return (
    <CartContext.Provider
      value={{
        totalPaymentAmount,
        setTotalPaymentAmount,
        isCouponCodeApply,
        setIsCouponCodeApply,
        keepTotalPaymentAmount,
        setKeepTotalPaymentAmount,
        couponCodePercentage,
        setCouponCodePercentage,
        couponCodePercentageDiscount,
        setCouponCodePercentageDiscount,
        couponCodePercentageDiscountAmount,
        setCouponCodePercentageDiscountsAmount,
        orderId,
        setOrderId,
        merchantOrderID,
        setMerchantOrderID,
        accessToken,
        setAccessToken,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }
  return context;
};
