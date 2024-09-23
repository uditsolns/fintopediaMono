"use client";

import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import styles from "../Auth.module.css"; 

const PasswordChanged: React.FC = () => {
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
          <div className={styles.passwordChangeContent}>
            <h3>Password changed<br/> successfully</h3>
            <p className="mt-3 text-center text-gray-300">
            Your password has been changed<br/> successfully.
            </p>
            <Button
              className={styles.okeyModalButton}
              block
            >
              Okay!
            </Button>
            <h6>Cancel</h6>
          </div>
        {/* </ModalBody> */}
      </Modal>
    </div>
  );
};

export default PasswordChanged;
