"use client";
import React, { useEffect, useState } from "react";
import styles from "./AchiverSlider.module.css";
import Slider from "react-slick";
import Image from "next/image";
import User from "../../../../../assets/userCircle.png";

const stocks = new Array(6).fill({
  userName: "Priyam Sharma",
  userDesignation: "Product Advisor",
  userImage: User,
  mainHeading: "Immersive Learning Experience!!",
  subHeading: `Loved the explanation by Jyoti Ma'am, explained the concept clearly.`,
  courseLink: "Basics of Stock Market",
});
const AchiverSlider = () => {
  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(4);

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
          {stocks.map((card, index) => (
            <div key={index}>
              <div className={styles.profileCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.userInfo}>
                    <Image
                      src={card.userImage}
                      alt="User"
                      className={styles.userImage}
                    />
                    <div className={styles.userDetails}>
                      <h4 className={styles.userName}>{card.userName}</h4>
                      <p className={styles.userDesignation}>⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.subHeading}>{card.subHeading}</p>
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
