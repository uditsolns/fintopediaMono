import React from "react";
import styles from "../EnrollTabs.module.css";
import { Col, Row } from "reactstrap";

const Resources = () => {
  return (
    <div className={styles.resources}>
      <h1 className={styles.heading}>Resources</h1>
      <p className={styles.subHeading}>
        Upload your completed project in pdf or docx format. After submitting,
        mentor will give feedback in 2-3 days
      </p>
      <Row>
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
                <button className={styles.resourseBtn}>PDF</button>
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
                <button className={styles.resourseBtn}>DOC</button>
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
  );
};

export default Resources;
