import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./CountCardMolecule.module.css";
import Subscriber from "../../../assets/subscribers.png";
import Image from "next/image";

interface CountCardMoleculeProps {
  rating: string;
  review: string;
}
const CountCardMolecule: React.FC<CountCardMoleculeProps> = ({
  rating,
  review,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.rating}>
          <FaStar className="w-7 h-7 text-[#ff9b26]" />

          <span className={styles.ratingValue}>{rating}/5</span>
        </div>
        <div className={styles.reviews}>({review} reviews)</div>
      </div>
      <div className={`${styles.section} ${styles.studentSection}`}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <Image
              src={Subscriber}
              className={styles.avatarImage}
              alt="Subscribe"
            />
          </div>
        </div>
        <div className={styles.studentCount}>3,293 students</div>
      </div>
    </div>
  );
};
export default CountCardMolecule;
