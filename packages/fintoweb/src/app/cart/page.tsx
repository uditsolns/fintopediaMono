"use client";

import React from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import { FaStar, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import CourseDetail from "../../assets/courseDetails.png";
import styles from "./Cart.module.css";
import FeaturedCourses from "../homepage/FeaturedCourses";
import Wishlist from "./components/Wishlist";

export default function Cart() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>My Cart</h1>
        <Row className={styles.gridContainer}>
          <Col md="8">
            <div className={styles.cardList}>
              {[1, 2, 3].map((item) => (
                <Card key={item} className={styles.card}>
                  <CardBody className={styles.cardBody}>
                    <Row>
                      {/* Image Column */}
                      <Col xs="12" md="4" className={styles.imageCol}>
                        <Image
                          src={CourseDetail}
                          alt="Course thumbnail"
                          className={styles.image}
                        />
                      </Col>

                      {/* Course Details Column */}
                      <Col xs="12" md="8" className={styles.detailsCol}>
                        <div className={styles.title}>
                          <h2 className={styles.courseTitle}>
                            Basics of Stock Market
                          </h2>
                          <div className={styles.priceWrapper}>
                            <div className={styles.price}>₹2,999</div>
                          </div>
                        </div>

                        <div className={styles.courseDetails}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M19.6218 9.20906C19.845 9.04277 20.0106 8.81079 20.0953 8.54564C20.18 8.2805 20.1796 7.99548 20.0942 7.73056C20.0087 7.46564 19.8425 7.23411 19.6189 7.06842C19.3952 6.90273 19.1253 6.81119 18.847 6.80664L13.4415 6.60244C13.415 6.6006 13.3895 6.59112 13.3682 6.57514C13.3468 6.55916 13.3306 6.53735 13.3214 6.51235L11.4535 1.46727C11.3597 1.21059 11.1892 0.988958 10.9652 0.832368C10.7413 0.675777 10.4746 0.591797 10.2013 0.591797C9.92797 0.591797 9.66128 0.675777 9.4373 0.832368C9.21331 0.988958 9.04286 1.21059 8.94901 1.46727L7.08713 6.53037C7.07793 6.55537 7.06169 6.57717 7.04038 6.59316C7.01907 6.60914 6.99359 6.61862 6.96701 6.62046L1.56157 6.82466C1.28325 6.82921 1.01334 6.92074 0.789668 7.08643C0.566 7.25213 0.399795 7.48366 0.314359 7.74858C0.228923 8.0135 0.22854 8.29851 0.313263 8.56366C0.397986 8.82881 0.563567 9.06079 0.786789 9.22708L5.02706 12.5604C5.04828 12.5771 5.06414 12.5997 5.07268 12.6253C5.08122 12.6509 5.08206 12.6785 5.07511 12.7046L3.61564 17.8758C3.54001 18.1391 3.54733 18.4194 3.63662 18.6784C3.72591 18.9374 3.89282 19.1626 4.11465 19.3234C4.33648 19.4842 4.60246 19.5728 4.8764 19.577C5.15034 19.5813 5.41895 19.5011 5.64568 19.3473L10.1262 16.3442C10.1483 16.329 10.1744 16.3208 10.2013 16.3208C10.2281 16.3208 10.2543 16.329 10.2763 16.3442L14.7569 19.3473C14.9805 19.5063 15.2482 19.5918 15.5226 19.5918C15.7971 19.5918 16.0647 19.5063 16.2884 19.3473C16.5103 19.188 16.6774 18.9639 16.7666 18.7057C16.8559 18.4476 16.863 18.1681 16.7869 17.9058L15.3154 12.7166C15.3076 12.6905 15.3081 12.6627 15.3166 12.6369C15.3252 12.6111 15.3416 12.5886 15.3635 12.5724L19.6218 9.20906Z"
                              fill="#FFA11A"
                            />
                          </svg>
                          <span className={styles.textGray}>4.8/5</span>
                          <span className={styles.textGray}>Beginner</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_1809_10113)">
                              <path
                                d="M9.21119 0.841797C7.57949 0.841797 5.98444 1.32565 4.62773 2.23217C3.27103 3.13869 2.2136 4.42717 1.58918 5.93466C0.964756 7.44215 0.801379 9.10095 1.11971 10.7013C1.43803 12.3016 2.22377 13.7716 3.37755 14.9254C4.53134 16.0792 6.00135 16.8649 7.60169 17.1833C9.20203 17.5016 10.8608 17.3382 12.3683 16.7138C13.8758 16.0894 15.1643 15.032 16.0708 13.6753C16.9773 12.3185 17.4612 10.7235 17.4612 9.0918C17.4586 6.90455 16.5886 4.80763 15.042 3.26102C13.4953 1.7144 11.3984 0.844377 9.21119 0.841797ZM11.9914 11.872C11.8508 12.0127 11.6601 12.0916 11.4612 12.0916C11.2623 12.0916 11.0716 12.0127 10.9309 11.872L8.68094 9.62205C8.54027 9.48143 8.46123 9.29069 8.46119 9.0918V4.5918C8.46119 4.39288 8.5402 4.20212 8.68086 4.06147C8.82151 3.92081 9.01227 3.8418 9.21119 3.8418C9.4101 3.8418 9.60086 3.92081 9.74152 4.06147C9.88217 4.20212 9.96119 4.39288 9.96119 4.5918V8.7813L11.9914 10.8115C12.132 10.9522 12.211 11.1429 12.211 11.3418C12.211 11.5407 12.132 11.7314 11.9914 11.872Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1809_10113">
                                <rect
                                  width="18"
                                  height="18"
                                  fill="white"
                                  transform="translate(0.211182 0.0917969)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <span className={styles.textGray}>20 Hours</span>
                        </div>
                        <div className={`${styles.actions}`}>
                          <button className={styles.saveLater}>
                            Save for later
                          </button>
                          <button className={styles.remove}>Remove</button>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>

          <Col md="4">
            <Card className={styles.summary}>
              <CardBody className={styles.summaryBody}>
                <div className={styles.summaryFirst}>
                  <p className={styles.summaryHeading}>
                    You have <b> 3 items</b> in your cart
                  </p>
                  <Button
                    outline
                    color="secondary"
                    className={styles.couponButton}
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
                      <span className={styles.subtotalText}>Subtotal</span>
                      <span className={styles.subtotalPrice}>₹6,000</span>
                    </div>
                    <div
                      className={`${styles.discount} d-flex justify-content-between mt-3`}
                    >
                      <span className={styles.textLightGray}>Discount</span>
                      <h6>- ₹1,000</h6>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <span className={styles.textLightGray}>GST</span>
                      <span className={styles.textLightGray}>+ ₹0.0</span>
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
                    <span className={styles.separatorPrice}>₹ 1,000</span> on
                    this order
                  </p>
                </div>
                <div className={styles.totalRow}>
                  <h4>Total</h4>
                  <h5>₹7,000</h5>
                </div>
                <div className={styles.buttons}>
                  <Button className={styles.checkoutButton}>
                    Proceed to checkout
                  </Button>
                  <Button className={styles.shoppingButton}>
                    Continue Shopping
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div className={styles.likeCourses}>
        <h2>You might also like</h2>
        <FeaturedCourses />
      </div>
      <div className={styles.wishlist}>
        <Wishlist />
      </div>
    </>
  );
}
