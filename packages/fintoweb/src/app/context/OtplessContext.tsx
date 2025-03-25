"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Script from "next/script";

const OtplessContext = createContext(null);

export const OtplessProvider = ({ children }) => {
  let OTPlessSignin = null;
  const [otp, setOtp] = useState(""); // Store OTP

  useEffect(() => {
    const callback = (eventCallback) => {
      const EVENTS_MAP = {
        ONETAP: () => {
          console.log("One Tap Response:", eventCallback.response);
        },
        OTP_AUTO_READ: () => {
          const receivedOtp = eventCallback.response.otp;
          console.log("OTP Auto Read:", receivedOtp);
          setOtp(receivedOtp); // Store OTP in state
        },
        FAILED: () => {
          console.log("Login Failed:", eventCallback.response);
        },
        FALLBACK_TRIGGERED: () => {
          console.log("Fallback Triggered:", eventCallback.response);
        },
      };

      if ("responseType" in eventCallback) {
        EVENTS_MAP[eventCallback.responseType]?.();
      }
    };
    console.log("window", window);
    console.log("window", window.OTPless);

    if (typeof window !== "undefined" && window.OTPless) {
      OTPlessSignin = new window.OTPless(callback);
    }
    // const OTPlessSignin = new OTPless(callback);
  }, []);

  const initiateLogin = (phone, countryCode) => {
    if (OTPlessSignin) {
      OTPlessSignin.initiate({
        channel: "PHONE",
        phone,
        countryCode,
      });
    } else {
      console.error("Otpless SDK not loaded yet.");
    }
  };

  return (
    <OtplessContext.Provider value={{ initiateLogin, otp }}>
      {children}
    </OtplessContext.Provider>
  );
};

export const useOtpless = () => useContext(OtplessContext);
