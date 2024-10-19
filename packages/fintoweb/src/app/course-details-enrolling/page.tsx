"use client";

import React, { useState } from "react";
import styles from "./CourseDetailsEnrolling.module.css";
import EnrollCourse from "../../assets/enroll-course.png";
import Image from "next/image";
import EnrollTabs from "./tabpanel/EnrollTabs";
import FeaturedCourses from "../homepage/FeaturedCourses";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getCoursesById } from "shared/src/provider/store/services/courses.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { getCourseNotes } from "shared/src/provider/store/services/course-note.service";
import VideoPlayer from "@src/components/VideoPlayer/VideoPlayer";
import { imageUrl } from "shared/src/config/imageUrl";

interface CourseEnrollDetailsProps {
  id?: number;
}
const CourseDetailsEnrolling: React.FC<CourseEnrollDetailsProps> = ({ id }) => {
  const courseId = id;
  const dispatch = useAppDispatch();
  const { singleCourse, loading: singleCourseLoading } = useAppSelector(
    (state) => state.courses
  );
  const { course_notes, loading: course_notes_loading } = useAppSelector(
    (state) => state.courseNotes
  );
  const { upload_file, loading: upload_file_loading } = useAppSelector(
    (state) => state.courseUploadFile
  );

  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(getCoursesById({ id }));
    }
    dispatch(getCourseNotes());
  }, [id, dispatch]);

  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const items = [
    {
      title: "Section 1: Course Introduction",
      content: "Content for section 1",
    },
    {
      title: "Section 2: Basics of Stock Market",
      content: "Content for section 2",
    },
    {
      title: "Section 3: Mastering Money Management principles",
      content: "Content for section 3",
    },
    {
      title: "Section 4: Basics of Stock Market",
      content: "Content for section 3",
    },
    {
      title: "Section 5: Stock Market Analysis",
      content: "Content for section 3",
    },
  ];
  return (
    <>
      {singleCourseLoading.singleCourse ||
      course_notes_loading?.course_notes ||
      course_notes_loading?.create ||
      course_notes_loading?.update ||
      course_notes_loading?.delete ||
      upload_file_loading.create ||
      upload_file_loading?.upload_file ? (
        <div className="fullPageLoading">
          <LoadingAtom
            style={{
              height: "5rem",
              width: "5rem",
            }}
          />
        </div>
      ) : null}

      <section>
        <div className={styles.enrollHeader}>
          <h2>Mastering Money Management</h2>
          <div className={styles.progressSection}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12.0022 22C17.5251 22 22.0022 17.5229 22.0022 12C22.0022 6.47716 17.5251 2.00001 12.0022 2.00001C6.47938 2.00001 2.00223 6.47716 2.00223 12C2.00223 17.5229 6.47938 22 12.0022 22Z"
                fill="url(#paint0_angular_1727_26010)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.7765 9.60013C23.3242 9.52946 23.8255 9.91621 23.8962 10.464C23.9619 10.9731 23.9948 11.486 23.9948 11.9994C23.9948 12.5517 23.5471 12.9994 22.9948 12.9994C22.4425 12.9994 21.9948 12.5517 21.9948 11.9994C21.9948 11.5716 21.9674 11.1442 21.9126 10.7199C21.842 10.1721 22.2287 9.6708 22.7765 9.60013Z"
                fill="#545F71"
              />
              <defs>
                <radialGradient
                  id="paint0_angular_1727_26010"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(12 12) scale(12)"
                >
                  <stop offset="0.0001" stopColor="white" stopOpacity="0" />
                  <stop offset="0.631363" stopColor="white" />
                  <stop offset="1" stopColor="white" />
                </radialGradient>
              </defs>
            </svg>
            <span>Your progress (12%)</span>
            <button className={styles.shareButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15 18.3346C14.3056 18.3346 13.7153 18.0916 13.2292 17.6055C12.7431 17.1194 12.5 16.5291 12.5 15.8346C12.5 15.7374 12.5069 15.6366 12.5208 15.5321C12.5347 15.4277 12.5556 15.3341 12.5833 15.2513L6.70833 11.8346C6.47222 12.043 6.20833 12.2063 5.91667 12.3246C5.625 12.443 5.31944 12.5019 5 12.5013C4.30556 12.5013 3.71528 12.2582 3.22917 11.7721C2.74306 11.286 2.5 10.6957 2.5 10.0013C2.5 9.30686 2.74306 8.71658 3.22917 8.23047C3.71528 7.74436 4.30556 7.5013 5 7.5013C5.31944 7.5013 5.625 7.56047 5.91667 7.6788C6.20833 7.79714 6.47222 7.96019 6.70833 8.16797L12.5833 4.7513C12.5556 4.66797 12.5347 4.57436 12.5208 4.47047C12.5069 4.36658 12.5 4.26575 12.5 4.16797C12.5 3.47352 12.7431 2.88325 13.2292 2.39714C13.7153 1.91102 14.3056 1.66797 15 1.66797C15.6944 1.66797 16.2847 1.91102 16.7708 2.39714C17.2569 2.88325 17.5 3.47352 17.5 4.16797C17.5 4.86241 17.2569 5.45269 16.7708 5.9388C16.2847 6.42491 15.6944 6.66797 15 6.66797C14.6806 6.66797 14.375 6.60908 14.0833 6.4913C13.7917 6.37352 13.5278 6.21019 13.2917 6.0013L7.41667 9.41797C7.44444 9.5013 7.46528 9.59519 7.47917 9.69963C7.49306 9.80408 7.5 9.90464 7.5 10.0013C7.5 10.098 7.49306 10.1988 7.47917 10.3038C7.46528 10.4088 7.44444 10.5024 7.41667 10.5846L13.2917 14.0013C13.5278 13.793 13.7917 13.6299 14.0833 13.5121C14.375 13.3944 14.6806 13.3352 15 13.3346C15.6944 13.3346 16.2847 13.5777 16.7708 14.0638C17.2569 14.5499 17.5 15.1402 17.5 15.8346C17.5 16.5291 17.2569 17.1194 16.7708 17.6055C16.2847 18.0916 15.6944 18.3346 15 18.3346Z"
                  fill="black"
                />
              </svg>
              Share
            </button>
            <span className={styles.fav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M27.8748 7.12405C26.5162 5.76886 24.6763 5.00678 22.7574 5.00444C20.8385 5.00209 18.9967 5.75968 17.6348 7.11155L15.9998 8.6303L14.3636 7.10655C13.002 5.7488 11.1569 4.98755 9.23404 4.99024C7.3112 4.99294 5.46819 5.75937 4.11045 7.12092C2.75271 8.48248 1.99145 10.3276 1.99415 12.2505C1.99684 14.1733 2.76327 16.0163 4.12483 17.374L15.2936 28.7065C15.3866 28.801 15.4975 28.8761 15.6199 28.9273C15.7422 28.9785 15.8735 29.0049 16.0061 29.0049C16.1387 29.0049 16.27 28.9785 16.3923 28.9273C16.5146 28.8761 16.6255 28.801 16.7186 28.7065L27.8748 17.374C29.2335 16.0145 29.9968 14.1711 29.9968 12.249C29.9968 10.327 29.2335 8.48356 27.8748 7.12405ZM26.4561 15.969L15.9998 26.574L5.53733 15.959C4.55271 14.9744 3.99956 13.639 3.99956 12.2465C3.99956 10.8541 4.55271 9.51866 5.53733 8.53405C6.52194 7.54943 7.85737 6.99628 9.24983 6.99628C10.6423 6.99628 11.9777 7.54943 12.9623 8.53405L12.9873 8.55905L15.3186 10.7278C15.5036 10.9 15.747 10.9957 15.9998 10.9957C16.2526 10.9957 16.496 10.9 16.6811 10.7278L19.0123 8.55905L19.0373 8.53405C20.0226 7.55009 21.3584 6.99784 22.7509 6.99878C24.1433 6.99972 25.4784 7.55377 26.4623 8.53905C27.4463 9.52432 27.9985 10.8601 27.9976 12.2526C27.9967 13.645 27.4426 14.9801 26.4573 15.964L26.4561 15.969Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className={styles.enrollCourseContent}>
          <div className="row">
            <div className="col-md-4">
              <div className={styles.courseContent}>
                <button
                  onClick={handleAccordionToggle}
                  className={styles.courseContentButton}
                >
                  Course Content
                  {isAccordionOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="#CFCFD3"
                        strokeWidth="2.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
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
                  )}
                </button>
                {isAccordionOpen && (
                  <div className={styles.accordionContent}>
                    <div className={styles.accordion}>
                      {items.map((item, index) => (
                        <div key={index} className={styles.item}>
                          <button
                            className={styles.accordionButton}
                            onClick={() => handleToggle(index)}
                          >
                            <span className={styles.title}>{item.title}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M16.8482 8.03903L10.8909 13.9964C10.8356 14.0518 10.7699 14.0957 10.6975 14.1257C10.6252 14.1557 10.5477 14.1711 10.4694 14.1711C10.3911 14.1711 10.3136 14.1557 10.2413 14.1257C10.169 14.0957 10.1033 14.0518 10.0479 13.9964L4.0906 8.03903C3.97882 7.92725 3.91602 7.77564 3.91602 7.61755C3.91602 7.45946 3.97882 7.30785 4.0906 7.19607C4.20238 7.08428 4.35399 7.02148 4.51208 7.02148C4.67017 7.02148 4.82178 7.08428 4.93356 7.19607L10.4694 12.7327L16.0053 7.19607C16.0606 7.14072 16.1263 7.09681 16.1986 7.06686C16.271 7.0369 16.3485 7.02148 16.4268 7.02148C16.505 7.02148 16.5825 7.0369 16.6549 7.06686C16.7272 7.09681 16.7929 7.14072 16.8482 7.19607C16.9036 7.25142 16.9475 7.31713 16.9774 7.38944C17.0074 7.46176 17.0228 7.53927 17.0228 7.61755C17.0228 7.69583 17.0074 7.77334 16.9774 7.84565C16.9475 7.91797 16.9036 7.98368 16.8482 8.03903Z"
                                fill="white"
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
                )}
              </div>
            </div>
            <div className="col-md-8">
              <div className={styles.enrollCourseVideo}>
                <VideoPlayer
                  src={`${imageUrl}/uploads/course_videos/${singleCourse?.course_video}`}
                />
              </div>
              <div className={styles.tabsContainer}>
                <h3>Roles and responsibilities of a product manager</h3>
                <EnrollTabs />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.levelUp}>
          <h2 className="Heading">Level up your game</h2>
          <FeaturedCourses />
        </div>
      </section>
    </>
  );
};

export default CourseDetailsEnrolling;
