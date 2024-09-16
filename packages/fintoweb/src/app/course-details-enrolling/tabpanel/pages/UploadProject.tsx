import React from "react";
import styles from "../EnrollTabs.module.css";
import { Col, Row } from "reactstrap";

const UploadProject = () => {
  return (
    <>
      <div className={styles.uploadProject}>
        <h1 className={styles.heading}>Upload Project</h1>
        <p className={styles.subHeading}>
          Upload your completed project in pdf or docx format. After submitting,
          mentor will give feedback in 2-3 days
        </p>
        <div className={styles.uploadForm}>
          <div className={styles.uploadFormText}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M9.33333 21.3332C6.38781 21.3332 4 18.9454 4 15.9998C4 13.4571 5.77942 11.33 8.16094 10.7958C8.05559 10.3251 8 9.83563 8 9.33317C8 5.65127 10.9848 2.6665 14.6667 2.6665C17.8924 2.6665 20.5831 4.9575 21.2002 8.00114C21.2445 8.00027 21.2889 7.99984 21.3333 7.99984C25.0152 7.99984 28 10.9846 28 14.6665C28 17.8918 25.7097 20.5821 22.6667 21.1998M20 17.3332L16 13.3332M16 13.3332L12 17.3332M16 13.3332L16 29.3332"
                stroke="#545F71"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Drag or drop your files to upload, or <a>Browse</a>
          </div>
          <div className={styles.fileFormat}>Format: Pdf, Docx, Zip file</div>
          <div className={styles.uploadButton}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M4.5 16L4.5 17C4.5 18.6569 5.84315 20 7.5 20L17.5 20C19.1569 20 20.5 18.6569 20.5 17L20.5 16M16.5 8L12.5 4M12.5 4L8.5 8M12.5 4L12.5 16"
                  stroke="#090A0B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Upload a file
            </button>
          </div>
          <div className={styles.fileSizeText}>
            <span>File under 20 MB</span>
          </div>
        </div>
      </div>
      <div className={styles.previousUploadProject}>
        <h1>Previously Uploaded Projects</h1>
        <Row className="mt">
          <Col md={6} className="mt-3">
            <div className={styles.uploadFiles}>
              <div className={styles.uploadCard}>
                <div className={styles.uploadCardLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M12.0013 16H20.0013M12.0013 21.3333H20.0013M22.668 28H9.33464C7.86188 28 6.66797 26.8061 6.66797 25.3333V6.66667C6.66797 5.19391 7.86188 4 9.33464 4H16.7824C17.136 4 17.4751 4.14048 17.7252 4.39052L24.9441 11.6095C25.1942 11.8595 25.3346 12.1987 25.3346 12.5523V25.3333C25.3346 26.8061 24.1407 28 22.668 28Z"
                      stroke="#FCFCFC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <button className={styles.checkoutBtn}>Checkout</button>
                </div>
                <div className={styles.uploadCardRight}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                      stroke="#545F71"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h1 className={styles.uploadFilename}>Money Market.pdf</h1>
              <span className={styles.uploadFiletime}>Sat, Apr 20 . 7.5 MB</span>
            </div>
          </Col>
          <Col md={6} className="mt-3">
            <div className={styles.uploadFiles}>
              <div className={styles.uploadCard}>
                <div className={styles.uploadCardLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M12.0013 16H20.0013M12.0013 21.3333H20.0013M22.668 28H9.33464C7.86188 28 6.66797 26.8061 6.66797 25.3333V6.66667C6.66797 5.19391 7.86188 4 9.33464 4H16.7824C17.136 4 17.4751 4.14048 17.7252 4.39052L24.9441 11.6095C25.1942 11.8595 25.3346 12.1987 25.3346 12.5523V25.3333C25.3346 26.8061 24.1407 28 22.668 28Z"
                      stroke="#FCFCFC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <button className={styles.pendingBtn}>Pending</button>
                </div>
                <div className={styles.uploadCardRight}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                      stroke="#545F71"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h1 className={styles.uploadFilename}>Money Market.pdf</h1>
              <span className={styles.uploadFiletime}>Sat, Apr 20 . 7.5 MB</span>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6} className="mt-3">
            <div className={styles.uploadFiles}>
              <div className={styles.uploadCard}>
                <div className={styles.uploadCardLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M12.0013 16H20.0013M12.0013 21.3333H20.0013M22.668 28H9.33464C7.86188 28 6.66797 26.8061 6.66797 25.3333V6.66667C6.66797 5.19391 7.86188 4 9.33464 4H16.7824C17.136 4 17.4751 4.14048 17.7252 4.39052L24.9441 11.6095C25.1942 11.8595 25.3346 12.1987 25.3346 12.5523V25.3333C25.3346 26.8061 24.1407 28 22.668 28Z"
                      stroke="#FCFCFC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <button className={styles.progressBtn}>In Progress</button>
                </div>
                <div className={styles.uploadCardRight}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                      stroke="#545F71"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h1 className={styles.uploadFilename}>Money Market.pdf</h1>
              <span className={styles.uploadFiletime}>Sat, Apr 20 . 7.5 MB</span>
            </div>
          </Col>
          <Col md={6} className="mt-3">
            <div className={styles.uploadFiles}>
              <div className={styles.uploadCard}>
                <div className={styles.uploadCardLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M12.0013 16H20.0013M12.0013 21.3333H20.0013M22.668 28H9.33464C7.86188 28 6.66797 26.8061 6.66797 25.3333V6.66667C6.66797 5.19391 7.86188 4 9.33464 4H16.7824C17.136 4 17.4751 4.14048 17.7252 4.39052L24.9441 11.6095C25.1942 11.8595 25.3346 12.1987 25.3346 12.5523V25.3333C25.3346 26.8061 24.1407 28 22.668 28Z"
                      stroke="#FCFCFC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <button className={styles.checkoutBtn}>Checkout</button>
                </div>
                <div className={styles.uploadCardRight}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                      stroke="#545F71"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h1 className={styles.uploadFilename}>Money Market.pdf</h1>
              <span className={styles.uploadFiletime}>Sat, Apr 20 . 7.5 MB</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UploadProject;
