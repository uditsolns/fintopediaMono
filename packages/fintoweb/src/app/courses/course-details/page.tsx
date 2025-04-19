"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./CourseDetails.module.css";
import LearnSlider from "./components/learn-slider/LearnSlider";
import Lessons from "./components/lessons/Lessons";
import AchiverSlider from "./components/achiveing-slider/AchiverSlider";
import {
  getCourses,
  getCoursesById,
} from "shared/src/provider/store/services/courses.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import FrequentlyBought from "./components/frequently-bought/FrequentlyBought";
import VideoEmbed from "@src/components/VideoPlayer/VideoEmbed";
import CountCardMolecule from "@src/components/molecules/CountCardMolecule/CountCardMolecule";
import { getCourseReviews } from "shared/src/provider/store/services/course-review.service";
import OfferCountdown from "@src/components/offer-countdown/OfferCountdown";
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
  const { course_review, loading: courseReviewLoading } = useAppSelector(
    (state) => state.courseReviews
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(getCoursesById({ id }));
    }
    dispatch(getCourses());
    dispatch(getCourseReviews());
  }, [id, dispatch]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const items = [
    {
      title: "What is your platform about ?",
      content:
        "Our platform is an e-learning solution designed to provide high-quality, accessible education in various fields, ranging from professional development. We focus on interactive and engaging content tailored to diverse learning needs.",
    },
    {
      title: "How is your platform different from others ?",
      content:
        "We stand out through our personalized learning experience, robust analytics for tracking progress, industry-relevant course content, and a dedicated support system. Additionally, we offer a flexible learning environment accessible across devices, with both online learning options. ",
    },
    {
      title: "What courses/programs do you offer ?",
      content:
        "We offer a wide range of courses in Technical, Fundamental & Python for Finance. Our programs include foundational courses, advanced specializations, and industry-specific training.",
    },
    {
      title: "Is there any certification provided ?",
      content:
        "Yes, we provide certifications upon successful completion of courses. These certifications are recognized by industry leaders and can enhance your professional profile. ",
    },
    {
      title: "How much does it cost to use your platform ?",
      content:
        "Pricing varies based on the course or program selected. We offer both pay-per-course and subscription models, ensuring affordability and flexibility. ",
    },
    {
      title: "Do you offer free trials ?",
      content:
        "Yes, we provide free trials for select courses, allowing you to explore the content and learning experience before committing.",
    },
    {
      title: "Are there discounts for students, colleges, or bulk purchases ?",
      content:
        "Yes, we offer discounts for students, educational institutions, and bulk purchases. Please contact our team.",
    },
    {
      title: "How are classes conducted ?",
      content: "Classes are conducted through recorded video lectures.",
    },
    {
      title: "Can I access courses offline ?",
      content: "No",
    },
    {
      title: "What is the student-teacher ratio ?",
      content:
        "For live sessions, the ratio is optimized to ensure personalized attention, typically ranging from 1:10 to 1:30, depending on the course. ",
    },
    {
      title: "How do I track my progress ?",
      content:
        "Our platform features a robust dashboard where you can monitor your progress, quiz scores, assignment submissions, and completion certificates. ",
    },
    {
      title: "Do you offer personalized learning ?",
      content:
        "Yes, we use AI-driven tools to recommend content, customize learning paths, and provide tailored feedback based on individual performance. ",
    },
    {
      title: "What if I face technical issues ?",
      content:
        "Our dedicated support team is available 9.00am to 8.00pm on working days i.e Monday to Saturday to assist you. You can reach us via chat, email, or phone for prompt resolution.",
    },
    {
      title: "Is your platform mobile-friendly ?",
      content:
        "Yes, our platform is optimized for both mobile and desktop devices, ensuring a seamless learning experience on the go.",
    },
    {
      title: "Will this help me get a job or admission ?",
      content:
        "Absolutely. Our courses are designed with practical applications in mind, and certifications are often valued by employers and academic institutions.",
    },
    {
      title: "Do you have industry collaborations ?",
      content:
        "Yes, we partner with leading companies and organizations to ensure our courses meet industry standards and provide opportunities for internships or placements.",
    },
  ];
  return (
    <>
      {singleCourseLoading?.singleCourse ||
      singleCourseLoading?.courses ||
      courseReviewLoading?.course_review ? (
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
        <div className={styles.CourseDetailsIntro}>
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
          <div className={styles.CourseDetailsHeader}>
            <div className="courseDetailsContent">
              <h2 className={styles.heading}>{singleCourse?.name}</h2>
              <p className={styles.subHeading}>
                {/* Welcome to our comprehensive Stock Market Course, designed to
                <br /> empower you with the knowledge and skills needed. */}
                {singleCourse?.about_me}
              </p>
              <div className={styles.CourseDetailsHeaderButton}>
                <button>
                  Course starts from{" "}
                  <span className={styles.CourseDetailsHeaderButtonSpan}>
                    &#8377; {singleCourse?.sale_price}
                  </span>
                </button>
              </div>
              <div className={styles.offerText}>
                <OfferCountdown
                  offerStartDate={singleCourse?.offer_start_date}
                  offerEndDate={singleCourse?.offer_end_date}
                />
              </div>
            </div>
          </div>
          <div className={styles.courseDetailsVideo}>
            <VideoEmbed
              otp={singleCourse?.course_video_embed?.otp}
              playbackInfo={singleCourse?.course_video_embed?.playbackInfo}
            />
          </div>
          <div className={styles.countCard}>
            <CountCardMolecule
              rating={singleCourse?.rating}
              review={singleCourse?.reviews}
            />
          </div>
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
          <FrequentlyBought
            courses={courses}
            heading="Frequently Bought Together"
          />
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
