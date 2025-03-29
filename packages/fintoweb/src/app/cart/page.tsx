"use client";

import React, { useEffect } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import { FaChevronRight } from "react-icons/fa";
import styles from "./Cart.module.css";
import LikeCourses from "./components/like-courses/LikeCourses";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getCourses } from "shared/src/provider/store/services/courses.service";
import {
  createCourseCart,
  deleteCourseCart,
  getCourseCart,
} from "shared/src/provider/store/services/CourseCart.service";
import CoursesMolecule from "@src/components/molecules/CoursesMolecule/CoursesMolecule";
import CourseCartMolecule from "@src/components/molecules/CourseCartMolecule/CourseCartMolecule";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import {
  addTwoNumber,
  API_ENDPOINT,
  CALLBACK_URL,
  isInCart,
  MERCHANT_ID,
  PRODUCTION_HOST_URL,
  REDIRECT_URL,
  SALT_INDEX,
  SALT_KEY,
  subtractTwoNumber,
  sumCalculate,
  calculatePercetageAmount,
} from "shared/src/components/atoms/Calculate";
import {
  createCoursesSaveLater,
  getCoursesSaveLater,
} from "shared/src/provider/store/services/coursesavelater.service";
import { useRouter, redirect } from "next/navigation";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { toast } from "react-toastify";
import sha256 from "crypto-js/sha256";
import { CoursesSaveLaterResponse } from "shared/src/utils/types/courses-save-later";
import CourseSaveLaterMolecule from "@src/components/molecules/CoursesMolecule/CourseSaveLaterMolecule";
import { getLikeCourse } from "shared/src/provider/store/services/course-like.service";
import { useCartContext } from "@src/app/context/CartContextApi";

