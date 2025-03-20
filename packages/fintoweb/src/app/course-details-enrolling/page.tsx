"use client";

import React, { useState } from "react";
import styles from "./CourseDetailsEnrolling.module.css";
import EnrollTabs from "./tabpanel/EnrollTabs";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import {
  getCourses,
  getCoursesById,
} from "shared/src/provider/store/services/courses.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { getCourseNotes } from "shared/src/provider/store/services/course-note.service";
import { getCourseReviews } from "shared/src/provider/store/services/course-review.service";
import FrequentlyBought from "../courses/course-details/components/frequently-bought/FrequentlyBought";
import ShareButton from "@src/components/share-button/ShareButton";
import VideoEmbed from "@src/components/VideoPlayer/VideoEmbed";
import { getCourseUploadFile } from "shared/src/provider/store/services/course-upload-file.service";
import {
  createLikeCourse,
  deleteLikeCourse,
  getLikeCourse,
} from "shared/src/provider/store/services/course-like.service";
import { toast } from "react-toastify";
import {
  getOngoingCourseStatus,
  updateOngoingCourseStatus,
} from "shared/src/provider/store/services/ongoing-courses-status.service";
import {
  getOngoingCourse,
  updateOngoingCourse,
} from "shared/src/provider/store/services/ongoing-course.service";
import { CircularProgress, Typography } from "@mui/material";
import CourseProgress from "./CourseProgress";
import { getCompletionPercentage } from "shared/src/provider/store/services/completion-percentage.service";
import { useRouter } from "next/navigation";

