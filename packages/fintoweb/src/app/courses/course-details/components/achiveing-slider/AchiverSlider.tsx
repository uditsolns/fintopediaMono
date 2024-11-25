"use client";
import React, { useEffect, useState } from "react";
import styles from "./AchiverSlider.module.css";
import Slider from "react-slick";
import Image from "next/image";
import User from "../../../../../assets/userCircle.png";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { imageUrl } from "shared/src/config/imageUrl";
import { RenderStars } from "@src/components/render-star/RenderStar";

// const stocks = new Array(6).fill({
//   userName: "Priyam Sharma",
//   userDesignation: "Product Advisor",
//   userImage: User,
//   mainHeading: "Immersive Learning Experience!!",
//   subHeading: `Loved the explanation by Jyoti Ma'am, explained the concept clearly.`,
//   courseLink: "Basics of Stock Market",
// });
const AchiverSlider = () => {
  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(4);
  const { course_review, loading: courseReviewLoading } = useAppSelector(
    (state) => state.courseReviews
  );
  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(3);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 650) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 650) {
      setSlideToShow(1);
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
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,

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
    <div className={styles.AchiveingLearningSlider}>
      <h1>See what others are achieving through learning</h1>
      <div className="mt-4">
        <Slider {...settings}>
          {course_review.map((review, index) => (
            <div key={index}>
              <div className={styles.profileCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.userInfo}>
                    <Image
                      src={
                        review.user?.photo
                          ? `${imageUrl}/uploads/user_photo/${review.user.photo}`
                          : User
                      }
                      width={50}
                      height={50}
                      alt="User"
                      className={styles.userImage}
                    />
                    <div className={styles.userDetails}>
                      <h4 className={styles.userName}>
                        {" "}
                        {review.user?.surname_name}&nbsp;
                        {review.user?.first_name}
                      </h4>
                      <p
                        className={styles.userDesignation}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {RenderStars(review.course?.rating)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.subHeading}>
                    {/* {review?.review_description} */}
                    {review?.review_description.length > 150
                      ? `${review.review_description.slice(0, 150)}... `
                      : review.review_description}
                   
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AchiverSlider;
