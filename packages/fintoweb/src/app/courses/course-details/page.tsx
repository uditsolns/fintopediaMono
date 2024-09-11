"use client";

import React from "react";
import Link from "next/link";
import styles from "./CourseDetails.module.css";
import Image from "next/image";
import CourseDetailsImg from "../../../assets/courseDetails.png"

const CourseDetails = () => {
  return (
    <div className={styles.CourseDetails}>
      <div className={styles.CourseDetailsHeader}>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <span> &gt; </span>
          <Link href="/finance" className={styles.link}>
            Finance
          </Link>
          <span> &gt; </span>
          <Link href="/stock-market-trading-investing" className={styles.link}>
            Stock Market Trading & Investing
          </Link>
        </div>
        <div className="courseDetailsContent">
          <h2 className={styles.heading}>
            Stock Market Trading & Investing:
            <br /> 8 Courses In 1 Bundle!
          </h2>
          <p className={styles.subHeading}>
            Welcome to our comprehensive Stock Market Course, designed to
            <br /> empower you with the knowledge and skills needed.
          </p>
          <div className={styles.CourseDetailsHeaderButton}>
            <button>Course starts from ₹ 2,999</button>
          </div>
          <div className={styles.offerText}>
            <h6>
              Offer ends in <span> 01d : 09h : 20m : 06s</span>
            </h6>
          </div>
        </div>
        <div className={styles.courseDetailImage}>
          <Image
            src={CourseDetailsImg}
            alt="Course Image"
            className={styles.image}
          />
          <div className={styles.svgWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97"
              height="97"
              viewBox="0 0 97 97"
              fill="none"
            >
              <circle cx="49.6294" cy="47.3726" r="24.814" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.4992 87.3012C58.7896 87.3012 68.6586 83.2133 75.935 75.9369C83.2114 68.6605 87.2992 58.7916 87.2992 48.5012C87.2992 38.2108 83.2114 28.3418 75.935 21.0654C68.6586 13.789 58.7896 9.70117 48.4992 9.70117C38.2088 9.70117 28.3399 13.789 21.0635 21.0654C13.7871 28.3418 9.69922 38.2108 9.69922 48.5012C9.69922 58.7916 13.7871 68.6605 21.0635 75.9369C28.3399 83.2133 38.2088 87.3012 48.4992 87.3012ZM46.341 34.766C45.6106 34.2787 44.7615 33.9988 43.8845 33.9562C43.0075 33.9136 42.1354 34.1098 41.3612 34.5241C40.587 34.9383 39.9397 35.555 39.4885 36.3082C39.0373 37.0615 38.7991 37.9231 38.7992 38.8012V58.2012C38.7991 59.0792 39.0373 59.9409 39.4885 60.6941C39.9397 61.4474 40.587 62.064 41.3612 62.4783C42.1354 62.8925 43.0075 63.0888 43.8845 63.0462C44.7615 63.0036 45.6106 62.7237 46.341 62.2364L60.891 52.5364C61.5552 52.0935 62.0998 51.4934 62.4765 50.7895C62.8532 50.0856 63.0503 49.2995 63.0503 48.5012C63.0503 47.7028 62.8532 46.9168 62.4765 46.2129C62.0998 45.5089 61.5552 44.9089 60.891 44.466L46.341 34.766Z"
                fill="#1D90F5"
              />
            </svg>
          </div>
          <div className={styles.ratingBadge}>⭐ 4.5</div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
