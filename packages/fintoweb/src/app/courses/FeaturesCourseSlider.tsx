"use client";

import React from "react";
import Slider from "react-slick";
import styles from "./FeaturesCourseSlider.module.css";
import HorizontalCardMolecule from "@src/components/molecules/HorizontalCardMolecule/HorizontalCardMolecule";
import { CoursesResponse } from "shared/src/utils/types/courses";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";

interface FeaturesCourseSliderProps {
  courses: CoursesResponse[];
}
const FeaturesCourseSlider: React.FC<FeaturesCourseSliderProps> = ({
  courses = [],
}) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <h1>Featured Courses</h1>
      {courses.length > 0 ? (
        <Slider {...settings}>
          {courses.map((course) => (
            <HorizontalCardMolecule
              key={course.id}
              course={course}
              onClick={() => {}}
            />
          ))}
        </Slider>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default FeaturesCourseSlider;
