import React from "react";
import styles from "../EnrollTabs.module.css";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";

const Overview: React.FC = () => {
  const { singleCourse } = useAppSelector((state) => state.courses);
  return (
    <>
      <div className={styles.overviewContainer}>
        <h2 className={styles.heading}>About this course</h2>
        <p className={styles.subHeading}>{singleCourse?.about_me}</p>
        <div className={styles.childHeading}>
          Estimated Completion Time:
          <span className={styles.subHeading}>
            {singleCourse?.duration_time}
          </span>
        </div>

        <div className={styles.childHeading}>
          Language:
          <span className={styles.subHeading}>
            {singleCourse?.course_language}
          </span>
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
        <p className={styles.subHeading}>{singleCourse?.description}</p>
      </div>
    </>
  );
};

export default Overview;