export default function Cart() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    isCouponCodeApply,
    totalPaymentAmount,
    setTotalPaymentAmount,
    setKeepTotalPaymentAmount,
    couponCodePercentage,
    keepTotalPaymentAmount,
  } = useCartContext();
  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const { likeCourse, loading: likeCourseLoading } = useAppSelector(
    (state) => state.likeCourse
  );
  const {
    courseCart,
    loading: courseCartLoading,
    delete: deleteCart,
    create,
  } = useAppSelector((state) => state.courseCart);
  const { courses_save_later, loading: coursesSaveLaterLoading } =
    useAppSelector((state) => state.coursesSaveLater);
  const { auth } = useAppSelector((state) => state.auth);

  // Save courseCart to localStorage
  React.useEffect(() => {
    if (courseCart && courseCart.length > 0) {
      localStorage.setItem("courseCart", JSON.stringify(courseCart));
    }
  }, [courseCart]); // Re-run effect when courseCart changes

  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [actualPricetotal, setActualPricetotal] = React.useState<number>(0);
  const [totalDiscount, setTotalDiscount] = React.useState<number>(0);
  const [totalPay, setTotalPay] = React.useState<number>(0);
  const [gst, setGst] = React.useState<number>(0);
  const [loadingCourseId, setLoadingCourseId] = React.useState<number | null>(
    null
  );
  const totalDiscountAmount = isCouponCodeApply ? totalPaymentAmount : totalPay;

  React.useEffect(() => {
    const dataToStore = {
      subtotal,
      actualPricetotal,
      totalDiscount,
      totalPay: totalDiscountAmount,
      gst,
      loadingCourseId,
      couponCodePercentage,
    };
    localStorage.setItem("courseCartState", JSON.stringify(dataToStore));
  }, [
    subtotal,
    actualPricetotal,
    totalDiscount,
    totalPay,
    gst,
    loadingCourseId,
    totalDiscountAmount,
    isCouponCodeApply,
    couponCodePercentage,
  ]);
  React.useEffect(() => {
    if (courseCart) {
      let sale_price = sumCalculate(courseCart, "sale_price");
      let actual_price = sumCalculate(courseCart, "actual_price");
      let totalDiscountAmount = subtractTwoNumber(sale_price, actual_price);
      let gstTotal = (sale_price * 18) / 100;
      let totalPayAmount = addTwoNumber(sale_price, gstTotal);
      setGst(gstTotal);
      setSubtotal(sale_price);
      setActualPricetotal(actual_price);
      setTotalDiscount(totalDiscountAmount);
      setTotalPay(totalPayAmount);
      setKeepTotalPaymentAmount(totalPayAmount);
    }
  }, [courseCart, create, deleteCart]);

  // useEffect(() => {
  //   React.useCallback(() => {
  //     if (couponCodePercentage) {
  //       let amt = calculatePercetageAmount(
  //         couponCodePercentage,
  //         keepTotalPaymentAmount
  //       );
  //       let total2 = subtractTwoNumber(amt, keepTotalPaymentAmount);
  //       setTotalPaymentAmount(total2);
  //       console.log("----------------------------------", total2);
  //     }
  //   }, [courseCart, create, deleteCart, totalPay, keepTotalPaymentAmount]);
  // }, [courseCart, create, deleteCart, totalPay, keepTotalPaymentAmount]);
  useEffect(() => {
    if (couponCodePercentage) {
      // Calculate the percentage amount based on couponCodePercentage
      let amt = calculatePercetageAmount(
        couponCodePercentage,
        keepTotalPaymentAmount
      );

      // Subtract the calculated amount from the total payment
      let total2 = subtractTwoNumber(amt, keepTotalPaymentAmount);

      // Update the total payment amount in the state
      setTotalPaymentAmount(total2);

      // Log the updated total payment amount
      console.log("----------------------------------", total2);
    }
  }, [
    couponCodePercentage,
    courseCart,
    create,
    deleteCart,
    totalPay,
    keepTotalPaymentAmount,
  ]);

  React.useEffect(() => {
    if (auth?.token) {
      dispatch(getCourses());
      dispatch(getCourseCart());
      dispatch(getCoursesSaveLater());
      dispatch(getLikeCourse());
    } else {
      router.push("/auth/login");
    }
  }, [auth?.token, dispatch]);

  const handleCourseClick = async (course: CoursesResponse) => {
    setLoadingCourseId(course.id);
    if (!auth?.token) {
      router.push("/auth/login");
      setLoadingCourseId(null);
      return;
    }
    if (isInCart(courseCart, course?.id)) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/cart");
      } finally {
        setLoadingCourseId(null);
      }
      return;
    }
    const params = {
      user_id: Number(auth?.user?.id),
      course_id: Number(course?.id),
      status: "1",
    };
    try {
      await dispatch(
        createCourseCart({
          params,
          onSuccess: (data) => {
            toast.success(data.message, {
              position: "top-right",
              theme: "light",
            });
            router.push("/cart");
          },
          onError: (err) => {},
        })
      ).unwrap();
    } finally {
      setLoadingCourseId(null);
    }
  };
  const handleCourseSavelaterClick = async (
    saveLater: CoursesSaveLaterResponse
  ) => {
    setLoadingCourseId(saveLater.course_id);
    if (!auth?.token) {
      router.push("/auth/login");
      setLoadingCourseId(null);
      return;
    }
    if (isInCart(courseCart, saveLater?.course_id)) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/cart");
      } finally {
        setLoadingCourseId(null);
      }
      return;
    }
    const params = {
      user_id: Number(auth?.user?.id),
      course_id: Number(saveLater.course_id),
      status: "1",
    };
    try {
      await dispatch(
        createCourseCart({
          params,
          onSuccess: (data) => {
            toast.success(data.message, {
              position: "top-right",
              theme: "light",
            });
            router.push("/cart");
          },
          onError: (err) => {},
        })
      ).unwrap();
    } finally {
      setLoadingCourseId(null);
    }
  };
  const handleDeliveryClick = () => {
    router.push("/checkout/invoice-screen");
  };
  const handleCouponClick = () => {
    router.push("/checkout/coupon-codes");
  };
  const PHONEPE_MERCHANT_ID = "AURAHONLINEUAT";
  const PHONEPE_SALT_KEY = "c9170f9e-85bc-4055-8cec-812bf1b73f53";
  const PHONEPE_SALT_INDEX = 1;
  const PHONEPE_CALLBACK_URL = "http://127.0.0.1:8000/payment/response";
  const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/";

  // const payload = {
  //   merchantId: MERCHANT_ID,
  //   merchantTransactionId: transactionId,
  //   merchantUserId: `${auth?.user?.id}`,
  //   amount: totalPay * 100,
  //   redirectUrl: `http://localhost:3000/api/status/${transactionId}`,
  //   redirectMode: "POST",
  //   callbackUrl: `http://localhost:3000/api/status/${transactionId}`,
  //   mobileNumber: `${auth?.user?.phone}`,
  //   paymentInstrument: {
  //     type: "PAY_PAGE",
  //   },
  // };
  const handlePayment = async (e) => {
    e.preventDefault();

    const transactionid = `${new Date().getTime()}`;
    localStorage.setItem("transactionId", transactionid);
    const payload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionid,
      merchantUserId: "MUID-" + transactionid,
      amount: isCouponCodeApply ? totalPaymentAmount * 100 : totalPay * 100,
      redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    console.log(dataPayload);

    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    console.log(dataBase64);

    const fullURL = dataBase64 + "/pg/v1/pay" + PHONEPE_SALT_KEY;
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + "###" + PHONEPE_SALT_INDEX;
    console.log("c====", checksum);

    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    try {
      const response = await fetch(UAT_PAY_API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        body: JSON.stringify({
          request: dataBase64,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment request failed");
      }

      const responseData = await response.json();
      const redirect = responseData.data.instrumentResponse.redirectInfo.url;
      router.push(redirect);
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  return (
    <>
      {courseCartLoading?.courseCart ||
      coursesLoading?.courses ||
      coursesSaveLaterLoading?.courses_save_later ||
      likeCourseLoading?.likeCourse ? (
        <div className="fullPageLoading">
          <LoadingAtom
            style={{
              height: "5rem",
              width: "5rem",
            }}
          />
        </div>
      ) : null}

      <div className={styles.CartDetails}>
        <div className={styles.container}>
          <h1 className={styles.heading}>My Cart</h1>
          {courseCart?.length > 0 ? (
            <Row className={styles.gridContainer}>
              <Col md="8">
                <div className={styles.cardList}>
                  {courseCart?.map((cart, index) => {
                    return (
                      <CourseCartMolecule
                        key={cart.id}
                        cart={cart}
                        onClick={() => {}}
                        onSaveLater={() => {
                          if (
                            courses_save_later?.some(
                              (el) => el?.course_id == cart?.course_id
                            )
                          ) {
                            toast.success(
                              "You have already added to save for later.",
                              {
                                position: "top-right",
                                theme: "light",
                              }
                            );
                          }
                          let params = {
                            user_id: Number(auth?.user?.id),
                            course_id: Number(cart?.course_id),
                            status: "1",
                          };
                          dispatch(
                            createCoursesSaveLater({
                              params,
                              onSuccess(data) {
                                toast.success(
                                  "Course Successfully Added to Save Later.",
                                  {
                                    position: "top-right",
                                    theme: "light",
                                  }
                                );
                                console.log("createCoursesSaveLater");
                              },
                              onError(error) {
                                toast.error("Failed to course Save Later.", {
                                  position: "top-right",
                                  theme: "light",
                                });
                              },
                            })
                          );
                        }}
                        onRemove={() => {
                          let id = Number(cart?.id);
                          dispatch(
                            deleteCourseCart({
                              id,
                              onSuccess: (data) => {
                                console.log("delete cart", data);
                                toast.success(data.message, {
                                  position: "top-right",
                                  theme: "light",
                                });
                              },
                              onError: (err) => {
                                console.log("delete cart err", err);
                                toast.error(
                                  "Failed to delete course from cart.",
                                  {
                                    position: "top-right",
                                    theme: "light",
                                  }
                                );
                              },
                            })
                          );
                        }}
                      />
                    );
                  })}
                </div>
              </Col>

              <Col md="4">
                <Card className={styles.summary}>
                  <CardBody className={styles.summaryBody}>
                    <div className={styles.summaryFirst}>
                      <p className={styles.summaryHeading}>
                        You have <b>{courseCart?.length} items</b> in your cart
                      </p>
                      <Button
                        outline
                        color="secondary"
                        className={styles.couponButton}
                        onClick={handleCouponClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_1809_9921)">
                            <path
                              d="M15 5V7"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15 11V13"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15 17V19"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V10C20.4696 10 19.9609 10.2107 19.5858 10.5858C19.2107 10.9609 19 11.4696 19 12C19 12.5304 19.2107 13.0391 19.5858 13.4142C19.9609 13.7893 20.4696 14 21 14V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V14C3.53043 14 4.03914 13.7893 4.41421 13.4142C4.78929 13.0391 5 12.5304 5 12C5 11.4696 4.78929 10.9609 4.41421 10.5858C4.03914 10.2107 3.53043 10 3 10V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1809_9921">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Coupons and Bank offers
                        <FaChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                      <div className={styles.summaryText}>
                        <div className="d-flex justify-content-between mt-3">
                          <span className={styles.subtotalText}>
                            Actual Price
                          </span>
                          <span className={styles.subtotalPrice}>
                            ₹{actualPricetotal}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                          <span className={styles.subtotalText}>
                            Sale Price
                          </span>
                          <span className={styles.subtotalPrice}>
                            ₹{subtotal}
                          </span>
                        </div>
                        {/* <div
                          className={`${styles.discount} d-flex justify-content-between mt-3`}
                        >
                          <span className={styles.textLightGray}>Discount</span>
                          <h6>- ₹{totalDiscount}</h6>
                        </div> */}
                        <div className="d-flex justify-content-between mt-3">
                          <span className={styles.textLightGray}>GST</span>
                          <span className={styles.textLightGray}>+ ₹{gst}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.separator}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1809_9931)">
                          <path
                            d="M4.5 5H6.5"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.5 4V6"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 4L11.5 6"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.5 5H20.5"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.5 4V6"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.5 9L14.5 10"
                            stroke="#76D651"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.5 13L20.5 12.5"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.5 19H20.5"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.5 18V20"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.5 16.518L7.98205 10L3.59205 19.58C3.50528 19.766 3.47785 19.9742 3.51347 20.1763C3.5491 20.3785 3.64605 20.5647 3.79118 20.7099C3.93632 20.855 4.12259 20.952 4.32472 20.9876C4.52685 21.0232 4.73505 20.9958 4.92105 20.909L14.5 16.518Z"
                            stroke="#76D651"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1809_9931">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p>
                        Wohoo! You’re saving{" "}
                        <span className={styles.separatorPrice}>
                          ₹{totalDiscount}
                        </span>{" "}
                        on this order
                      </p>
                    </div>
                    <div className={styles.totalRow}>
                      <h4>Total</h4>
                      {/* <h5>₹{totalPay}</h5> */}
                      <h5>{`₹ ${
                        isCouponCodeApply ? totalPaymentAmount : totalPay
                      }`}</h5>
                    </div>
                    <div className={styles.buttons}>
                      <Button
                        className={styles.checkoutButton}
                        // onClick={handlePayment}
                        onClick={(e) => handlePayment(e)}
                      >
                        Proceed to checkout
                      </Button>
                      <Button
                        className={styles.checkoutButton}
                        onClick={handleDeliveryClick}
                      >
                        Cash on Delivery
                      </Button>
                      <Button className={styles.shoppingButton}>
                        Continue Shopping
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            <div className={styles.emptyCartMessage}>
              <p>Your cart is empty. Start adding courses to see them here!</p>
            </div>
          )}
        </div>
        {/* <Pay /> */}
        <div className={styles.likeCourses}>
          <LikeCourses courses={likeCourse} />
        </div>
        <div className={styles.wishlist}>
          <h1 className={styles.wishlistHeading}>Wishlist</h1>

          {courses_save_later.length === 0 ? (
            <p>No items found in your wishlist.</p>
          ) : (
            <Row className="mt-3">
              {courses_save_later.map((saveLater) => (
                <Col md={4} key={saveLater.id}>
                  <CourseSaveLaterMolecule
                    saveLater={saveLater}
                    loading={loadingCourseId === saveLater.id}
                    onClick={() => handleCourseSavelaterClick(saveLater)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
}
