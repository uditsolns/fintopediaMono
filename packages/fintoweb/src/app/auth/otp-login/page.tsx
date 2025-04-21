"use client";
import React, { useState, useEffect } from "react";
import styles from "../register/Signup.module.css";
import { Button, Col, Row } from "reactstrap";
import { useSendOtpHelper } from "shared/src/components/structures/send-otp-login/send-otp.helper";
import { sendOtpField } from "shared/src/components/structures/send-otp-login/sendOtpModal";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CircularLoading from "@src/components/loader/CircularLoading";

interface LoginProps {}

const page: React.FC<LoginProps> = () => {
  const router = useRouter();
  const { send_otp, loading, err } = useAppSelector((state) => state.auth);

  const { sendOtpFormik, sendOtpInputProps } = useSendOtpHelper();
  const { handleSubmit, isSubmitting } = sendOtpFormik;

  React.useEffect(() => {
    if (send_otp?.code === 200) {
      toast.success(send_otp?.status_message, {
        position: "top-right",
        theme: "light",
      });
      router.push("/auth/verify-otp");
    }

    if (err?.send_otp_err?.status_message) {
      toast.error(err?.send_otp_err?.status_message, {
        position: "top-right",
        theme: "light",
      });
    }
  }, [send_otp, router, err]);

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
                      label={sendOtpField.phone.label}
                      placeholder={sendOtpField.phone.placeHolder}
                      {...sendOtpInputProps(sendOtpField.phone.name)}
                    />
                  </Col>
                </Row>

                <div className="mt-3 mb-3 row">
                  <div className="col-12">
                    <Button
                      type="submit"
                      className={styles.loginButton}
                      size="lg"
                      block
                      disabled={loading?.send_otp}
                      onClick={() => handleSubmit()}
                    >
                      {loading.send_otp ? <CircularLoading /> : "Send OTP"}
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

export default page;
