"use client";
import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import {
  createPurchaseHistory,
  getPurchaseHistoryById,
} from "shared/src/provider/store/services/PurchaseHistory.service";
import { useRouter } from "next/navigation";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import styles from "@src/app/checkout/invoice-screen/InvoiceScreen.module.css";
import {
  PHONEPE_MERCHANT_ID,
  PHONEPE_SALT_KEY,
  PHONEPE_SALT_INDEX,
  PHONEPE_API_URL,
} from "shared/src/config/phonepeConfig";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const id = localStorage.getItem("transactionId");
  const courseCart = localStorage.getItem("courseCart");
  const savedState = localStorage.getItem("courseCartState");
  const hasCalled = React.useRef(false);
  const [isPaymentStatusFetched, setPaymentStatusFetched] = useState(false);

  const sha256Res2 = sha256(
    `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${id}` + PHONEPE_SALT_KEY
  );
  const finalXHeader2 = `${sha256Res2}###${PHONEPE_SALT_INDEX}`;

  const course_id_arr = courseCart ? JSON.parse(courseCart) : [];
  const courseIds = course_id_arr.map(
    (itm: { course_id: number }) => itm.course_id
  );
  const currentPurchaseDate = new Date().toISOString().split("T")[0];
  const handleHomeClick = () => {
    router.push("/");
    localStorage.removeItem("transactionId");
    localStorage.removeItem("singlePurchaseHistory");
    localStorage.removeItem("courseCartState");
    localStorage.removeItem("courseCart");
  };
  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    if (!id || !courseCart || !savedState || isPaymentStatusFetched) {
      return;
    }

    const parsedState = JSON.parse(savedState);

    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          `${PHONEPE_API_URL}/pg/v1/status/${PHONEPE_MERCHANT_ID}/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-VERIFY": finalXHeader2,
              "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
            },
          }
        );

        const res = await response.json();
        const paymentStatus =
          res?.code === "PAYMENT_SUCCESS" ? "paid" : "failed";

        const paymentData = {
          user_id: auth?.user?.id,
          course_id: courseIds,
          purchase_date: currentPurchaseDate,
          status: paymentStatus,
          payment_status: paymentStatus,
          phone_pe_payment_id:
            res?.data?.transactionId ||
            res?.data?.paymentInstrument?.pgServiceTransactionId ||
            "",
          payment_type: res?.data?.paymentInstrument?.type || "",
          utr: res?.data?.paymentInstrument?.utr || "",
          upiTransactionId:
            res?.data?.paymentInstrument?.upiTransactionId || "",
          accountHolderName:
            res?.data?.paymentInstrument?.accountHolderName || "",
          accountType: res?.data?.paymentInstrument?.accountType || "",
          pgTransactionId: res?.data?.paymentInstrument?.pgTransactionId || "",
          pgServiceTransactionId:
            res?.data?.paymentInstrument?.pgServiceTransactionId || "",
          arn: res?.data?.paymentInstrument?.arn || "",
          cardType: res?.data?.paymentInstrument?.cardType || "",
          brn: res?.data?.paymentInstrument?.brn || "",
          subtotal: parsedState?.subtotal || "",
          total_discount: parsedState?.totalDiscount || "",
          gst: parsedState?.gst || "",
          grand_total: parsedState?.totalPay || "",
        };

        dispatch(
          createPurchaseHistory({
            params: paymentData,
            onSuccess: (data) => {
              console.log("failse PO", data);
              const purchaseId = data?.data?.id;
              if (purchaseId) {
                dispatch(
                  getPurchaseHistoryById({
                    params: { id: purchaseId },
                    onSuccess: (historyData) => {
                      console.log("Purchase history data:", historyData);
                      localStorage.setItem(
                        "singlePurchaseHistory",
                        JSON.stringify(historyData)
                      );
                      // router.push("/checkout/invoice-screen");
                    },
                    onError: (error) => {
                      console.error(
                        "Error fetching purchase history by ID:",
                        error
                      );
                    },
                  })
                );
              } else {
                console.error("Purchase ID is missing from the response data.");
              }
            },
            onError: (error) => {
              console.error("Error creating purchase history:", error);
            },
          })
        );

        setPaymentStatusFetched(true);
      } catch (error) {
        console.error("Error in payment status fetch:", error);
      }
    };

    fetchPaymentStatus();
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <div className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="63"
              height="63"
              viewBox="0 0 63 63"
              fill="none"
            >
              <g clipPath="url(#clip0_1739_30394)">
                <circle cx="32.295" cy="30.5743" r="16.0509" fill="white" />
                <path
                  d="M31.679 5.56055C33.6765 5.56067 35.6055 6.28828 37.1055 7.60735L37.501 7.97973L39.2935 9.77229C39.7855 10.261 40.4279 10.5696 41.1169 10.648L41.4636 10.6686H44.0317C46.1305 10.6685 48.1497 11.4713 49.6754 12.9125C51.2011 14.3536 52.1176 16.3239 52.2369 18.4192L52.2498 18.8866V21.4548C52.2498 22.1481 52.486 22.8236 52.9123 23.3629L53.1435 23.6197L54.9335 25.4123C56.4171 26.8875 57.2822 28.8731 57.3524 30.9642C57.4225 33.0553 56.6924 35.0945 55.311 36.6658L54.9386 37.0613L53.146 38.8539C52.6573 39.3458 52.3488 39.9883 52.2703 40.6773L52.2498 41.024V43.5921C52.2499 45.6908 51.4471 47.7101 50.0059 49.2358C48.5647 50.7614 46.5945 51.6779 44.4991 51.7973L44.0317 51.8101H41.4636C40.7712 51.8104 40.099 52.0438 39.5555 52.4727L39.2987 52.7038L37.5061 54.4938C36.0308 55.9775 34.0452 56.8426 31.9541 56.9128C29.863 56.9829 27.8239 56.2528 26.2525 54.8714L25.857 54.499L24.0645 52.7064C23.5725 52.2177 22.9301 51.9091 22.2411 51.8307L21.8944 51.8101H19.3263C17.2275 51.8103 15.2083 51.0074 13.6826 49.5663C12.1569 48.1251 11.2404 46.1548 11.1211 44.0595L11.1082 43.5921V41.024C11.108 40.3315 10.8746 39.6594 10.4456 39.1158L10.2145 38.859L8.42451 37.0665C6.94085 35.5912 6.07575 33.6056 6.0056 31.5145C5.93545 29.4234 6.66554 27.3843 8.04699 25.8129L8.41937 25.4174L10.2119 23.6248C10.7007 23.1329 11.0092 22.4905 11.0877 21.8015L11.1082 21.4548V18.8866L11.1211 18.4192C11.2357 16.4044 12.0878 14.5022 13.5148 13.0751C14.9418 11.6481 16.844 10.7961 18.8589 10.6814L19.3263 10.6686H21.8944C22.5868 10.6683 23.259 10.4349 23.8025 10.006L24.0593 9.77486L25.8519 7.98487C26.6155 7.21671 27.5234 6.60708 28.5234 6.19102C29.5235 5.77497 30.5959 5.5607 31.679 5.56055ZM41.1734 24.2617C40.6918 23.7803 40.0387 23.5098 39.3577 23.5098C38.6767 23.5098 38.0236 23.7803 37.542 24.2617L29.0852 32.716L25.7646 29.398L25.5232 29.1848C25.007 28.7857 24.3583 28.598 23.7087 28.6599C23.0592 28.7218 22.4575 29.0286 22.026 29.518C21.5945 30.0074 21.3654 30.6427 21.3853 31.2949C21.4052 31.947 21.6726 32.5672 22.1332 33.0293L27.2695 38.1656L27.5109 38.3788C28.005 38.7621 28.622 38.9519 29.2461 38.9127C29.8703 38.8734 30.4586 38.6078 30.9008 38.1656L41.1734 27.8931L41.3866 27.6517C41.7698 27.1575 41.9597 26.5406 41.9204 25.9164C41.8812 25.2923 41.6156 24.7039 41.1734 24.2617Z"
                  fill="#D65151"
                />
              </g>
              <defs>
                <clipPath id="clip0_1739_30394">
                  <rect
                    width="61.6353"
                    height="61.6353"
                    fill="white"
                    transform="translate(0.835449 0.400391)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1 className={styles.title}>
            Oops! Something went wrong with your payment.
          </h1>
          <p className={styles.subtitle}>
            We couldn&apos;t process your payment. Please try again or contact
            support for assistance.
          </p>
        </div>
        <button className="backHome" onClick={handleHomeClick}>
          Back to home
        </button>
      </div>
    </div>
  );
};
export default Page;
