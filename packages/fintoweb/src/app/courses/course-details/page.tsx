"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./CourseDetails.module.css";
import Image from "next/image";
import CourseDetailsImg from "../../../assets/courseDetails.png";
import Subscriber from "../../../assets/subscribers.png";
import LearnSlider from "./components/learn-slider/LearnSlider";
import Lessons from "./components/lessons/Lessons";
import AchiverSlider from "./components/achiveing-slider/AchiverSlider";
import FeaturedCourses from "@src/app/homepage/FeaturedCourses";

interface CourseDetailsProps {
  id?: number;
}
const CourseDetails: React.FC<CourseDetailsProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const items = [
    {
      title: "Why opt for an online options trading course?",
      content: "Content for section 1",
    },
    {
      title: "Is this Option Trading Course in Hindi language?",
      content: "Content for section 2",
    },
    {
      title: "Does this course cover advanced options trading strategy?",
      content: "Content for section 3",
    },
    {
      title: "Does this course cover advanced options trading strategy?",
      content: "Content for section 3",
    },
    {
      title: "Does this course covers option buying and options selling?",
      content: "Content for section 3",
    },
    {
      title: "Is this Option Trading Course in Hindi language?",
      content: "Content for section 3",
    },
  ];
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
          <div className={styles.ratingBadge}>
            <div className={styles.rating}>
              <h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="34"
                  viewBox="0 0 36 34"
                  fill="none"
                >
                  <path
                    d="M34.5367 15.4309C34.9335 15.1353 35.2278 14.7229 35.3784 14.2516C35.529 13.7803 35.5283 13.2737 35.3765 12.8028C35.2246 12.3319 34.9292 11.9203 34.5316 11.6258C34.134 11.3312 33.6542 11.1685 33.1595 11.1605L23.5511 10.7975C23.5038 10.7942 23.4586 10.7774 23.4207 10.7489C23.3828 10.7205 23.3539 10.6818 23.3376 10.6373L20.0173 1.66947C19.8505 1.21322 19.5475 0.819254 19.1494 0.540907C18.7512 0.26256 18.2772 0.113281 17.7914 0.113281C17.3056 0.113281 16.8315 0.26256 16.4334 0.540907C16.0352 0.819254 15.7322 1.21322 15.5654 1.66947L12.2559 10.6694C12.2395 10.7138 12.2106 10.7526 12.1728 10.781C12.1349 10.8094 12.0896 10.8262 12.0423 10.8295L2.43391 11.1925C1.93919 11.2006 1.4594 11.3633 1.06182 11.6578C0.664243 11.9523 0.368807 12.3639 0.21694 12.8348C0.0650737 13.3057 0.0643923 13.8123 0.214992 14.2836C0.365591 14.7549 0.659919 15.1673 1.05671 15.4629L8.59398 21.3881C8.6317 21.4178 8.65989 21.4579 8.67507 21.5034C8.69025 21.5489 8.69175 21.5979 8.67939 21.6443L6.08511 30.8364C5.95068 31.3044 5.9637 31.8026 6.12241 32.263C6.28112 32.7234 6.57782 33.1238 6.97213 33.4096C7.36644 33.6954 7.83923 33.8528 8.32617 33.8604C8.81312 33.868 9.29058 33.7254 9.69361 33.452L17.6579 28.114C17.6972 28.0869 17.7437 28.0724 17.7914 28.0724C17.839 28.0724 17.8856 28.0869 17.9248 28.114L25.8891 33.452C26.2867 33.7347 26.7625 33.8866 27.2503 33.8866C27.7382 33.8866 28.2139 33.7347 28.6115 33.452C29.0059 33.1689 29.3029 32.7705 29.4616 32.3116C29.6203 31.8528 29.6329 31.356 29.4976 30.8897L26.882 21.6657C26.8681 21.6194 26.8689 21.5699 26.8842 21.524C26.8995 21.4782 26.9285 21.4382 26.9674 21.4094L34.5367 15.4309Z"
                    fill="#FFA11A"
                  />
                </svg>
                4.8/5
              </h4>
              <p>(1000 reviews)</p>
            </div>
            <div className={styles.subscribe}>
              <Image
                src={Subscriber}
                alt="Subscriber"
                className={styles.image}
              />
              <p>3,293 students</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.learnSlider}>
        <LearnSlider />
      </div>
      <div className={styles.lessons}>
        <Lessons />
      </div>
      <div className={styles.achiverSlider}>
        <AchiverSlider />
      </div>
      <div className={styles.frequentlyBoughtCourses}>
        <h2 className="Heading">Frequently Bought Together</h2>
        <FeaturedCourses />
      </div>
      <div className={styles.contactAccordion}>
        <h1>Frequently Asked Questions</h1>
        <div className={styles.accordion}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <button
                className={styles.header}
                onClick={() => handleToggle(index)}
              >
                <span className={styles.title}>{item.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={styles.icon}
                >
                  <path
                    d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
                    stroke="#F4F5F5"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 9L10 12L13 9"
                    stroke="#F4F5F5"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className={styles.content}>{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
