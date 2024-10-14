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
        <h2>
          India&apos;s top experts
          <br /> courses on Investing
        </h2>
        <p>
          Discover a diverse range of online courses designed to cater to <br />
          learners of all levels, interests,and ambitions.
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
