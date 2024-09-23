"use client";

import React, { useState } from "react";
import styles from "../Auth.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  Button,
  Col,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import CustomInput from "../../../custom/CustomInput";
import CustomSelect from "../../../custom/CustomSelect";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

interface LoginFormValues {
  email: string;
}
const ForgotPassword: React.FC = () => {
  const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false);
  const [isRevealPwd1, setIsRevealPwd1] = useState<boolean>(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const handleSubmit = (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    const login = {
      email: values.email,
    };

    // dispatch(actions.postRegister(register, () => router.push('/login')));
    setSubmitting(false);
  };

  return (
    <div className={styles.forgotContainer}>
      <div className="container main-login-div">
        <div className="no-gutters justify-content-center row">
          <div className="col-md-6 col-lg-6 login-card">
            <div className={styles.forgotLogo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="76"
                viewBox="0 0 75 76"
                fill="none"
              >
                <g clip-path="url(#clip0_1720_22712)">
                  <path
                    d="M37.4999 6.80664C41.6288 6.80664 45.5887 8.44686 48.5083 11.3665C51.4279 14.2861 53.0681 18.2459 53.0681 22.3748V31.7157C55.5455 31.7157 57.9214 32.6999 59.6731 34.4516C61.4249 36.2034 62.409 38.5793 62.409 41.0566V59.7385C62.409 62.2158 61.4249 64.5917 59.6731 66.3435C57.9214 68.0952 55.5455 69.0794 53.0681 69.0794H21.9317C19.4544 69.0794 17.0785 68.0952 15.3267 66.3435C13.5749 64.5917 12.5908 62.2158 12.5908 59.7385V41.0566C12.5908 38.5793 13.5749 36.2034 15.3267 34.4516C17.0785 32.6999 19.4544 31.7157 21.9317 31.7157V22.3748C21.9317 18.2459 23.5719 14.2861 26.4915 11.3665C29.4111 8.44686 33.371 6.80664 37.4999 6.80664ZM37.4999 44.1703C35.9288 44.1698 34.4156 44.7631 33.2637 45.8314C32.1117 46.8997 31.406 48.3639 31.2882 49.9305L31.2726 50.3976C31.2726 51.6292 31.6379 52.8332 32.3221 53.8572C33.0064 54.8813 33.979 55.6795 35.1168 56.1508C36.2547 56.6221 37.5068 56.7454 38.7148 56.5052C39.9228 56.2649 41.0324 55.6718 41.9033 54.8009C42.7742 53.93 43.3672 52.8204 43.6075 51.6124C43.8478 50.4045 43.7245 49.1524 43.2532 48.0145C42.7818 46.8766 41.9837 45.904 40.9596 45.2198C39.9355 44.5355 38.7315 44.1703 37.4999 44.1703ZM37.4999 13.0339C35.0225 13.0339 32.6467 14.018 30.8949 15.7698C29.1431 17.5216 28.159 19.8975 28.159 22.3748V31.7157H46.8408V22.3748C46.8408 19.8975 45.8567 17.5216 44.1049 15.7698C42.3532 14.018 39.9773 13.0339 37.4999 13.0339Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1720_22712">
                    <rect
                      width="74.7273"
                      height="74.7273"
                      fill="white"
                      transform="translate(0.135742 0.580078)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1>Forgot Password?</h1>
            <h6>
              Enter your email address and we’ll send you the
              <br /> reset password link
            </h6>
            <div className={styles.forgotForm}>
              <div className="p-3">
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .required("Enter Your Email")
                      .email("Invalid Email address"),
                  })}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="mt-3">
                      <Row className="form-group mt-3">
                        <Col md={12}>
                          <Label className="text-white">Enter Your Email</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="email"
                              id="email"
                              placeholder="Enter Your Email"
                              className={`${
                                styles.forgotTextfield
                              } form-control ${
                                errors.email && touched.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <div className="mt-5 mb-3 row">
                        <div className="col-12">
                          <Button
                            type="submit"
                            className={styles.sendLinkButton}
                            size="md"
                            block
                            disabled={isSubmitting}
                          >
                            {/* {isLoading ? <CircularLoading /> : "Register"} */}
                           Send Link
                          </Button>
                        </div>
                        <div className={styles.forgotFooterText}>
                          <h6>Didn’t get email? Kindly check spam box too</h6>
                          <p> Send it again?</p>
                        </div>
                      </div>
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

export default ForgotPassword;
