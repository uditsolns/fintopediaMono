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
import {
  getCourses,
  getCoursesById,
} from "shared/src/provider/store/services/courses.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import VideoPlayer from "@src/components/VideoPlayer/VideoPlayer";
import { imageUrl } from "shared/src/config/imageUrl";
import FrequentlyBought from "./components/frequently-bought/FrequentlyBought";

interface CourseDetailsProps {
  id?: number;
}
const CourseDetails: React.FC<CourseDetailsProps> = ({ id }) => {
  
  const dispatch = useAppDispatch();
  const {
    singleCourse,
    courses,
    loading: singleCourseLoading,
  } = useAppSelector((state) => state.courses);
  console.log("singleCourse", singleCourse);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(getCoursesById({ id }));
    }
    dispatch(getCourses());
  }, [id, dispatch]);

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
    <>
      {singleCourseLoading?.singleCourse || singleCourseLoading?.courses ? (
        <div className="fullPageLoading">
          <LoadingAtom
            style={{
              height: "5rem",
              width: "5rem",
            }}
          />
        </div>
      ) : null}
      <div className={styles.CourseDetails}>
        <div className={styles.CourseDetailsHeader}>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <span> &gt; </span>
            <Link href="#" className={styles.link}>
              {singleCourse?.category?.category_name}
            </Link>
            <span> &gt; </span>
            <Link href="#" className={styles.link}>
              {singleCourse?.name}
            </Link>
          </div>
          <div className="courseDetailsContent">
            <h2 className={styles.heading}>{singleCourse?.name}</h2>
            <p className={styles.subHeading}>
              Welcome to our comprehensive Stock Market Course, designed to
              <br /> empower you with the knowledge and skills needed.
            </p>
            <div className={styles.CourseDetailsHeaderButton}>
              <button>Course starts from ₹ {singleCourse?.sale_price}</button>
            </div>
            <div className={styles.offerText}>
              <h6>
                Offer ends in <span> 01d : 09h : 20m : 06s</span>
              </h6>
            </div>
          </div>
        </div>
        <div className={styles.courseDetailsVideo}>
          <VideoPlayer
            src={`${imageUrl}/uploads/course_videos/${singleCourse?.course_video}`}
          />
        </div>
        <div className={styles.learnSlider}>
          <LearnSlider />
        </div>
        <div className={styles.lessons}>
          <Lessons
            sections={singleCourse?.sections}
            about_me={singleCourse?.about_me}
          />
        </div>
        <div className={styles.achiverSlider}>
          <AchiverSlider />
        </div>
        <div className={styles.frequentlyBoughtCourses}>
          <FrequentlyBought courses={courses} />
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
    </>
  );
};

export default CourseDetails;
