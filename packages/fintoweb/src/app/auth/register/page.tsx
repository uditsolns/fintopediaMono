"use client";

import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import {
  Button,
  Col,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { signupField } from "shared/src/components/structures/signup/signupModel";
import { useSignupHelper } from "shared/src/components/structures/signup/signup.helper";
import { SelectAtom } from "@src/components/atoms/select/SelectAtom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import CircularLoading from "@src/components/loader/CircularLoading";
import { getCollege } from "shared/src/provider/store/services/colleges.service";
import GoogleIcon from "../../../assets/google.png";
import Image from "next/image";

const Register: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { auth, loading, signup } = useAppSelector((state) => state.auth);

  const { college } = useAppSelector((state) => state.college);

  const { signupFormik, signupInputProps } = useSignupHelper();
  const { handleSubmit, isSubmitting } = signupFormik;

  const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false);
  const [isRevealPwd1, setIsRevealPwd1] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCollege());
  }, []);

  useEffect(() => {
    if (signup?.token) {
      toast.success("Successfully Register !", {
        position: "top-right",
        theme: "light",
      });
      router.push("/auth/login");
    }
  }, [signup, router]);
  return (
    <div className={styles.signupLoginontainer}>
      <div className="container main-login-div">
        <div className="no-gutters justify-content-center row">
          <div className={`col-md-6 col-lg-6 ${styles.loginCard}`}>
            <h1 className={styles.loginHeading}>Create Account</h1>
            <div className="main-content">
              <div className={styles.loginForm}>
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={signupField.first_name.label}
                      placeholder={signupField.first_name.placeHolder}
                      {...signupInputProps(signupField.first_name.name)}
                    />
                  </Col>
                </Row>
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={signupField.surname_name.label}
                      placeholder={signupField.surname_name.placeHolder}
                      {...signupInputProps(signupField.surname_name.name)}
                    />
                  </Col>
                </Row>
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={signupField.email.label}
                      placeholder={signupField.email.placeHolder}
                      {...signupInputProps(signupField.email.name)}
                    />
                  </Col>
                </Row>
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={signupField.phone.label}
                      placeholder={signupField.phone.placeHolder}
                      {...signupInputProps(signupField.phone.name)}
                    />
                  </Col>
                </Row>
                {/* <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={signupField.designation.label}
                      placeholder={signupField.designation.placeHolder}
                      {...signupInputProps(signupField.designation.name)}
                    />
                  </Col>
                </Row> */}
                {/* <Row className="form-group mt-3">
                  <Col md={12}>
                    <SelectAtom
                      label={signupField.role.label}
                      placeholder={signupField.role.placeHolder}
                      {...signupInputProps(signupField.role.name)}
                      options={[{ value: "User", label: "User" }]}
                    />
                  </Col>
                </Row> */}
                {/* <Row className="form-group mt-3">
                  <Col md={12}>
                    <SelectAtom
                      label={signupField.college.label}
                      placeholder={signupField.college.placeHolder}
                      {...signupInputProps(signupField.college.name)}
                      options={college.map((c) => ({
                        value: c.id,
                        label: c.name,
                      }))}
                    />
                  </Col>
                </Row> */}
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={signupField.password.label}
                      placeholder={signupField.password.placeHolder}
                      {...signupInputProps(signupField.password.name)}
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
                <Row className="form-group mt-3">
                  <Col md={12}>
                    <InputAtom
                      label={signupField.password_confirmation.label}
                      placeholder={
                        signupField.password_confirmation.placeHolder
                      }
                      {...signupInputProps(
                        signupField.password_confirmation.name
                      )}
                      type={isRevealPwd1 ? "text" : "password"}
                      rightIcon={
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
                      }
                    />
                  </Col>
                </Row>
                <div className="mt-3 text-white">
                  Already have an account?{" "}
                  <a href="/auth/login" className="text-blue-500">
                    <u>Login</u>
                  </a>
                </div>
                <Row className="mt-3 mb-3 row">
                  <div className="col-12">
                    <Button
                      type="submit"
                      className={styles.loginButton}
                      size="lg"
                      block
                      // disabled={isSubmitting}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      {loading.signup ? <CircularLoading /> : "Sign up"}
                    </Button>
                  </div>
                </Row>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
