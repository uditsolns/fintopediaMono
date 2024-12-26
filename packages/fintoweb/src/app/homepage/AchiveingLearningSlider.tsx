"use client";
import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import Slider from "react-slick";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";
import Image from "next/image";
import User from "../../assets/userCircle.png";
import Logo from "../../assets/meta.png";

const stocks = new Array(9).fill({
  userName: "Priyam Sharma",
  userDesignation: "Product Advisor",
  companyLogo: Logo,
  userImage: User,
  mainHeading: "Immersive Learning Experience!!",
  subHeading: `Online learning has completely transformed my educational 
               experience. The flexibility to attend classes and complete 
               assignments on my own schedule has been a game-changer for me. 
               It's allowed me to balance my job and family commitments while 
               pursuing my degree. I'm so grateful for the opportunity to learn 
               this way!`,
  courseLink: "Basics of Stock Market",
});
const AchiveingLearningSlider = () => {
  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(3);

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
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current: number) => {
      const totalSlides = stocks.length;
      const totalSlidesToShow = slideToShow;
      const progressPercentage =
        (100 / (totalSlides - totalSlidesToShow + 1)) * (current + 1);
      setProgress(progressPercentage);
      console.log(totalSlidesToShow); // Ensure to use correct variable
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
    <div className={styles.AchiveingLearningSlider}>
      <h1>
        See what others are <br />
        achieving through learning
      </h1>
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
                      <p className={styles.userDesignation}>
                        {card.userDesignation}
                      </p>
                    </div>
                  </div>
                  <div className={styles.companyLogo}>
                    <Image src={card.companyLogo} alt="Company Logo" />
                  </div>
                </div>
                <div className={styles.cardRating}>⭐⭐⭐⭐⭐</div>
                <div className={styles.cardBody}>
                  <h3 className={styles.mainHeading}>{card.mainHeading}</h3>
                  <p className={styles.subHeading}>{card.subHeading}</p>
                </div>
                <div className={styles.cardLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M3.95317 17.7625C7.39028 18.2287 10.553 19.8918 12.8851 22.4593C15.2172 19.8918 18.3799 18.2287 21.817 17.7625C22.2082 17.7192 22.5696 17.5326 22.8312 17.2385C23.0929 16.9445 23.2364 16.564 23.234 16.1704V3.35362C23.234 3.12572 23.185 2.90049 23.0905 2.69314C22.9959 2.4858 22.8579 2.30117 22.6858 2.15174C22.5138 2.00231 22.3116 1.89156 22.0931 1.82698C21.8745 1.7624 21.6446 1.74549 21.419 1.7774C18.1323 2.32288 15.1257 3.96083 12.8851 6.42646C10.6445 3.96083 7.63785 2.32288 4.3512 1.7774C4.12555 1.74549 3.89568 1.7624 3.67713 1.82698C3.45857 1.89156 3.25643 2.00231 3.08436 2.15174C2.91229 2.30117 2.7743 2.4858 2.67973 2.69314C2.58516 2.90049 2.5362 3.12572 2.53616 3.35362V16.1704C2.53377 16.564 2.67727 16.9445 2.93895 17.2385C3.20063 17.5326 3.56195 17.7192 3.95317 17.7625Z"
                      fill="white"
                    />
                    <path
                      d="M12.8851 22.4593C10.553 19.8918 7.39028 18.2287 3.95317 17.7625C3.56195 17.7192 3.20063 17.5326 2.93895 17.2385C2.67727 16.9445 2.53377 16.564 2.53616 16.1704V3.35362C2.5362 3.12572 2.58516 2.90049 2.67973 2.69314C2.7743 2.4858 2.91229 2.30117 3.08436 2.15174C3.25643 2.00231 3.45857 1.89156 3.67713 1.82698C3.89568 1.7624 4.12555 1.74549 4.3512 1.7774C7.63785 2.32288 10.6445 3.96083 12.8851 6.42646V22.4593Z"
                      stroke="url(#paint0_linear_4183_4417)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.8848 22.4593C15.2169 19.8918 18.3796 18.2287 21.8167 17.7625C22.2079 17.7192 22.5692 17.5326 22.8309 17.2385C23.0926 16.9445 23.2361 16.564 23.2337 16.1704V3.35362C23.2337 3.12572 23.1847 2.90049 23.0901 2.69314C22.9956 2.4858 22.8576 2.30117 22.6855 2.15174C22.5134 2.00231 22.3113 1.89156 22.0927 1.82698C21.8742 1.7624 21.6443 1.74549 21.4187 1.7774C18.132 2.32288 15.1254 3.96083 12.8848 6.42646V22.4593Z"
                      stroke="url(#paint1_linear_4183_4417)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_4183_4417"
                        x1="17.0534"
                        y1="2.00238"
                        x2="1.32942"
                        y2="2.64714"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#717171" />
                        <stop offset="1" stop-color="#0D0D0C" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_4183_4417"
                        x1="27.4021"
                        y1="2.00238"
                        x2="11.6781"
                        y2="2.64714"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#717171" />
                        <stop offset="1" stop-color="#0D0D0C" />
                      </linearGradient>
                    </defs>
                  </svg>{" "}&nbsp;
                  Enrolled in: <a href="">{card.courseLink}</a>
                </div>
              </div>
            </div>
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

export default AchiveingLearningSlider;
