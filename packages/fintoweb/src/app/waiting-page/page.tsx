"use client";
import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

import Image from "next/image";
// import Waiting from "../../assets/waiting.jpg";
import sponser from "../../assets/Fintopedia logo-White.png";

const WaitingPage: React.FC = () => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <React.Fragment>
      {/* <div>
      <Image src={Waiting} alt="Waiting" style={{ width: "100%", height: "100%" }} />
    </div> */}
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
        modalClassName="black-background"
      >
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center">
            <Image src={sponser} alt="Sponsor" />
          </div>
          <h3 className="font-bold text-center mt-5" style={{"fontSize":"30px"}}>Hey! You're in waiting..</h3>
          <p className="mt-3 text-center text-gray-300">
            Please Wait, Next Round will begin<br/> Shortly or try again later
          </p>
          <Button
            //   onClick={() => getAllRoundLevelGamesData()}
            className="btn btn-info btn-sm btn-light font-bold text-black mt-3"
            block
          >
            {/* {loading ? <CircularLoading /> : "Retry"} */}
            Retry
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default WaitingPage;
