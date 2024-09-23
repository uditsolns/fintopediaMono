"use client";
import React, { useState } from "react";
import styles from "../sign-up/Signup.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  Button,
  Col,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import CustomInput from "../../custom/CustomInput";
import CustomSelect from "../../custom/CustomSelect";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

interface LoginFormValues {
  email: string;
  password: string;
}
const Login: React.FC = () => {
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
      password: values.password,
    };

    // dispatch(actions.postRegister(register, () => router.push('/login')));
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className="container main-login-div">
        <div className="no-gutters justify-content-center row">
          <div className="col-md-6 col-lg-6 login-card">
            <h1 className="font-bold text-white">Welcome Back</h1>
            <div className="main-content">
              <div className="p-3">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .required("Enter Your Email")
                      .email("Invalid Email address"),
                    password: Yup.string().required("This field is required"),
                    // password_confirmation: Yup.string().when("password", {
                    //   is: (val: string) => val && val.length > 0,
                    //   then: Yup.string().oneOf(
                    //     [Yup.ref("password")],
                    //     "Both password need to be the same"
                    //   ),
                    // }),
                  })}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="mt-3">
                      <Row className="form-group mt-3">
                        <Col md={12}>
                          <Label className="text-white">Email</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="email"
                              id="email"
                              placeholder="Your email address"
                              className={`${styles.textfield} form-control ${
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
                      <Row className="form-group mt-3">
                        <Col md={12}>
                          <Label className="text-white">Password</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type={isRevealPwd ? "text" : "password"}
                              name="password"
                              id="password"
                              placeholder="Password"
                              className={`${styles.textfield} form-control ${
                                errors.password && touched.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                            <InputGroupText
                              onClick={() =>
                                setIsRevealPwd((prevState) => !prevState)
                              }
                              style={{ cursor: "pointer" }}
                              className={styles.textfield}
                            >
                              {isRevealPwd ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </InputGroupText>
                          </InputGroup>
                        </Col>
                      </Row>
                      <div className="mt-3 text-white">
                        <a href="/sign-up">
                          <u>Forgot Password?</u>
                        </a>
                      </div>
                      <div className="mt-3 mb-3 row">
                        <div className="col-12">
                          <Button
                            type="submit"
                            className="btn btn-light font-bold text-black"
                            size="md"
                            block
                            disabled={isSubmitting}
                          >
                            {/* {isLoading ? <CircularLoading /> : "Register"} */}
                            Login
                          </Button>
                        </div>
                        <div className="mt-3 text-white text-center">
                          Dont't have an account?{" "}
                          <a href="/sign-up" className="text-blue-500">
                            <u>Register Now</u>
                          </a>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="mt-1 mb-3 p-3">
                <h3 className="text-center font-bold text-white mb-3">
                  Follow us on:
                </h3>
                <div className="d-flex justify-content-center align-items-center">
                  <a
                    href="https://www.facebook.com/people/Fintopedia/61551172396495/"
                    className="p-2"
                  >
                    <FaFacebookF color="#1877F2" size="30px" />
                  </a>
                  <a
                    href="https://www.instagram.com/fintopedia_official/"
                    className="p-2"
                  >
                    <FaInstagram color="#E4405F" size="30px" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