interface CourseEnrollDetailsProps {
  id?: number;
}
const CourseDetailsEnrolling: React.FC<CourseEnrollDetailsProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    singleCourse,
    courses,
    loading: courseLoading,
  } = useAppSelector((state) => state.courses);
  const { ongoing_courses_status, loading: ongoing_courses_status_loading } =
    useAppSelector((state) => state.ongoingCourseStatus);
  // console.log("ongoing_courses_status", ongoing_courses_status);

  const { ongoing_courses, loading: ongoing_courses_loading } = useAppSelector(
    (state) => state.ongoingCourse
  );
  const { auth } = useAppSelector((state) => state.auth);
  const { loading: course_notes_loading } = useAppSelector(
    (state) => state.courseNotes
  );
  const { loading: course_review_loading } = useAppSelector(
    (state) => state.courseReviews
  );
  const { loading: upload_file_loading } = useAppSelector(
    (state) => state.courseUploadFile
  );
  const { likeCourse, loading: likeCourseLoading } = useAppSelector(
    (state) => state.likeCourse
  );
  const { completion_percentage, loading: completion_percentage_loading } =
    useAppSelector((state) => state.completionPercentage);
  const isLiked = likeCourse?.some(
    (like) => like.course_id === singleCourse?.id
  );
  const likedCourse = likeCourse?.find(
    (like) => like.course_id === singleCourse?.id
  );
  const likedCourseId = likedCourse ? likedCourse.id : null;
  const shareData = {
    title: "Check out this awesome page!",
    text: "This is a fantastic page I found!",
    url: window.location.href,
  };
  // React.useEffect(() => {
  //   if (id !== undefined) {
  //     dispatch(getCoursesById({ id }));
  //   }
  //   dispatch(getCourseNotes());
  //   dispatch(getCourseReviews());
  //   dispatch(getCourses());
  //   dispatch(getCourseUploadFile());
  //   dispatch(getLikeCourse());
  //   dispatch(getOngoingCourseStatus());
  //   dispatch(getOngoingCourse());
  //   dispatch(getCompletionPercentage());
  // }, [id, dispatch]);
  React.useEffect(() => {
    if (auth?.token && id !== undefined) {
      dispatch(getCoursesById({ id }));
      dispatch(getCourseNotes());
      dispatch(getCourseReviews());
      dispatch(getCourses());
      dispatch(getCourseUploadFile());
      dispatch(getLikeCourse());
      dispatch(getOngoingCourseStatus());
      dispatch(getOngoingCourse());
      dispatch(getCompletionPercentage());
    } else {
      router.push('/auth/login');
      // console.log("User not authenticated or ID is missing");
    }
  }, [id, auth?.token, dispatch]);

  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // video changes
  const [videoEmbedInfo, setVideoEmbedInfo] = useState({
    otp: null,
    playbackInfo: null,
  });
  React.useEffect(() => {
    if (singleCourse?.course_video_embed) {
      setVideoEmbedInfo({
        otp: singleCourse.course_video_embed.otp,
        playbackInfo: singleCourse.course_video_embed.playbackInfo,
      });
    }
  }, [singleCourse]);

  const completion = Math.floor(
    completion_percentage?.completion_data?.find(
      (data) => data.course_id === singleCourse?.id
    )?.completion_percentage || 0
  );

  const handleSubsectionClick = (
    otp,
    playbackInfo,
    sectionId,
    subsectionId,
    ongoingId
  ) => {
    let params = {
      id: ongoingId,
      user_id: Number(auth?.user?.id),
      course_id: Number(singleCourse?.id),
      section_id: sectionId,
      sub_section_id: subsectionId,
      watching_status: "true",
      course_percentage: "0",
    };
    if (ongoingId) {
      dispatch(
        updateOngoingCourse({
          params,
          onSuccess(data) {
            // console.log("data");
            // toast.success("Course Updated Successfully !", {
            //   position: "top-right",
            //   theme: "light",
            // });
          },
          onError(error) {},
        })
      );
    }

    setVideoEmbedInfo({ otp, playbackInfo });
  };

  const handleSubmit = async () => {
    let params = {
      user_id: auth?.user?.id,
      course_id: singleCourse?.id,
      status: "1",
    };
    dispatch(
      createLikeCourse({
        params,
        onSuccess(data) {
          toast.success("Course added to Favorites!", {
            position: "top-right",
            theme: "light",
          });
        },
        onError(error) {},
      })
    );
  };
  const handleDelete = async () => {
    dispatch(
      deleteLikeCourse({
        id: likedCourseId,
        onSuccess(data) {
          toast.success("Course removed from Favorites!", {
            position: "top-right",
            theme: "light",
          });
        },
        onError(error) {
          toast.error("Failed to delete the Course.", {
            position: "top-right",
            theme: "light",
          });
        },
      })
    );
  };

  return (
    <>
      {courseLoading.singleCourse ||
      courseLoading.courses ||
      course_notes_loading?.course_notes ||
      course_notes_loading?.create ||
      course_notes_loading?.update ||
      course_notes_loading?.delete ||
      upload_file_loading.create ||
      upload_file_loading?.upload_file ||
      likeCourseLoading?.likeCourse ||
      likeCourseLoading?.create ||
      likeCourseLoading?.update ||
      ongoing_courses_status_loading?.ongoing_courses_status ||
      ongoing_courses_loading?.ongoing_courses ||
      course_review_loading?.course_review ||
      completion_percentage_loading?.completion_percentage ? (
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
          <h2>{singleCourse?.name}</h2>
          <div className={styles.progressSection}>
            <CourseProgress progress={completion} />
            <span>Your progress ({completion}%)</span>
            <ShareButton
              title={shareData.title}
              text={shareData.text}
              url={shareData.url}
            />
            <span
              className={styles.fav}
              onClick={!isLiked ? handleSubmit : handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d={
                    isLiked
                      ? "M27.8748 7.12405C26.5162 5.76886 24.6763 5.00678 22.7574 5.00444C20.8385 5.00209 18.9967 5.75968 17.6348 7.11155L15.9998 8.6303L14.3636 7.10655C13.002 5.7488 11.1569 4.98755 9.23404 4.99024C7.3112 4.99294 5.46819 5.75937 4.11045 7.12092C2.75271 8.48248 1.99145 10.3276 1.99415 12.2505C1.99684 14.1733 2.76327 16.0163 4.12483 17.374L15.2936 28.7065C15.3866 28.801 15.4975 28.8761 15.6199 28.9273C15.7422 28.9785 15.8735 29.0049 16.0061 29.0049C16.1387 29.0049 16.27 28.9785 16.3923 28.9273C16.5146 28.8761 16.6255 28.801 16.7186 28.7065L27.8748 17.374C29.2335 16.0145 29.9968 14.1711 29.9968 12.249C29.9968 10.327 29.2335 8.48356 27.8748 7.12405ZM26.4561 15.969L15.9998 26.574L5.53733 15.959C4.55271 14.9744 3.99956 13.639 3.99956 12.2465C3.99956 10.8541 4.55271 9.51866 5.53733 8.53405C6.52194 7.54943 7.85737 6.99628 9.24983 6.99628C10.6423 6.99628 11.9777 7.54943 12.9623 8.53405L12.9873 8.55905L15.3186 10.7278C15.5036 10.9 15.747 10.9957 15.9998 10.9957C16.2526 10.9957 16.496 10.9 16.6811 10.7278L19.0123 8.55905L19.0373 8.53405C20.0226 7.55009 21.3584 6.99784 22.7509 6.99878C24.1433 6.99972 25.4784 7.55377 26.4623 8.53905C27.4463 9.52432 27.9985 10.8601 27.9976 12.2526C27.9967 13.645 27.4426 14.9801 26.4573 15.964L26.4561 15.969Z"
                      : "M27.8748 7.12405C26.5162 5.76886 24.6763 5.00678 22.7574 5.00444C20.8385 5.00209 18.9967 5.75968 17.6348 7.11155L15.9998 8.6303L14.3636 7.10655C13.002 5.7488 11.1569 4.98755 9.23404 4.99024C7.3112 4.99294 5.46819 5.75937 4.11045 7.12092C2.75271 8.48248 1.99145 10.3276 1.99415 12.2505C1.99684 14.1733 2.76327 16.0163 4.12483 17.374L15.2936 28.7065C15.3866 28.801 15.4975 28.8761 15.6199 28.9273C15.7422 28.9785 15.8735 29.0049 16.0061 29.0049C16.1387 29.0049 16.27 28.9785 16.3923 28.9273C16.5146 28.8761 16.6255 28.801 16.7186 28.7065L27.8748 17.374C29.2335 16.0145 29.9968 14.1711 29.9968 12.249C29.9968 10.327 29.2335 8.48356 27.8748 7.12405ZM26.4561 15.969L15.9998 26.574L5.53733 15.959C4.55271 14.9744 3.99956 13.639 3.99956 12.2465C3.99956 10.8541 4.55271 9.51866 5.53733 8.53405C6.52194 7.54943 7.85737 6.99628 9.24983 6.99628C10.6423 6.99628 11.9777 7.54943 12.9623 8.53405L12.9873 8.55905L15.3186 10.7278C15.5036 10.9 15.747 10.9957 15.9998 10.9957C16.2526 10.9957 16.496 10.9 16.6811 10.7278L19.0123 8.55905L19.0373 8.53405C20.0226 7.55009 21.3584 6.99784 22.7509 6.99878C24.1433 6.99972 25.4784 7.55377 26.4623 8.53905C27.4463 9.52432 27.9985 10.8601 27.9976 12.2526C27.9967 13.645 27.4426 14.9801 26.4573 15.964L26.4561 15.969Z"
                  }
                  fill={isLiked ? "#ff0000" : "white"}
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
                      {singleCourse?.sections?.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={styles.item}>
                          <button
                            className={styles.accordionButton}
                            onClick={() => handleToggle(sectionIndex)}
                          >
                            <span className={styles.title}>
                              {section.section_heading}
                            </span>
                            {openIndex === sectionIndex ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M16.8482 11.961L10.8909 6.00363C10.8356 5.94824 10.7699 5.9043 10.6975 5.87432C10.6252 5.84434 10.5477 5.82891 10.4694 5.82891C10.3911 5.82891 10.3136 5.84434 10.2413 5.87432C10.169 5.9043 10.1033 5.94824 10.0479 6.00363L4.0906 11.961C3.97882 12.0728 3.91602 12.2244 3.91602 12.3825C3.91602 12.5405 3.97882 12.6921 4.0906 12.8039C4.20238 12.9157 4.35399 12.9785 4.51208 12.9785C4.67017 12.9785 4.82178 12.9157 4.93356 12.8039L10.4694 7.26733L16.0053 12.8039C16.0606 12.8593 16.1263 12.9032 16.1986 12.9331C16.271 12.9631 16.3485 12.9785 16.4268 12.9785C16.505 12.9785 16.5825 12.9631 16.6549 12.9331C16.7272 12.9032 16.7929 12.8593 16.8482 12.8039C16.9036 12.7486 16.9475 12.6829 16.9774 12.6106C17.0074 12.5382 17.0228 12.4607 17.0228 12.3825C17.0228 12.3042 17.0074 12.2267 16.9774 12.1543C16.9475 12.082 16.9036 12.0163 16.8482 11.961Z"
                                  fill="white"
                                />
                              </svg>
                            ) : (
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
                            )}
                          </button>
                          {openIndex === sectionIndex && (
                            <div className={styles.content}>
                              <ul>
                                {section.subsections?.map(
                                  (subsection, subsectionIndex) => {
                                    const ongoingCourse = ongoing_courses.find(
                                      (course) =>
                                        course.user_id === auth.user?.id &&
                                        course.course_id === singleCourse.id &&
                                        course.section_id === section.id &&
                                        course.sub_section_id === subsection.id
                                    );
                                    // console.log("ongoingCourse", ongoingCourse);

                                    const ongoingId = ongoingCourse
                                      ? ongoingCourse.id
                                      : null;

                                    // console.log("ongoingId", ongoingId);
                                    return (
                                      <li
                                        key={subsection.id}
                                        className={styles.listSubsection}
                                        onClick={() =>
                                          handleSubsectionClick(
                                            subsection.sub_video_embed.otp,
                                            subsection.sub_video_embed
                                              .playbackInfo,
                                            section?.id,
                                            subsection?.id,
                                            ongoingId
                                          )
                                        }
                                      >
                                        <div
                                          className={styles.subsectionContainer}
                                        >
                                          {ongoing_courses.some(
                                            (course) =>
                                              course.user_id ===
                                                auth.user?.id &&
                                              course.course_id ===
                                                singleCourse.id &&
                                              course.section_id ===
                                                section.id &&
                                              course.sub_section_id ===
                                                subsection.id &&
                                              course.watching_status === "true"
                                          ) ? (
                                            <span className={styles.checkIcon}>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                              >
                                                <path
                                                  d="M8.49956 12.3791L15.3936 5.48438L16.4548 6.54488L8.49956 14.5001L3.72656 9.72712L4.78706 8.66663L8.49956 12.3791Z"
                                                  fill="white"
                                                />
                                              </svg>
                                            </span>
                                          ) : (
                                            <span
                                              className={styles.uncheckIcon}
                                            ></span>
                                          )}

                                          <div>
                                            <p
                                              className={
                                                styles.subsectionHeading
                                              }
                                            >
                                              {subsection.subsection_heading}
                                            </p>
                                            <div
                                              className={
                                                styles.subsectionTimeContainer
                                              }
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                className={styles.svgIcon}
                                              >
                                                <path
                                                  d="M9.9974 3.16732H3.9974V13.834H11.9974V5.16732H9.9974V3.16732ZM3.9974 1.83398H10.6641L13.3307 4.50065V13.834C13.3307 14.1876 13.1903 14.5267 12.9402 14.7768C12.6902 15.0268 12.351 15.1673 11.9974 15.1673H3.9974C3.64377 15.1673 3.30464 15.0268 3.05459 14.7768C2.80454 14.5267 2.66406 14.1876 2.66406 13.834V3.16732C2.66406 2.8137 2.80454 2.47456 3.05459 2.22451C3.30464 1.97446 3.64377 1.83398 3.9974 1.83398ZM5.33073 7.83398H10.6641V9.16732H5.33073V7.83398ZM5.33073 10.5007H10.6641V11.834H5.33073V10.5007Z"
                                                  fill="#6D6E6E"
                                                />
                                              </svg>
                                              <span
                                                className={
                                                  styles.subsectionTime
                                                }
                                              >
                                                {subsection.subsection_time}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
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
                <VideoEmbed
                  otp={videoEmbedInfo.otp}
                  playbackInfo={videoEmbedInfo.playbackInfo}
                />
              </div>
            </div>
          </div>
          <div className={styles.tabsContainer}>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <h3>Roles and responsibilities of a product manager</h3>
                <EnrollTabs />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.levelUp}>
          <FrequentlyBought courses={courses} heading={"Level up your game"} />
        </div>
      </section>
    </>
  );
};

export default CourseDetailsEnrolling;
