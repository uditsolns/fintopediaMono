import React from "react";
import Image from "next/image";
import styles from "./Homepage.module.css";
import Back from "../../assets/bannerBg.png";
import { FaArrowRight } from "react-icons/fa";
import ButtonWithIcons from "../../components/button/ButtonWithIcons";

const Banner = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContents}>
        <div className={styles.headerCount}>
          <h4 className={styles.count}>10,000+ </h4>
          <span>Learners Enrolled</span>
        </div>
        <h2>
          Finest Financial Courses <br />
          Designed by Certified Experts
        </h2>
        <p>
          Discover a range of online courses on investing, the stock market, and
          other trending topics. We cater to learners of all levels, interests,
          and ambitions.
        </p>
        <ButtonWithIcons
          label="Explore All Courses"
          path="/courses"
          rightIcon={<FaArrowRight />}
        />

        {/* <button>
          Explore All Courses
          <FaArrowRight />
        </button> */}
      </div>
      <div className={styles.imageContainer}>
        <Image src={Back} alt="Logo" />
      </div>
    </div>
  );
};

export default Banner;
