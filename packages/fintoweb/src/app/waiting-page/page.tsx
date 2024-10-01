"use client";
import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import Image from "next/image";
import sponser from "../../assets/Fintopedia logo-White.png";

interface WaitingPageProps {
  id?: string;
}

const WaitingPage: React.FC<WaitingPageProps> = ({ id }) => {
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
        className="modal-dialog-centered"
      >
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center">
            <Image src={sponser} alt="Sponsor" />
          </div>
          <h3
            className="font-bold text-center mt-5"
            style={{ fontSize: "30px" }}
          >
            Hey! You're in waiting..
          </h3>
          <p className="mt-3 text-center text-gray-300">
            Please Wait, Next Round will begin
            <br />
            Shortly or try again later
          </p>
          <Button
            className="btn btn-info btn-sm btn-light font-bold text-black mt-3"
            block
          >
            Retry
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default WaitingPage;
