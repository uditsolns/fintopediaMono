import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./AchiveingSliderMolecule.module.css";

import NextArrow from "@src/app/components/NextArrow";
import PrevArrow from "@src/app/components/PrevArrow";
import ProfileCard from "./ProfileCard";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";

const AchiveingSliderMolecule = () => {
  const dispatch = useAppDispatch();

  const { course_review, loading } = useAppSelector(
    (state) => state.courseReviews
  );

  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(3);

  const setSlides = () => {
    const width = window.innerWidth;
    if (width <= 650) {
      setSlideToShow(1);
    } else if (width <= 1000) {
      setSlideToShow(2);
    } else if (width <= 1280) {
      setSlideToShow(3);
    } else {
      setSlideToShow(3);
    }
  };

  useEffect(() => {
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
    // autoplay: true,
    // autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => {
      const totalSlides = course_review.length;
      const totalSlidesToShow = slideToShow;
      const progressPercentage =
        (100 / (totalSlides - totalSlidesToShow + 1)) * (current + 1);
      setProgress(progressPercentage);
    },
  };

  return (
    <div className={styles.AchiveingLearningSlider}>
      <h1>
        See what others are <br />
        achieving through learning
      </h1>
      <div className="mt-4">
        <Slider {...settings}>
          {course_review.map((review, index) => (
            <ProfileCard key={index} review={review} />
          ))}
        </Slider>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AchiveingSliderMolecule;
