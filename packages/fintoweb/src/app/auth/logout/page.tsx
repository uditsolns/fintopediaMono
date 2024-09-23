"use client";

import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import styles from "../Auth.module.css"; 

const Logout: React.FC = () => {
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
              Please Wait, Next Round will begin
              <br />
              Shortly or try again later
            </p>
            <Button
              className={styles.logoutModalButton}
              block
            >
              Retry
            </Button>
            <h6>Cancel</h6>
          </div>
        {/* </ModalBody> */}
      </Modal>
    </div>
  );
};

export default Logout;
