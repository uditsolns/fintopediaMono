import React, { useState } from "react";
import styles from "./Homepage.module.css";
import Image from "next/image";
import BgImage from "../../assets/user.png";
import WorkImage from "../../assets/workImage.png";

const HowitWorks = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  }; 
  return (
    <div className={styles.howitWorks}>
      <div className="row">
        <div className="col-md-6 position-relative">
          <div className={styles.howitWorksImageContent}>
            <Image
              src={BgImage}
              alt="Background Image"
              className={styles.howitWorksImage}
            />
            <Image
              src={WorkImage}
              alt="Work Image"
              className={styles.worksImage} 
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.howitWorksContent}>
            <h3>How it Works?</h3>
            {activeIndex !== 1 && (
              <div
                className={`${styles.howitWorksContentDiv}`}
                onClick={() => toggleAccordion(1)}
              >
                <span>1</span> Take Online Courses
              </div>
            )} 
            {activeIndex === 1 && (
              <div
                className={`${styles.howitWorksContentDivActive}`}
                onClick={() => toggleAccordion(1)}
              >
                <span>1</span>
                <div>
                  <h6>Take Online Courses</h6>
                  <p>Learn at your own pace from various online courses.</p>
                </div>
              </div>
            )}
            {activeIndex !== 2 && (
              <div
                className={`${styles.howitWorksContentDiv}`}
                onClick={() => toggleAccordion(2)}
              >
                <span>2</span> Get a Course Certificate
              </div>
            )}
            {activeIndex === 2 && (
              <div
                className={`${styles.howitWorksContentDivActive}`}
                onClick={() => toggleAccordion(2)}
              >
                <span>2</span>
                <div>
                  <h6>Get a Course Certificate</h6>
                  <p>
                    Watching all course videos or completing all course modules.
                    Passing quizzes, assignments, or exams with a certain score.
                  </p>
                </div>
              </div>
            )}
            {activeIndex !== 3 && (
              <div
                className={`${styles.howitWorksContentDiv}`}
                onClick={() => toggleAccordion(3)}
              >
                <span>3</span> Advance your Career
              </div>
            )}
            {activeIndex === 3 && (
              <div
                className={`${styles.howitWorksContentDivActive}`}
                onClick={() => toggleAccordion(3)}
              >
                <span>3</span>
                <div>
                  <h6>Advance your Career</h6>
                  <p>
                    Take your skills to the next level and achieve career
                    success.
                  </p>
                </div>
              </div>
            )}
            {activeIndex !== 4 && (
              <div
                className={`${styles.howitWorksContentDiv}`}
                onClick={() => toggleAccordion(4)}
              >
                <span>4</span> Land a Job
              </div>
            )}
            {activeIndex === 4 && (
              <div
                className={`${styles.howitWorksContentDivActive}`}
                onClick={() => toggleAccordion(4)}
              >
                <span>4</span>
                <div>
                  <h6>Land a Job</h6>
                  <p>
                    Use the skills learned to land your dream job in your field.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowitWorks;
