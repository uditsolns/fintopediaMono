"use client";
import React, { useState, useEffect } from "react";
import styles from "../register/Signup.module.css";
import { Button, Col, InputGroupText, Row } from "reactstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useAuthHelper } from "shared/src/components/structures/login/login.helper";
import { authField } from "shared/src/components/structures/login/loginModel";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { auth, loading } = useAppSelector((state) => state.auth);
  const { authFormik, authInputProps } = useAuthHelper();
  const { handleSubmit, isSubmitting } = authFormik;
  const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      toast.success("Login successful!", {
        position: "top-center",
      });
      router.push("/");
    }
  }, [auth, router]);

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
                <div className="mt-3 text-white">
                  <a href="/auth/forgot-password">
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
                      Login
                    </Button>
                  </div>
                  <div className="mt-3 text-white text-center">
                    Don't have an account?{" "}
                    <a href="/auth/register" className="text-blue-500">
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
