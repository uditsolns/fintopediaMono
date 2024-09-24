"use client";
import React, { useState } from "react";
import styles from "../sign-up/Signup.module.css";
import { Button, Col, InputGroupText, Row } from "reactstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useAuthHelper } from "shared/src/components/structures/login/login.helper";
import { authField } from "shared/src/components/structures/login/loginModel";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";

const Login: React.FC = () => {
  
  const { authFormik, authInputProps } = useAuthHelper();
  const { handleSubmit, isSubmitting } = authFormik;

  const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className="container main-login-div">
        <div className="no-gutters justify-content-center row">
          <div className="col-md-6 col-lg-6 login-card">
            <h1 className="font-bold text-white">Welcome Back</h1>
            <div className="main-content">
              <div className="p-3">
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={authField.phone.name}
                      placeholder={authField.phone.placeHolder}
                      {...authInputProps(authField.phone.name)}
                    />
                  </Col>
                </Row>
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={authField.password.name}
                      placeholder={authField.password.placeHolder}
                      {...authInputProps(authField.password.name)}
                      type={isRevealPwd ? "text" : "password"}
                      rightIcon={
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
                      }
                    />
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
                      onClick={() => handleSubmit()}
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
