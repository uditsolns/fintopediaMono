"use client";

import React from "react";
import styles from "./InvoiceScreen.module.css";
import { useRouter } from "next/navigation";
import {
  addTwoNumber,
  subtractTwoNumber,
  sumCalculate,
} from "shared/src/components/atoms/Calculate";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import ProgressBar from "@src/components/progress/ProgressBar";
import { useCartContext } from "@src/app/context/CartContextApi";

export default function InvoiceScreen() {
  const { singlePurchaseHistory: purchaseRes, loading } = useAppSelector(
    (state) => state.purchaseHistory
  );
  console.log("purchaseRes", purchaseRes);
  const {
    setCouponCodePercentage,
    setIsCouponCodeApply,
    setTotalPaymentAmount,
    setKeepTotalPaymentAmount,
  } = useCartContext();

  const data = localStorage.getItem("singlePurchaseHistory");

  const singlePurchaseHistory = data ? JSON.parse(data) : purchaseRes;
  console.log("singlePurchaseHistory", singlePurchaseHistory);

  const router = useRouter();
  const handleHomeClick = () => {
    router.push("/");
    // localStorage.clear();
    localStorage.removeItem("transactionId");
    localStorage.removeItem("singlePurchaseHistory");
    localStorage.removeItem("courseCartState");
    localStorage.removeItem("courseCart");
  };

  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [totalDiscount, setTotalDiscount] = React.useState<number>(0);
  const [totalPay, setTotalPay] = React.useState<number>(0);
  const [gst, setGst] = React.useState<number>(0);
  const [actualPricetotal, setActualPricetotal] = React.useState<number>(0);

  React.useEffect(() => {
    if (singlePurchaseHistory?.courses?.length) {
      let sale_price = sumCalculate(
        singlePurchaseHistory?.courses,
        "sale_price"
      );
      let actual_price = sumCalculate(
        singlePurchaseHistory?.courses,
        "actual_price"
      );
      let totalDiscountAmount = subtractTwoNumber(sale_price, actual_price);
      let gstTotal = (sale_price * 18) / 100;
      let totalPayAmount = addTwoNumber(sale_price, gstTotal);
      setGst(gstTotal);
      setActualPricetotal(actual_price);
      setSubtotal(sale_price);
      setTotalDiscount(totalDiscountAmount);
      setTotalPay(totalPayAmount);
      setKeepTotalPaymentAmount(totalPayAmount);
    }
    return () => {
      setIsCouponCodeApply(false);
      setTotalPaymentAmount("");
      setCouponCodePercentage(0);
    };
  }, [singlePurchaseHistory]);
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
              <g clip-path="url(#clip0_1739_30394)">
                <circle cx="32.295" cy="30.5743" r="16.0509" fill="white" />
                <path
                  d="M31.679 5.56055C33.6765 5.56067 35.6055 6.28828 37.1055 7.60735L37.501 7.97973L39.2935 9.77229C39.7855 10.261 40.4279 10.5696 41.1169 10.648L41.4636 10.6686H44.0317C46.1305 10.6685 48.1497 11.4713 49.6754 12.9125C51.2011 14.3536 52.1176 16.3239 52.2369 18.4192L52.2498 18.8866V21.4548C52.2498 22.1481 52.486 22.8236 52.9123 23.3629L53.1435 23.6197L54.9335 25.4123C56.4171 26.8875 57.2822 28.8731 57.3524 30.9642C57.4225 33.0553 56.6924 35.0945 55.311 36.6658L54.9386 37.0613L53.146 38.8539C52.6573 39.3458 52.3488 39.9883 52.2703 40.6773L52.2498 41.024V43.5921C52.2499 45.6908 51.4471 47.7101 50.0059 49.2358C48.5647 50.7614 46.5945 51.6779 44.4991 51.7973L44.0317 51.8101H41.4636C40.7712 51.8104 40.099 52.0438 39.5555 52.4727L39.2987 52.7038L37.5061 54.4938C36.0308 55.9775 34.0452 56.8426 31.9541 56.9128C29.863 56.9829 27.8239 56.2528 26.2525 54.8714L25.857 54.499L24.0645 52.7064C23.5725 52.2177 22.9301 51.9091 22.2411 51.8307L21.8944 51.8101H19.3263C17.2275 51.8103 15.2083 51.0074 13.6826 49.5663C12.1569 48.1251 11.2404 46.1548 11.1211 44.0595L11.1082 43.5921V41.024C11.108 40.3315 10.8746 39.6594 10.4456 39.1158L10.2145 38.859L8.42451 37.0665C6.94085 35.5912 6.07575 33.6056 6.0056 31.5145C5.93545 29.4234 6.66554 27.3843 8.04699 25.8129L8.41937 25.4174L10.2119 23.6248C10.7007 23.1329 11.0092 22.4905 11.0877 21.8015L11.1082 21.4548V18.8866L11.1211 18.4192C11.2357 16.4044 12.0878 14.5022 13.5148 13.0751C14.9418 11.6481 16.844 10.7961 18.8589 10.6814L19.3263 10.6686H21.8944C22.5868 10.6683 23.259 10.4349 23.8025 10.006L24.0593 9.77486L25.8519 7.98487C26.6155 7.21671 27.5234 6.60708 28.5234 6.19102C29.5235 5.77497 30.5959 5.5607 31.679 5.56055ZM41.1734 24.2617C40.6918 23.7803 40.0387 23.5098 39.3577 23.5098C38.6767 23.5098 38.0236 23.7803 37.542 24.2617L29.0852 32.716L25.7646 29.398L25.5232 29.1848C25.007 28.7857 24.3583 28.598 23.7087 28.6599C23.0592 28.7218 22.4575 29.0286 22.026 29.518C21.5945 30.0074 21.3654 30.6427 21.3853 31.2949C21.4052 31.947 21.6726 32.5672 22.1332 33.0293L27.2695 38.1656L27.5109 38.3788C28.005 38.7621 28.622 38.9519 29.2461 38.9127C29.8703 38.8734 30.4586 38.6078 30.9008 38.1656L41.1734 27.8931L41.3866 27.6517C41.7698 27.1575 41.9597 26.5406 41.9204 25.9164C41.8812 25.2923 41.6156 24.7039 41.1734 24.2617Z"
                  fill="#76D651"
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
            Thank you for enrolling in the Comprehensive Finance Course!
          </h1>
          <p className={styles.subtitle}>
            We look forward to helping you achieve your financial goals!
          </p>
        </div>
        {singlePurchaseHistory?.courses?.map((el, index) => {
          return (
            <div className={styles.card} key={index}>
              <h2 className={styles.cardTitle}>{el?.name}</h2>
              <p className={styles.cardDescription}>{el?.description}</p>
              <div className={styles.starsContainer}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={styles.starIcon}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Star SVG content */}
                    </svg>
                  ))}
                </div>
                <span className={`${styles.textGray} ml-3`}>
                  <ProgressBar level={el?.course_type} />
                </span>
                <span className={`${styles.textGray} ml-3`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M11.0037 1.04297C9.03528 1.04297 7.11109 1.62667 5.47442 2.72025C3.83776 3.81384 2.56213 5.36819 1.80886 7.18676C1.05558 9.00532 0.858491 11.0064 1.24251 12.937C1.62652 14.8676 2.5744 16.6409 3.96627 18.0328C5.35814 19.4247 7.13149 20.3725 9.06207 20.7566C10.9926 21.1406 12.9937 20.9435 14.8123 20.1902C16.6309 19.4369 18.1852 18.1613 19.2788 16.5246C20.3724 14.888 20.9561 12.9638 20.9561 10.9954C20.953 8.35679 19.9034 5.82717 18.0377 3.9614C16.1719 2.09564 13.6423 1.04608 11.0037 1.04297ZM14.3576 14.3493C14.188 14.519 13.9579 14.6142 13.718 14.6142C13.4781 14.6142 13.248 14.519 13.0783 14.3493L10.364 11.635C10.1943 11.4654 10.099 11.2353 10.0989 10.9954V5.56679C10.0989 5.32683 10.1942 5.0967 10.3639 4.92703C10.5336 4.75735 10.7637 4.66203 11.0037 4.66203C11.2436 4.66203 11.4738 4.75735 11.6435 4.92703C11.8131 5.0967 11.9085 5.32683 11.9085 5.56679V10.6208L14.3576 13.07C14.5273 13.2397 14.6226 13.4698 14.6226 13.7097C14.6226 13.9496 14.5273 14.1797 14.3576 14.3493Z"
                      fill="white"
                    />
                  </svg>
                  {el?.duration_time}
                </span>
                <span className={`${styles.textGray} ml-3`}>4.8 ⭐</span>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.price}>₹ {el?.sale_price}</span>
                <button
                  className={styles.button}
                  onClick={() =>
                    router.push(`/course-details-enrolling/${el?.id}`)
                  }
                >
                  Start This Course now ➔
                </button>
              </div>
            </div>
          );
        })}

        <h3 className={styles.invoiceDetailsHeading}>Invoice details</h3>
        <div className={styles.card}>
          <div className={styles.invoiceDetails}>
            <div className={styles.detailsRow}>
              <span className={styles.detailsGrayText}>
                Invoice Number: INV-20240628-001
              </span>
            </div>
            {singlePurchaseHistory?.courses?.map((el, index) => {
              return (
                <div className={styles.detailsRow}>
                  <span className={styles.detailsHeading}>{el?.name}</span>
                  <span>₹ {el?.sale_price}</span>
                </div>
              );
            })}

            <div className="p-4">
              <hr />
            </div>

            <div className={styles.detailsRow}>
              <span className={styles.detailsGrayText}>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>
            <div className={styles.detailsRow}>
              <span className={styles.detailsGrayText}>Discount</span>
              <span>- ₹ {totalDiscount}</span>
            </div>
            <div className={styles.detailsRow}>
              <span className={styles.detailsGrayText}>GST</span>
              <span>- ₹ {gst}</span>
            </div>
            <div className="p-4">
              <hr />
            </div>
            <div className={`${styles.detailsRow} ${styles.grandTotal}`}>
              <span>Grand total</span>
              <span>₹ {totalPay}</span>
            </div>
          </div>
          <div className={styles.downloadButton}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_1739_30439)">
                  <path
                    d="M4 17.002V19.002C4 19.5324 4.21071 20.0411 4.58579 20.4162C4.96086 20.7912 5.46957 21.002 6 21.002H18C18.5304 21.002 19.0391 20.7912 19.4142 20.4162C19.7893 20.0411 20 19.5324 20 19.002V17.002"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 11.002L12 16.002L17 11.002"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 3.99805V15.998"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1739_30439">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Download Invoice
            </button>
          </div>
        </div>

        <p className={styles.contactText}>
          If you have any questions regarding this invoice, please contact us at{" "}
          <a href="mailto:support@financedu.com" className={styles.link}>
            support@financedu.com
          </a>{" "}
          or call <span className={styles.link}>+91 7391 739 7890</span>
        </p>
        <button className={styles.homeButton} onClick={handleHomeClick}>
          Back to home
        </button>
      </div>
    </div>
  );
}
