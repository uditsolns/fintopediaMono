import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const ViewCertiicate = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <React.Fragment>
      <div>
        <Button
          className="bg-gradient-yellow p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-eye" aria-hidden="true"></i>
        </Button>
      </div>
      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Vendor Logo
        </ModalHeader>
        <ModalBody className="">
          <div className="text-center">
            {/* <img src={`${imageUrl}logos/${props.data.logo}`} /> */}
            <img
              src={
                "https://nivada.in/hiring-management-backend/public/api/v1/downloadcertificate_view/20250416_153025_certificate.jpg"
              }
            />
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ViewCertiicate;
