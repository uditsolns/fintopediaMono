"use client";

import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styles from "./Refer.module.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";

const page = () => {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;

  React.useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);
  const [copied, setCopied] = useState(false);
  const referralUrl = "https://www.fintopedia.com/u/vashstefan10";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Invite Friends, Get 500 credits of Fintopedia
      </h1>
      <p className={styles.description}>
        Share 500 credits of Skillshare with your friends, and earn a free month
        for each friend once they complete their first full payment.
      </p>

      <div className="space-y-4">
        <div className={styles.inputContainer}>
          <Input value={referralUrl} readOnly className={styles.input} />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className={styles.copyButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clip-path="url(#clip0_1756_36110)">
                <path
                  d="M7.11719 9.667C7.11719 8.95967 7.39817 8.28131 7.89833 7.78115C8.39849 7.28099 9.07685 7 9.78419 7H18.4502C18.8004 7 19.1472 7.06898 19.4708 7.20301C19.7944 7.33704 20.0884 7.53349 20.336 7.78115C20.5837 8.0288 20.7801 8.32281 20.9142 8.64638C21.0482 8.96996 21.1172 9.31676 21.1172 9.667V18.333C21.1172 18.6832 21.0482 19.03 20.9142 19.3536C20.7801 19.6772 20.5837 19.9712 20.336 20.2189C20.0884 20.4665 19.7944 20.663 19.4708 20.797C19.1472 20.931 18.8004 21 18.4502 21H9.78419C9.43395 21 9.08715 20.931 8.76357 20.797C8.44 20.663 8.14599 20.4665 7.89833 20.2189C7.65068 19.9712 7.45423 19.6772 7.3202 19.3536C7.18617 19.03 7.11719 18.6832 7.11719 18.333V9.667Z"
                  stroke="#0C0C0C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.12919 16.737C3.82253 16.5622 3.56746 16.3095 3.38976 16.0045C3.21207 15.6995 3.11804 15.353 3.11719 15V5C3.11719 3.9 4.01719 3 5.11719 3H15.1172C15.8672 3 16.2752 3.385 16.6172 4"
                  stroke="#0C0C0C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1756_36110">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.117188)"
                  />
                </clipPath>
              </defs>
            </svg>
            {copied ? "Copied!" : "Copy URL"}
          </Button>
          <Button variant="outline" size="icon" className={styles.button}>
            {/* <FaFacebookF className="h-5 w-5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17 3.4981C17 3.36549 16.9473 3.23832 16.8536 3.14455C16.7598 3.05078 16.6326 2.9981 16.5 2.9981H14C12.7411 2.93539 11.5086 3.37349 10.5717 4.21668C9.63485 5.05987 9.06978 6.2396 9 7.4981V10.1981H6.5C6.36739 10.1981 6.24021 10.2508 6.14645 10.3445C6.05268 10.4383 6 10.5655 6 10.6981V13.2981C6 13.4307 6.05268 13.5579 6.14645 13.6517C6.24021 13.7454 6.36739 13.7981 6.5 13.7981H9V20.4981C9 20.6307 9.05268 20.7579 9.14645 20.8517C9.24021 20.9454 9.36739 20.9981 9.5 20.9981H12.5C12.6326 20.9981 12.7598 20.9454 12.8536 20.8517C12.9473 20.7579 13 20.6307 13 20.4981V13.7981H15.62C15.7312 13.7997 15.8397 13.7642 15.9285 13.6972C16.0172 13.6302 16.0811 13.5355 16.11 13.4281L16.83 10.8281C16.8499 10.7542 16.8526 10.6768 16.8378 10.6017C16.8231 10.5266 16.7913 10.4559 16.7449 10.3951C16.6985 10.3342 16.6388 10.2848 16.5704 10.2507C16.5019 10.2165 16.4265 10.1985 16.35 10.1981H13V7.4981C13.0249 7.25058 13.1411 7.02121 13.326 6.85479C13.5109 6.68838 13.7512 6.59685 14 6.5981H16.5C16.6326 6.5981 16.7598 6.54542 16.8536 6.45165C16.9473 6.35789 17 6.23071 17 6.0981V3.4981Z"
                fill="white"
              />
            </svg>
          </Button>
          <Button variant="outline" size="icon" className={styles.button}>
            <FaLinkedinIn className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className={styles.button}>
            <FaInstagram className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default page;
