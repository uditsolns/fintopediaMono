"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

// interface CartContextType {
//   totalPaymentAmount: string | number;
//   setTotalPaymentAmount: (amount: string | number) => void;
//   keepTotalPaymentAmount: string | number;
//   setKeepTotalPaymentAmount: (amount: string | number) => void;
//   isCouponCodeApply: boolean;
//   setIsCouponCodeApply: (code: boolean) => void;
//   couponCodePercentage: string | number;
//   setCouponCodePercentage: (percentage: string | number) => void;
//   setCouponCodePercentageDiscount: (percentage: string) => void;
//   setCouponCodePercentageDiscountsAmount: (percentage: number) => void;
// }
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
}

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<string | number>(
    ""
  );
  const [keepTotalPaymentAmount, setKeepTotalPaymentAmount] = useState<
    string | number
  >("");
  const [isCouponCodeApply, setIsCouponCodeApply] = useState<boolean>(false);
  const [couponCodePercentage, setCouponCodePercentage] = useState<
    string | number
  >(0);
  const [couponCodePercentageDiscount, setCouponCodePercentageDiscount] =
    useState<string>("");
  const [
    couponCodePercentageDiscountAmount,
    setCouponCodePercentageDiscountsAmount,
  ] = useState<string | number>("");

  React.useEffect(() => {
    // Retrieve couponData from localStorage on component mount
    const storedCouponData = localStorage.getItem("couponData");
    if (storedCouponData) {
      const parsedData = JSON.parse(storedCouponData);
      // setCouponData(parsedData);
      setCouponCodePercentage(parsedData.couponCodePercentage || 0);
      setIsCouponCodeApply(parsedData.isCouponCodeApply || false);
      setTotalPaymentAmount(parsedData.totalPaymentAmount || 0);
      setCouponCodePercentageDiscount(
        parsedData.couponCodePercentageDiscount || ""
      );
    }
  }, []);

  React.useEffect(() => {
    const dataToStore = {
      couponCodePercentage,
      couponCodePercentageDiscount,
      couponCodePercentageDiscountAmount,
      isCouponCodeApply,
      totalPaymentAmount,
      keepTotalPaymentAmount,
    };
    localStorage.setItem("cartContextState", JSON.stringify(dataToStore));
  }, [
    couponCodePercentage,
    couponCodePercentageDiscount,
    couponCodePercentageDiscountAmount,
    isCouponCodeApply,
    totalPaymentAmount,
    keepTotalPaymentAmount,
  ]);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};
