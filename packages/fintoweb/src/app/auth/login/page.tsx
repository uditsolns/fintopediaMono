"use client";
import React, { useState, useEffect } from "react";
import styles from "../register/Signup.module.css";
import { Button, Col, InputGroupText, Row } from "reactstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useAuthHelper } from "shared/src/components/structures/login/login.helper";
import { authField } from "shared/src/components/structures/login/loginModel";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CircularLoading from "@src/components/loader/CircularLoading";
import GoogleIcon from "../../../assets/google.png";
import Image from "next/image";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();

  const { auth, loading, err } = useAppSelector((state) => state.auth);
  const { authFormik, authInputProps } = useAuthHelper();
  const { handleSubmit, isSubmitting } = authFormik;
  const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false);

  console.log("err?.loginErr", err?.loginErr);
  React.useEffect(() => {
    if (auth) {
      if (auth?.token) {
        toast.success("Login successful!", {
          position: "top-right",
          theme: "light",
        });
        router.push("/");
      }
      if (err?.loginErr?.message) {
        toast.error(err?.loginErr?.message, {
          position: "top-right",
          theme: "light",
        });
      }
    }
  }, [auth, router]);

  return (
    <div className={styles.signupLoginontainer}>
      <div className="container main-login-div">
        <div className="no-gutters justify-content-center row">
          <div className={`col-md-6 col-lg-6 ${styles.loginCard}`}>
            <h1 className={styles.loginHeading}>Welcome back!</h1>
            <div className="main-content">
              <div className={styles.loginForm}>
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={authField.phone.label}
                      placeholder={authField.phone.placeHolder}
                      {...authInputProps(authField.phone.name)}
                    />
                  </Col>
                </Row>
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={authField.password.label}
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
                <div className={styles.forgotLink}>
                  <a href="/auth/forgot-password">
                    <u>Forgot Password ?</u>
                  </a>
                </div>
                <div className="mt-3 mb-3 row">
                  <div className="col-12">
                    <Button
                      type="submit"
                      className={styles.loginButton}
                      size="lg"
                      block
                      disabled={loading?.login}
                      onClick={() => handleSubmit()}
                    >
                      {loading.login ? <CircularLoading /> : "Login"}
                    </Button>
                  </div>
                </div>
                <div className="mt-3 mb-3 row">
                  <div className="col-12">
                    <Button
                      type="submit"
                      className={styles.loginotpButton}
                      size="lg"
                      block
                      onClick={() => handleSubmit()}
                    >
                      Login with OTP
                    </Button>
                  </div>
                </div>
                <div className="text-center p-1">or</div>
                <div className="mt-3 mb-3 row">
                  <div className="col-12">
                    <Button
                      type="submit"
                      className={`${styles.googleLoginButton} d-flex justify-content-center align-items-center`} // Added flex and centering classes
                      size="lg"
                      block
                      onClick={() => handleSubmit()}
                    >
                      <Image src={GoogleIcon} alt="Google" className="mr-1" />
                      Login with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-3 mb-5 row">
                  <div className="col-12">
                    <Button
                      type="submit"
                      className={`${styles.guestButton} d-flex justify-content-center align-items-center`} // Added flex and centering classes
                      size="lg"
                      block
                      onClick={() => handleSubmit()}
                    >
                      Continue as guest
                    </Button>
                  </div>
                </div>
                {/* <div className="mt-3 text-white text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/auth/register" className="text-blue-500">
                    <u>Register Now</u>
                  </a>
                </div> */}
              </div>
              {/* <div className="mt-1 mb-3 p-3">
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

                  <a
                    // href="https://www.instagram.com/fintopedia_official/"
                    className="p-2"
                  >
                    <FaLinkedin color="#0077B5" size="30px" />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
