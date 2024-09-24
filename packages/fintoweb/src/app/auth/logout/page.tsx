"use client";

import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import styles from "../Auth.module.css";
import { useAppDispatch } from "shared/src/provider/store/types/storeTypes";
import { logout } from "shared/src/provider/store/reducers/auth.reducer";
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${
        modal ? "modal-open" : ""
      }`}
    >
      <div className="blur-background"></div>

      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
        modalClassName="black-background"
        className={`${styles.customModal} modal-dialog-centered`}
      >
        {/* <ModalBody> */}
        <div className={styles.logoutModalContent}>
          <h3>Logout Confirmation</h3>
          <p className="mt-3 text-center text-gray-300">
            Are you sure you want to log out? Any
            <br /> unsaved changes will be lost.
          </p>
          <Button
            className={styles.logoutModalButton}
            block
            onClick={() => {
              dispatch(logout());
              router.push("/auth/login");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <g clip-path="url(#clip0_1756_37628)">
                <path
                  d="M13.3333 7.33268V5.49935C13.3333 5.01312 13.1402 4.5468 12.7964 4.20299C12.4525 3.85917 11.9862 3.66602 11.5 3.66602H5.08333C4.5971 3.66602 4.13079 3.85917 3.78697 4.20299C3.44315 4.5468 3.25 5.01312 3.25 5.49935V16.4993C3.25 16.9856 3.44315 17.4519 3.78697 17.7957C4.13079 18.1395 4.5971 18.3327 5.08333 18.3327H11.5C11.9862 18.3327 12.4525 18.1395 12.7964 17.7957C13.1402 17.4519 13.3333 16.9856 13.3333 16.4993V14.666"
                  stroke="white"
                  stroke-width="1.22222"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75 11H19.75L17 8.25"
                  stroke="white"
                  stroke-width="1.22222"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 13.75L19.75 11"
                  stroke="white"
                  stroke-width="1.22222"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1756_37628">
                  <rect
                    width="22"
                    height="22"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>{" "}
            <span> Logout</span>
          </Button>
          <h6>Cancel</h6>
        </div>
        {/* </ModalBody> */}
      </Modal>
    </div>
  );
};

export default Logout;
