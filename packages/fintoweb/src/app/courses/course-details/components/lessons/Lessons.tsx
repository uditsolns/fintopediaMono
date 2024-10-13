"use client";

import React, { useState, useEffect } from "react";
import styles from "./Lessons.module.css";
import { Col, Row } from "reactstrap";

interface AccordionItem {
  title: string;
  content: string;
}

const Lessons: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const items = [
    {
      title: "Foundations of Options Trading",
      content: "Content for section 1",
    },
    {
      title: "Options Trading Terminology and Indicators",
      content: "Content for section 2",
    },
    {
      title: "Mastering Options Trading Strategies",
      content: "Content for section 3",
    },
  ];
  return (
    <div className={styles.lessonsContainer}>
      <Row>
        <Col md={6}>
          <div className={styles.lessonContent}>
            <h2>Lessons</h2>
            <p>7 sections • 24 topics • 4 hrs 38 mins content</p>
          </div>

          <div className={styles.lessonAccordion}>
            <div className={styles.accordion}>
              {items.map((item, index) => (
                <div key={index} className={styles.item}>
                  <button
                    className={styles.header}
                    onClick={() => handleToggle(index)}
                  >
                    <span className={styles.title}>
                      {index + 1}. {item.title}
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
                        d="M7 9L10 12L13 9"
                        stroke="#F4F5F5"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className={styles.content}>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="5"
                          height="7"
                          viewBox="0 0 5 7"
                          fill="none"
                        >
                          <path
                            d="M4.71975 3.75956L0.93401 1.00692C0.913287 0.991879 0.888802 0.982866 0.86327 0.980885C0.837738 0.978903 0.812156 0.98403 0.789359 0.995697C0.766563 1.00736 0.747443 1.02512 0.734118 1.04699C0.720793 1.06886 0.713784 1.09399 0.713868 1.1196V6.62487C0.713909 6.65043 0.720995 6.67548 0.734346 6.69727C0.747698 6.71906 0.766798 6.73675 0.789549 6.7484C0.812299 6.76004 0.83782 6.76519 0.863305 6.76327C0.888791 6.76136 0.913255 6.75245 0.93401 6.73754L4.71975 3.98317C4.73764 3.97052 4.75223 3.95377 4.7623 3.93431C4.77237 3.91486 4.77762 3.89327 4.77762 3.87137C4.77762 3.84946 4.77237 3.82787 4.7623 3.80842C4.75223 3.78897 4.73764 3.77221 4.71975 3.75956Z"
                            fill="#0A0A0B"
                          />
                        </svg>
                      </span>
                      {item.content}
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
            <p>
              Welcome to our comprehensive Stock Market Course, designed to
              empower you with the knowledge and skills needed.
            </p>
            <h4>What You&apos;ll Learn</h4>
            <ul>
              <li>
                <b>Introduction to Stock Markets:</b> Grasp the basic
                terminologies, structure, and functions of the stock market.
              </li>
              <li>
                <b>Financial Instruments:</b> Deep dive into different types of
                financial instruments and their roles in the market.
              </li>
            </ul>
            <a href="#">Show more</a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Lessons;
