import React, {createContext, ReactNode, useContext, useState} from 'react';

interface CartContextType {
  totalPaymentAmount: string | number;
  setTotalPaymentAmount: (amount: string | number) => void;
  keepTotalPaymentAmount: string | number;
  setKeepTotalPaymentAmount: (amount: string | number) => void;
  isCouponCodeApply: boolean;
  setIsCouponCodeApply: (code: boolean) => void;
  couponCodePercentage: string | number;
  setCouponCodePercentage: (percentage: string | number) => void;
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
