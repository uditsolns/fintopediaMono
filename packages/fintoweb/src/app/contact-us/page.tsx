"use client";

import React, { useState } from "react";
import styles from "./Contact.module.css";
import { FormikHelpers } from "formik";
import { Button, Col, Row } from "reactstrap";
import AchiveingSliderMolecule from "@src/components/molecules/AchiveingSliderMolecule/AchiveingSliderMolecule";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getCourseReviews } from "shared/src/provider/store/services/course-review.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { contactSupportField } from "shared/src/components/structures/contact-support/contactSupportModel";
import { useContactSupportHelper } from "shared/src/components/structures/contact-support/contactSupport.helper";
import CircularLoading from "@src/components/loader/CircularLoading";
import { toast } from "react-toastify";
import Instgram from "@src/assets/insta.svg";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const Contact: React.FC = () => {
  const dispatch = useAppDispatch();
  const { course_review, loading: courseReviewLoading } = useAppSelector(
    (state) => state.courseReviews
  );
  const {
    contact,
    create,
    loading: contactLoading,
  } = useAppSelector((state) => state.contact);
  const { contactSupportFormik, contactSupportInputProps } =
    useContactSupportHelper();
  const { handleSubmit, isSubmitting } = contactSupportFormik;

  React.useEffect(() => {
    dispatch(getCourseReviews());
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Why opt for an online options trading course?",
      content: "Content for section 1",
    },
    {
      title: "Is this Option Trading Course in Hindi language?",
      content: "Content for section 2",
    },
    {
      title: "Does this course cover advanced options trading strategy?",
      content: "Content for section 3",
    },
    {
      title: "Does this course cover advanced options trading strategy?",
      content: "Content for section 3",
    },
    {
      title: "Does this course covers option buying and options selling?",
      content: "Content for section 3",
    },
    {
      title: "Is this Option Trading Course in Hindi language?",
      content: "Content for section 3",
    },
  ];

  React.useEffect(() => {
    if (create?.id) {
      toast.success("Your request has been successfully submitted!", {
        position: "top-right",
        theme: "light",
      });
    }
  }, [create]);
  return (
    <>
      {courseReviewLoading?.course_review || contactLoading?.contact ? (
        <div className="fullPageLoading">
          <LoadingAtom
            style={{
              height: "5rem",
              width: "5rem",
            }}
          />
        </div>
      ) : null}
      <div>
        <div className={styles.contactSection}>
          <div className={styles.contactHeading}>
            <h1>Get in Touch with Fintopedia</h1>
            <p>
              Reach out to us for inquiries, collaborations, or just to say
              hello. We&apos;re here to listen,
              <br /> collaborate, and transform your ideas into digital
              realities.
            </p>
          </div>
          <div className={styles.contactForm}>
            <div className="row">
              <div className={`col-md-8 mt-3 ${styles.colLeft}`}>
                <Row className="form-group">
                  <Col md={6} className="mt-3">
                    <InputAtom
                      label={contactSupportField.first_name.label}
                      placeholder={contactSupportField.first_name.placeHolder}
                      {...contactSupportInputProps(
                        contactSupportField.first_name.name
                      )}
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <InputAtom
                      label={contactSupportField.last_name.label}
                      placeholder={contactSupportField.last_name.placeHolder}
                      {...contactSupportInputProps(
                        contactSupportField.last_name.name
                      )}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6} className="mt-3">
                    <InputAtom
                      label={contactSupportField.email_id.label}
                      placeholder={contactSupportField.email_id.placeHolder}
                      {...contactSupportInputProps(
                        contactSupportField.email_id.name
                      )}
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <InputAtom
                      label={contactSupportField.phone_no.label}
                      placeholder={contactSupportField.phone_no.placeHolder}
                      {...contactSupportInputProps(
                        contactSupportField.phone_no.name
                      )}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12} className="mt-3">
                    <InputAtom
                      label={contactSupportField.message.label}
                      placeholder={contactSupportField.message.placeHolder}
                      {...contactSupportInputProps(
                        contactSupportField.message.name
                      )}
                      type="textarea"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12} className="mt-3">
                    <Button
                      type="submit"
                      className={styles.contactButton}
                      size="md"
                      block
                      disabled={contactLoading?.contact}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      {contactLoading?.create ? (
                        <CircularLoading />
                      ) : (
                        " Submit your message"
                      )}
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="col-md-4">
                <div className={`mt-3 ${styles.socialCard}`}>
                  <div className={styles.socialText}>
                    Follow Us on Social Media
                  </div>
                  <div className={styles.socialIcon}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1739_29310)">
                          <path
                            d="M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z"
                            fill="#FCFCFC"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1739_29310">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6.2918 18.1256C13.8371 18.1256 17.9652 11.8729 17.9652 6.45216C17.9652 6.27638 17.9613 6.09669 17.9535 5.92091C18.7566 5.34016 19.4496 4.62082 20 3.79669C19.2521 4.12944 18.458 4.34676 17.6449 4.44122C18.5011 3.92803 19.1421 3.12184 19.4492 2.17208C18.6438 2.64941 17.763 2.98612 16.8445 3.16779C16.2257 2.51024 15.4075 2.07487 14.5164 1.92899C13.6253 1.7831 12.711 1.93482 11.9148 2.36069C11.1186 2.78656 10.4848 3.46286 10.1115 4.28504C9.73825 5.10721 9.64619 6.02946 9.84961 6.90919C8.21874 6.82735 6.62328 6.4037 5.16665 5.66569C3.71002 4.92769 2.42474 3.89181 1.39414 2.62521C0.870333 3.52831 0.710047 4.59698 0.945859 5.61402C1.18167 6.63106 1.79589 7.52015 2.66367 8.1006C2.01219 8.07991 1.37498 7.90451 0.804688 7.58888V7.63966C0.804104 8.5874 1.13175 9.5061 1.73192 10.2396C2.3321 10.9731 3.16777 11.4761 4.09687 11.6631C3.49338 11.8282 2.85999 11.8523 2.2457 11.7334C2.50788 12.5485 3.01798 13.2614 3.70481 13.7726C4.39164 14.2838 5.22093 14.5678 6.07695 14.585C4.62369 15.7265 2.82848 16.3457 0.980469 16.3428C0.652739 16.3423 0.325333 16.3222 0 16.2826C1.87738 17.4871 4.06128 18.1268 6.2918 18.1256Z"
                          fill="#FCFCFC"
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1739_29316)">
                          <path
                            d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"
                            fill="#FCFCFC"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1739_29316">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <FaInstagram size={24}/>
                    </div>
                  </div>
                </div>
                <div className={`mt-5 ${styles.socialContact}`}>
                  <div className={styles.socialContactIcon}>
                    <div className={styles.contactIcon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M1.25 7.22425V14.375C1.25 15.7557 2.36929 16.875 3.75 16.875H16.25C17.6307 16.875 18.75 15.7557 18.75 14.375V7.22425L11.3102 11.8026C10.5067 12.297 9.49327 12.297 8.68976 11.8026L1.25 7.22425Z"
                          fill="#FCFCFC"
                        />
                        <path
                          d="M18.75 5.75652V5.625C18.75 4.24429 17.6307 3.125 16.25 3.125H3.75C2.36929 3.125 1.25 4.24429 1.25 5.625V5.75652L9.34488 10.738C9.74664 10.9852 10.2534 10.9852 10.6551 10.738L18.75 5.75652Z"
                          fill="#FCFCFC"
                        />
                      </svg>
                    </div>
                    <div className={styles.contactText}>
                      <a href="mailto:reachus@fintopedia.com">
                        reachus@fintopedia.com
                      </a>
                    </div>
                  </div>
                  <div className={styles.socialContactIcon}>
                    <div className={styles.contactIcon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.25 3.75C1.25 2.36929 2.36929 1.25 3.75 1.25H4.89302C5.61 1.25 6.23498 1.73796 6.40887 2.43354L7.33037 6.11952C7.48284 6.72942 7.25495 7.37129 6.75202 7.74849L5.674 8.557C5.56206 8.64096 5.53772 8.7639 5.56917 8.84974C6.51542 11.4329 8.5671 13.4846 11.1503 14.4308C11.2361 14.4623 11.359 14.4379 11.443 14.326L12.2515 13.248C12.6287 12.7451 13.2706 12.5172 13.8805 12.6696L17.5665 13.5911C18.262 13.765 18.75 14.39 18.75 15.107V16.25C18.75 17.6307 17.6307 18.75 16.25 18.75H14.375C7.12626 18.75 1.25 12.8737 1.25 5.625V3.75Z"
                          fill="#FCFCFC"
                        />
                      </svg>
                    </div>
                    <div className={styles.contactText}>
                      <a href="tel:+917400419869">+91 7400419869</a>
                    </div>
                  </div>
                  <div className={styles.socialContactIcon}>
                    <div className={styles.contactIcon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.61646 18.6259C9.64163 18.6405 9.66141 18.6517 9.67542 18.6596L9.69869 18.6726C9.88441 18.7745 10.1148 18.7738 10.3007 18.6729L10.3246 18.6596C10.3386 18.6517 10.3584 18.6405 10.3835 18.6259C10.4339 18.5967 10.5058 18.5542 10.5963 18.4985C10.7771 18.3872 11.0323 18.223 11.3372 18.0076C11.9459 17.5776 12.7581 16.9395 13.5721 16.1061C15.1922 14.4474 16.875 11.9551 16.875 8.75C16.875 4.95304 13.797 1.875 10 1.875C6.20304 1.875 3.125 4.95304 3.125 8.75C3.125 11.9551 4.80777 14.4474 6.42788 16.1061C7.24188 16.9395 8.05409 17.5776 8.66282 18.0076C8.96771 18.223 9.22295 18.3872 9.40375 18.4985C9.49419 18.5542 9.56612 18.5967 9.61646 18.6259ZM10 11.25C11.3807 11.25 12.5 10.1307 12.5 8.75C12.5 7.36929 11.3807 6.25 10 6.25C8.61929 6.25 7.5 7.36929 7.5 8.75C7.5 10.1307 8.61929 11.25 10 11.25Z"
                          fill="#FCFCFC"
                        />
                      </svg>
                    </div>
                    <div className={styles.contactText}>Mumbai</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AchiveingSliderMolecule />
        <div className={styles.contactAccordion}>
          <h1>Frequently Asked Questions</h1>
          <div className={styles.accordion}>
            {items.map((item, index) => (
              <div key={index} className={styles.item}>
                <button
                  className={styles.header}
                  onClick={() => handleToggle(index)}
                >
                  <span className={styles.title}>{item.title}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={styles.icon}
                  >
                    <path
                      d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
                      stroke="#F4F5F5"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 9L10 12L13 9"
                      stroke="#F4F5F5"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className={styles.content}>{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
