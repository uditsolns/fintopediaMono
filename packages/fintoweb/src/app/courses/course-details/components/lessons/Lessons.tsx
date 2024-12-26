"use client";

import React, { useState } from "react";
import styles from "./Lessons.module.css";
import { Col, Row } from "reactstrap";
import { CourseSections } from "shared/src/utils/types/courses";

interface LessonsProps {
  about_me: string;
  sections: CourseSections[];
}

const Lessons: React.FC<LessonsProps> = ({ sections, about_me }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className={styles.lessonsContainer}>
      <Row>
        <Col md={6}>
          <div className={styles.lessonContent}>
            <h2>Lessons</h2>
            <p>
              {sections?.length} sections •{" "}
              {sections?.reduce(
                (acc, section) => acc + section.subsections.length,
                0
              )}{" "}
              topics •{" "}
              {sections?.reduce(
                (acc, section) => acc + parseFloat(section.section_time),
                0
              )}{" "}
              content
            </p>
          </div>

          <div className={styles.lessonAccordion}>
            <div className={styles.accordion}>
              {sections?.map((section, index) => (
                <div key={section.id} className={styles.item}>
                  <button
                    className={`${styles.header} ${
                      openIndex === index ? styles.open : ""
                    }`}
                    onClick={() => handleToggle(index)}
                  >
                    {section.section_number}. {section.section_heading} •
                    <span style={{ color: "#1D90F5" }}>
                      {section.subsections?.length} topics •{" "}
                      {section.section_time} 
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={styles.icon}
                    >
                      <path
                        d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
                        stroke="#F4F5F5"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={
                          openIndex === index
                            ? "M13 11L10 8L7 11"
                            : "M7 9L10 12L13 9"
                        }
                        stroke="#F4F5F5"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className={styles.content}>
                      <ul>
                        {section?.subsections?.map((sub, subIndex) => (
                          <li key={sub.id}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M6.875 0.425781C3.3146 0.425781 0.426758 3.31362 0.426758 6.87402C0.426758 10.4344 3.3146 13.3223 6.875 13.3223C10.4354 13.3223 13.3232 10.4344 13.3232 6.87402C13.3232 3.31362 10.4354 0.425781 6.875 0.425781ZM9.71951 6.98149L5.93376 9.73586C5.91301 9.75078 5.88855 9.75968 5.86306 9.7616C5.83757 9.76351 5.81205 9.75837 5.7893 9.74672C5.76655 9.73508 5.74745 9.71739 5.7341 9.69559C5.72075 9.6738 5.71366 9.64875 5.71362 9.62319V4.11792C5.71354 4.09231 5.72055 4.06718 5.73387 4.04531C5.7472 4.02344 5.76632 4.00569 5.78911 3.99402C5.81191 3.98235 5.83749 3.97723 5.86303 3.97921C5.88856 3.98119 5.91304 3.9902 5.93376 4.00525L9.71951 6.75789C9.73739 6.77053 9.75198 6.78729 9.76205 6.80674C9.77212 6.8262 9.77738 6.84778 9.77738 6.86969C9.77738 6.8916 9.77212 6.91318 9.76205 6.93264C9.75198 6.95209 9.73739 6.96885 9.71951 6.98149Z"
                                fill="#D9EDFD"
                              />
                            </svg>
                            {sub.subsection_heading} - {sub.subsection_time}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.aboutCourse}>
            <h3>About The Course</h3>
            {about_me && about_me.trim() ? (
              <>
                <p>
                  {showMore || about_me.split(" ").length <= 300
                    ? about_me
                    : `${about_me.split(" ").slice(0, 300).join(" ")}...`}
                </p>
                {about_me.split(" ").length > 300 && (
                  <span
                    onClick={handleShowMore}
                    className={styles.showMoreLink}
                  >
                    {showMore ? "Show less" : "Show more"}
                  </span>
                )}
              </>
            ) : (
              <p>No Description</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Lessons;
