"use client";

import React from "react";
import styles from "./LikeCourses.module.css";
import NextArrow from "@src/app/components/NextArrow";
import PrevArrow from "@src/app/components/PrevArrow";
import Slider from "react-slick";
import { CoursesResponse } from "shared/src/utils/types/courses";
import CoursesMolecule from "@src/components/molecules/CoursesMolecule/CoursesMolecule";
import ButtonWithIcons from "@src/components/button/ButtonWithIcons";

interface LikeCoursesProps {
  courses: CoursesResponse[];
}

const LikeCourses: React.FC<LikeCoursesProps> = ({ courses }) => {
  const [progress, setProgress] = React.useState(0);
  const [slideToShow, setSlideToShow] = React.useState(3);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(3);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 650) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 650) {
      setSlideToShow(1);
    }
  };

  React.useEffect(() => {
    setSlides();
    window.addEventListener("resize", setSlides);

    return () => {
      window.removeEventListener("resize", setSlides);
    };
  }, []);

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current: number) => {
      setCurrentSlide(current);
      const totalSlides = courses.length;
      const progressPercentage =
        (100 / (totalSlides - slideToShow + 1)) * (current + 1);
      setProgress(progressPercentage);
    },
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.courseContainerHeading}>You might also like</h1>
      <Slider {...settings}>
        {courses?.map((course, index) => {
          return (
            <CoursesMolecule
              key={course.id}
              course={course}
              onClick={() => {}}
            />
          );
        })}
      </Slider>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <ButtonWithIcons label="View all courses" path="/courses" />
      </div>
    </div>
  );
};

export default LikeCourses;
