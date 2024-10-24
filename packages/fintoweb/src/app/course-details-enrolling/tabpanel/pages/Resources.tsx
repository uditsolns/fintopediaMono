import React, { useState } from "react";
import styles from "../EnrollTabs.module.css";
import { Col, Row } from "reactstrap";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { imageUrl } from "shared/src/config/imageUrl";
import { FaEye } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getFileSize = (fileName) => {
  return "7.5 MB";
};

const Resources = () => {
  const { singleCourse } = useAppSelector((state) => state.courses);
  const [showButtons, setShowButtons] = useState({});

  const handleViewPdf = (fileName) => {
    const fileUrl = `${imageUrl}/uploads/resource_file_upload/${fileName}`;
    window.open(fileUrl, "_blank");
  };

  const handleDownloadPdf = (fileName) => {
    const fileUrl = `${imageUrl}/uploads/resource_file_upload/${fileName}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  const toggleButtons = (resourceId) => {
    setShowButtons((prevState) => ({
      ...prevState,
      [resourceId]: !prevState[resourceId],
    }));
  };

  return (
    <div className={styles.resources}>
      <h1 className={styles.heading}>Resources</h1>
      <p className={styles.subHeading}>
        Upload your completed project in pdf or docx format. After submitting,
        mentor will give feedback in 2-3 days
      </p>
      <Row>
        {singleCourse?.resources &&
          singleCourse?.resources.map((resource) => (
            <Col key={resource.id} md={6} className="mt-3">
              <div className={styles.uploadFiles}>
                <div className={styles.uploadCard}>
                  <div className={styles.uploadCardLeft}>
                    <button className={styles.resourseBtn}>
                      {resource.resource_file.split(".").pop().toUpperCase()}
                    </button>
                    
                  </div>
                  {showButtons[resource.id] && (
                      <div className={styles.resourseActions}>
                        <button
                          className={styles.resourceActionsBtn}
                          onClick={() => handleViewPdf(resource.resource_file)}
                          style={{ cursor: "pointer",marginLeft: "10px" }}
                        >
                          <FaEye style={{ margin: "0 auto" }}/>
                        </button>
                        <button
                          className={styles.resourceActionsBtn}
                          onClick={() =>
                            handleDownloadPdf(resource.resource_file)
                          }
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                        >
                          <MdSaveAlt style={{ margin: "0 auto" }}/>
                        </button>
                      </div>
                    )}
                  <div className={styles.uploadCardRight}>
                    <svg
                      onClick={() => toggleButtons(resource.id)}
                      style={{ cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.5523 11 12 11C12.5523 11 13 12.5523 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18 12 19 11C19.5523 11 20 12.4477 20 12Z"
                        stroke="#545F71"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    
                  </div>
                </div>
                <h1 className={styles.uploadFilename}>
                  {resource.resource_file}
                </h1>
                <span className={styles.uploadFiletime}>
                  {formatDate(resource.created_at)} .{" "}
                  {getFileSize(resource.resource_file)}
                </span>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Resources;
