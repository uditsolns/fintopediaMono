import React from "react";
import styles from "./Homepage.module.css";
import Image from "next/image";
import BgImage from "../../assets/user.png";
import WorkImage from "../../assets/workImage.png";

const HowitWorks = () => {
  return (
    <div className={styles.howitWorks}>
      <div className="row">
        <div className="col-md-6 position-relative">
          <Image src={BgImage} alt="Background Image" className={styles.howitWorksImage} />
          <Image src={WorkImage} alt="Work Image" className={styles.worksImage} />
        </div>
        <div className="col-md-6">
          <div className={styles.howitWorksContent}>
            <h3>How it Works?</h3>
            <div className={styles.howitWorksContentDiv}>
              <span>1</span> Take Online Courses
            </div>
            <div className={styles.howitWorksContentDivActive}>
              <span>2</span>
              <div>
                <h6>Get a Course Certificate</h6>
                <p>
                  Watching all course videos or completing all course modules.
                  Passing quizzes, assignments, or exams with a certain score.
                </p>
              </div>
            </div>
            <div className={styles.howitWorksContentDiv}>
              <span>3</span> Advance your Career
            </div>
            <div className={styles.howitWorksContentDiv}>
              <span>4</span> Land a Job
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowitWorks;
