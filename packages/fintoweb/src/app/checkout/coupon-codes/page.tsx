"use client";

import React, { useState, useEffect } from "react";
import styles from "./CouponDrawer.module.css";
import { useRouter } from "next/navigation";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import {
  applyCouponCode,
  getCouponCode,
} from "shared/src/provider/store/services/coupon-code.service";
import FormattedDate from "@src/app/components/FormattedDate";
import { toast } from "react-toastify";
import CircularLoading from "@src/components/loader/CircularLoading";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { useCartContext } from "@src/app/context/CartContextApi";

interface CouponCode {
  discount: string;
  conditions: string;
  code: string;
  expiryDate: string;
}

export default function CouponCodes() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { coupon_code, loading } = useAppSelector((state) => state.couponCode);

  const [isOpen, setIsOpen] = useState(true);
  const [discount, setDiscount] = React.useState<string>("");

  const {
    isCouponCodeApply,
    setIsCouponCodeApply,
    setTotalPaymentAmount,
    keepTotalPaymentAmount,
    setCouponCodePercentage,
    setCouponCodePercentageDiscount,
  } = useCartContext();

  React.useEffect(() => {
    dispatch(getCouponCode());
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Coupon code copied!", {
        position: "top-right",
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to copy coupon code.", {
        position: "top-right",
        theme: "light",
      });
    }
  };

  const handleApplyCoupon = () => {
    if (!discount) {
      // If no coupon code is entered, show a warning message
      toast.warning("Please enter your coupon code", {
        position: "top-right",
        theme: "light",
      });
      return;
    }

    const params = { discountCode: discount };

    dispatch(applyCouponCode(params))
      .unwrap()
      .then((originalPromiseResult: any) => {
        // Check if there's an error message in the response
        if (originalPromiseResult?.message) {
          toast.error(originalPromiseResult.message, {
            position: "top-right",
            theme: "light",
          });
          return;
        }

        console.log("Coupon applied successfully:", originalPromiseResult);

        const amt = Number(keepTotalPaymentAmount);
        const discountPercentage =
          +originalPromiseResult?.discount?.replace(/\D+/g, "") || 0;

        const discountAmount = (amt * discountPercentage) / 100;
        const finalAmount = amt - discountAmount;
        setCouponCodePercentage(discountPercentage);
        setIsCouponCodeApply(true);
        setTotalPaymentAmount(finalAmount);
        setCouponCodePercentageDiscount(originalPromiseResult?.discount_code);

        // Save coupon data to localStorage
        const couponData = {
          couponCodePercentage: discountPercentage,
          isCouponCodeApply: true,
          totalPaymentAmount: finalAmount,
          couponCodePercentageDiscount: originalPromiseResult?.discount_code,
        };
        localStorage.setItem("couponData", JSON.stringify(couponData));

        toast.success("Coupon code applied successfully", {
          position: "top-right",
          theme: "light",
        });

        // Navigate to the cart page
        router.push("/cart");
      })
      .catch((error: any) => {
        console.error("Error applying coupon:", error);
        toast.error(
          "An error occurred while applying the coupon. Please try again.",
          {
            position: "top-right",
            theme: "light",
          }
        );
      });
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.drawerBackdrop}>
      <div className={styles.drawer}>
        <div className={styles.drawerHeader}>
          <h2>Coupon codes</h2>
          <div onClick={handleCartClick} style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M8 24L24 8M8 8L24 24"
                stroke="white"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.promoInput}>
            <input
              type="text"
              placeholder="Enter promo code"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply</button>
          </div>

          {loading?.coupon_code ? (
            <div className={styles.loading}>
              <LoadingAtom size="md" color="light" />
            </div>
          ) : coupon_code.length === 0 ? (
            <div className={styles.noCoupons}>
              <span>No coupons available</span>
            </div>
          ) : (
            coupon_code.map((coupon, index) => (
              <div key={index} className={styles.couponItem}>
                <div className={styles.couponHeader}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1712_20435)">
                        <path
                          d="M18.75 6.25V8.75"
                          stroke="white"
                          stroke-width="1.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.75 13.75V16.25"
                          stroke="white"
                          stroke-width="1.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.75 21.25V23.75"
                          stroke="white"
                          stroke-width="1.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.25 6.25H23.75C24.413 6.25 25.0489 6.51339 25.5178 6.98223C25.9866 7.45107 26.25 8.08696 26.25 8.75V12.5C25.587 12.5 24.9511 12.7634 24.4822 13.2322C24.0134 13.7011 23.75 14.337 23.75 15C23.75 15.663 24.0134 16.2989 24.4822 16.7678C24.9511 17.2366 25.587 17.5 26.25 17.5V21.25C26.25 21.913 25.9866 22.5489 25.5178 23.0178C25.0489 23.4866 24.413 23.75 23.75 23.75H6.25C5.58696 23.75 4.95107 23.4866 4.48223 23.0178C4.01339 22.5489 3.75 21.913 3.75 21.25V17.5C4.41304 17.5 5.04893 17.2366 5.51777 16.7678C5.98661 16.2989 6.25 15.663 6.25 15C6.25 14.337 5.98661 13.7011 5.51777 13.2322C5.04893 12.7634 4.41304 12.5 3.75 12.5V8.75C3.75 8.08696 4.01339 7.45107 4.48223 6.98223C4.95107 6.51339 5.58696 6.25 6.25 6.25Z"
                          stroke="white"
                          stroke-width="1.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1712_20435">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <small className={styles.expiryDate}>
                    Valid till <FormattedDate date={coupon.expiry_date} />
                  </small>
                </div>
                <div className={styles.discount}>
                  <h3>{`Extra ${coupon?.discount} Off`}</h3>
                  <small className="mt-2">{coupon.description}</small>
                </div>
                <div className={styles.couponCode}>
                  <span>{coupon.discount_code}</span>

                  <div
                    onClick={() => copyToClipboard(coupon.discount_code)}
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1712_20428)">
                        <path
                          d="M7 9.667C7 8.95967 7.28099 8.28131 7.78115 7.78115C8.28131 7.28099 8.95967 7 9.667 7H18.333C18.6832 7 19.03 7.06898 19.3536 7.20301C19.6772 7.33704 19.9712 7.53349 20.2189 7.78115C20.4665 8.0288 20.663 8.32281 20.797 8.64638C20.931 8.96996 21 9.31676 21 9.667V18.333C21 18.6832 20.931 19.03 20.797 19.3536C20.663 19.6772 20.4665 19.9712 20.2189 20.2189C19.9712 20.4665 19.6772 20.663 19.3536 20.797C19.03 20.931 18.6832 21 18.333 21H9.667C9.31676 21 8.96996 20.931 8.64638 20.797C8.32281 20.663 8.0288 20.4665 7.78115 20.2189C7.53349 19.9712 7.33704 19.6772 7.20301 19.3536C7.06898 19.03 7 18.6832 7 18.333V9.667Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.012 16.737C3.70534 16.5622 3.45027 16.3095 3.27258 16.0045C3.09488 15.6995 3.00085 15.353 3 15V5C3 3.9 3.9 3 5 3H15C15.75 3 16.158 3.385 16.5 4"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1712_20428">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
