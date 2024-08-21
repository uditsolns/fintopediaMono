"use client";

import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  Button,
  Col,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { useRouter } from "next/router";
import CustomInput from "../../custom/CustomInput";
import CustomSelect from "../../custom/CustomSelect";
import * as Yup from "yup";
import { GoMail } from "react-icons/go";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/Fintopedia logo-White.png";
// import * as actions from "../../store/creators";
// import CircularLoading from '../loader/CircularLoading';
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/store";

interface RegisterFormValues {
  first_name: string;
  surname_name: string;
  email: string;
  phone: string;
  college_id: string;
  role: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false);
  const [isRevealPwd1, setIsRevealPwd1] = useState<boolean>(false);

  // const { isLoading } = useSelector((state: RootState) => state.auth.register);
  // const { colleges } = useSelector((state: RootState) => state.colleges);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // useEffect(() => {
  //   // dispatch(actions.collegesGetData());
  // }, [dispatch]);

  const handleSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    const register = {
      first_name: values.first_name,
      surname_name: values.surname_name,
      email: values.email,
      phone: values.phone,
      college_id: values.college_id,
      role: values.role,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    // dispatch(actions.postRegister(register, () => router.push('/login')));
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className="container main-login-div">
        <div className="no-gutters justify-content-center row">
          <div className="col-md-6 col-lg-6 login-card">
            <div className="main-content">
              <div className="p-3">
                <Formik
                  initialValues={{
                    first_name: "",
                    surname_name: "",
                    email: "",
                    phone: "",
                    college_id: "",
                    role: "user",
                    password: "",
                    password_confirmation: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .required("Enter Your Email")
                      .email("Invalid Email address"),
                    first_name: Yup.string()
                      .required("This field is required")
                      .max(10, "Too Long"),
                    surname_name: Yup.string().required(
                      "This field is required"
                    ),
                    phone: Yup.string()
                      .required("Required")
                      .matches(phoneRegExp, "Phone number is not valid")
                      .min(10, "Too Short")
                      .max(10, "Too Long"),
                    // password: Yup.string().required("This field is required"),
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
                          <Label className="text-white">Name</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="first_name"
                              id="first_name"
                              maxLength={10}
                              placeholder="Your full Name"
                              className={`${styles.textfield} form-control ${
                                errors.first_name && touched.first_name
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="first_name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

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
                          <Label className="text-white">Phone number</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type="text"
                              name="phone"
                              id="phone"
                              placeholder="Your phone number"
                              className={`${styles.textfield} form-control ${
                                errors.phone && touched.phone
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="form-group mt-3">
                        <Col md={12}>
                          <Label className="text-white">
                            College/University
                          </Label>
                          <InputGroup>
                            <Field
                              component={CustomSelect}
                              name="college_id"
                              id="college_id"
                              className={`${styles.textfield} form-control ${
                                errors.college_id && touched.college_id
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <option>Select your College</option>
                              {/* {colleges.map((itm) => (
                                <option value={itm.id} key={itm.id}>
                                  {itm.name}
                                </option>
                              ))} */}
                            </Field>
                            <ErrorMessage
                              name="college_id"
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
                      <Row className="form-group mt-3">
                        <Col md={12}>
                          <Label className="text-white">Confirm password</Label>
                          <InputGroup>
                            <Field
                              component={CustomInput}
                              type={isRevealPwd1 ? "text" : "password"}
                              name="password_confirmation"
                              id="password_confirmation"
                              placeholder="Confirm Password"
                              className={`${styles.textfield} form-control ${
                                errors.password_confirmation &&
                                touched.password_confirmation
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="password_confirmation"
                              component="div"
                              className="invalid-feedback"
                            />
                            <InputGroupText
                              onClick={() =>
                                setIsRevealPwd1((prevState) => !prevState)
                              }
                              style={{ cursor: "pointer" }}
                              className={styles.textfield}
                            >
                              {isRevealPwd1 ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </InputGroupText>
                          </InputGroup>
                        </Col>
                      </Row>

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
                            Register
                          </Button>
                        </div>
                        <div className="mt-3 text-white">
                          Already have an account?{" "}
                          <a href="/login" className="text-blue-500">
                            <u>Login</u>
                          </a>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="mt-1 mb-3 p-3">
                <h3 className="text-center font-bold text-white mb-3">Follow us on:</h3>
                <div className="d-flex justify-content-center align-items-center">
                  <a href="https://www.facebook.com/people/Fintopedia/61551172396495/" className="p-2">
                    <FaFacebookF color="#1877F2" size="30px" />
                  </a>
                  <a href="https://www.instagram.com/fintopedia_official/" className="p-2">
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

export default SignUp;
