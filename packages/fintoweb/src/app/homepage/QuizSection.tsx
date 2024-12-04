import React from "react";
import Image from "next/image";
import styles from "./Homepage.module.css";
import QuizBanner from "../../assets/3d-cash-money 1.png";
import Subscribers from "../../assets/subscribers.png";

const QuizSection = () => {
  return (
    <div className={styles.quizHeader}>
      <div className={styles.quizContents}>
        <h2>
          Navigate your financial journey,
          <br /> take the finance quiz
        </h2>
        <p className="text-gray">
          Join <span className="text-light">now</span> in discovering your
          financial strengths through our interactive quiz
        </p>
        <button>Attempt Quiz, It will only take 2 mins</button>
        <div className={styles.quizCount}>
          <div>
            <h2>10,000+</h2>
            <h6>Students taken quiz</h6>
          </div>
          <div>
            <Image src={Subscribers} alt="Subscribers" />
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src={QuizBanner} alt="Logo" />
      </div>
    </div>
  );
};

export default QuizSection;
