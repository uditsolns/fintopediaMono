import React from "react";
import Image from "next/image";
import styles from "./Homepage.module.css";
import Back from "../../assets/Fintopedia logo-White.png";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContents}>
        <h2>
          India's top experts
          <br /> courses on Investing
        </h2>
        <p>
          Discover a diverse range of online courses designed to cater to <br />
          learners of all levels, interests,and ambitions.
        </p>
        <button>
          Explore All Courses
          <FaArrowRight />
        </button>
      </div>
      <div className={styles.imageContainer}>
        <Image src={Back} alt="Logo" />
      </div>
    </div>
  );
};

export default Banner;
