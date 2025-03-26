"use client";
import React from "react";
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

interface CourseCartState {
  subtotal: number;
  actualPricetotal: number;
  totalDiscount: number;
  totalPay: number;
  gst: number;
  loadingCourseId: number | null;
}
const page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const id = localStorage.getItem("transactionId");

  const courseCart = localStorage.getItem("courseCart");
  const savedState = localStorage.getItem("courseCartState");

  const PHONEPE_MERCHANT_ID = "AURAHONLINEUAT";
  const PHONEPE_SALT_KEY = "c9170f9e-85bc-4055-8cec-812bf1b73f53";
  const PHONEPE_SALT_INDEX = 1;
  const PHONEPE_CALLBACK_URL = "http://127.0.0.1:8000/payment/response";
  const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";

  const sha256Res2 = sha256(
    `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${id}` + PHONEPE_SALT_KEY
  );
  const finalXHeader2 = `${sha256Res2}###${PHONEPE_SALT_INDEX}`;

  const course_id_arr = courseCart ? JSON.parse(courseCart) : [];
  const courseIds = course_id_arr.map(
    (itm: { course_id: number }) => itm.course_id
  );
  const currentPurchaseDate = new Date().toISOString().split("T")[0];

  React.useEffect(() => {
    const parsedState: CourseCartState = JSON.parse(savedState);
    console.log(parsedState);
    if (courseCart && parsedState) {
      try {
        fetch(`${PHONEPE_API_URL}/pg/v1/status/${PHONEPE_MERCHANT_ID}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": finalXHeader2,
            "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
          },
        })
          .then((response) => response.json())
          .then(async (res) => {
            const params = {
              user_id: auth?.user?.id,
              course_id: courseIds,
              purchase_date: currentPurchaseDate,
              status: res?.code === "PAYMENT_SUCCESS" ? "paid" : "failed",
              payment_status:
                res?.code === "PAYMENT_SUCCESS" ? "paid" : "failed",
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
              pgTransactionId:
                res?.data?.paymentInstrument?.pgTransactionId || "",
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
                params,
                onSuccess(data) {
                  console.log("Purchase history created successfully:", data);
                  // Capture the ID from the response data
                  const purchaseId = data?.data?.id;
                  console.log("Captured purchase ID:", purchaseId);

                  if (purchaseId) {
                    let params = {
                      id: purchaseId,
                    };
                    dispatch(
                      getPurchaseHistoryById({
                        params,
                        onSuccess(historyData) {
                          console.log("Purchase history data:", historyData);
                          router.push("/checkout/invoice-screen");
                        },
                        onError(error) {
                          console.log(
                            "Error fetching purchase history by ID:",
                            error
                          );
                        },
                      })
                    );
                  } else {
                    console.error(
                      "Purchase ID is missing from the response data."
                    );
                  }
                },
                onError(error) {
                  console.log("Error creating purchase history:", error);
                },
              })
            );
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
          });
      } catch (error) {
        console.log("paymentCheckStaus error", error);
      }
    }
  }, [id, courseCart]);
  return (
    <div className="flex justify-center items-center text-center">
      You payment has been done successfully
    </div>
  );
};

export default page;
