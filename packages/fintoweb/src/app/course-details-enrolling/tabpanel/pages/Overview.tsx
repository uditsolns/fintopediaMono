import React from "react";
import styles from "../EnrollTabs.module.css";

const Overview = () => {
  return (
    <>
      <div className={styles.overviewContainer}>
        <h2 className={styles.heading}>About this course</h2>
        <p className={styles.subHeading}>
          The most complete course available on Product Management. 13+ hours of
          videos, activities, interviews, &amp; more
        </p>
        <div className={styles.childHeading}>
          Estimated Completion Time:
          <span className={styles.subHeading}>13 hours</span>
        </div>

        <div className={styles.childHeading}>
          Language:
          <span className={styles.subHeading}>English</span>
        </div>

        <div className={styles.childHeading}>
          On Completion Perks:
          <span className={styles.subHeading}>
            Fintopedia Verified Certificate
          </span>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <hr />
      </div>
      <div className={styles.description}>
        <h2 className={styles.heading}>Description</h2>
        <p className={styles.subHeading}>
          Updated January 2024: Over 4,000 students who have taken this course
          have gotten jobs as Product Managers! Students now work at companies
          like Google, Zynga, Airbnb, Wal-Mart, Dell, Booking. com, Jet. com,
          Vodafone, HomeAway, Boeing, Freelancer. com, Wayfair, & more!
        </p>
        <p className={styles.subHeading}>
          The most updated and complete Product Management course on Udemy!
          You'll learn the skills that make up the entire Product Management job
          and process: from ideation to market research, to UX wireframing to
          prototyping, technology, metrics, and finally to building the product
          with user stories, project management, scoping, and leadership. We
          even have interviews with real life PMs, Q&A sessions with students,
          and a comprehensive guide to preparing and interviewing for a Product
          Management job. read less
        </p>
      </div>
    </>
  );
};

export default Overview;
