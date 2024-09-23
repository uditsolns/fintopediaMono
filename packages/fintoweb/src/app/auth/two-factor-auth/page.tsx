"use client";
import React, { useRef } from "react";
import styles from "../Auth.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Button, Col, Row } from "reactstrap";
import * as Yup from "yup";

interface OTPFormValues {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

const TwoFactorAuth: React.FC = () => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleSubmit = (
    values: OTPFormValues,
    { setSubmitting }: FormikHelpers<OTPFormValues>
  ) => {
    const otp =
      values.otp1 +
      values.otp2 +
      values.otp3 +
      values.otp4 +
      values.otp5 +
      values.otp6;
    setSubmitting(false);
    console.log("OTP Submitted:", otp);
  };

  const handleOtpInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus(); // Move to next input if a digit is entered
    } else if (value.length === 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus(); // Move to the previous input on backspace
    }
  };

  return (
    <div className={styles.twofactorContainer}>
      <div className="container main-login-div">
        <div className="no-gutters justify-content-center row">
          <div className="col-md-6 col-lg-6 login-card">
            <h1 className={styles.twofactorHeading}>
              Two-Factor Authentication
            </h1>
            <p className={styles.twofactorSubHeading}>
              Enter the 6-digit code sent to your phone
              <br /> number +9180*****890
            </p>
            <div className="main-content">
              <div className="p-3">
                <Formik
                  initialValues={{
                    otp1: "",
                    otp2: "",
                    otp3: "",
                    otp4: "",
                    otp5: "",
                    otp6: "",
                  }}
                  validationSchema={Yup.object().shape({
                    otp1: Yup.string()
                      .required("Required")
                      .matches(/^\d$/, "Must be a digit"),
                    otp2: Yup.string()
                      .required("Required")
                      .matches(/^\d$/, "Must be a digit"),
                    otp3: Yup.string()
                      .required("Required")
                      .matches(/^\d$/, "Must be a digit"),
                    otp4: Yup.string()
                      .required("Required")
                      .matches(/^\d$/, "Must be a digit"),
                    otp5: Yup.string()
                      .required("Required")
                      .matches(/^\d$/, "Must be a digit"),
                    otp6: Yup.string()
                      .required("Required")
                      .matches(/^\d$/, "Must be a digit"),
                  })}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, handleChange }) => (
                    <Form className="mt-3">
                      <Row className="form-group mt-3 justify-content-center">
                        {[...Array(6)].map((_, index) => (
                          <Col key={index} xs={2}>
                            <Field
                              name={`otp${index + 1}`}
                              type="text"
                              maxLength={1}
                              innerRef={(el: HTMLInputElement) =>
                                (inputRefs.current[index] = el)
                              }
                              className={`${styles.textfield} form-control text-center`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                handleChange(e); // Ensure Formik updates its state
                                handleOtpInput(e, index);
                              }}
                              value={values[`otp${index + 1}`]} // Ensure the input value is controlled by Formik
                            />
                            <ErrorMessage
                              name={`otp${index + 1}`}
                              component="div"
                              className="invalid-feedback"
                            />
                          </Col>
                        ))}
                      </Row>
                      <div className={styles.twofactorResendlink}>
                        Didn’t get the code?
                        <a href="#" className="text-blue-500">
                          <u>Resend Code</u>
                        </a>
                      </div>
                      <Row
                        style={{ justifyContent: "center", marginTop: "30px" }}
                      >
                        <Col md={6} className="mt-3">
                          <Button type="reset" disabled={isSubmitting} block className={styles.twofactorCancleBtn}>
                            Cancle
                          </Button>
                        </Col>
                        <Col md={6} className="mt-3">
                          <Button type="submit" disabled={isSubmitting} block className={styles.twofactorVerifyBtn}>
                            Verify
                          </Button>
                        </Col>
                        
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
