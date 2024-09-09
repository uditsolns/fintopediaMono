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
                  Enrolled in: <a href="">{card.courseLink}</a>
                </div>
              </div>
            </div>
          ))}
          {/* <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <div className={styles.userInfo}>
                <Image src={User} alt="User" className={styles.userImage} />
                <div className={styles.userDetails}>
                  <h4 className={styles.userName}>Priyam Sharma</h4>
                  <p className={styles.userDesignation}>Product Advisor</p>
                </div>
              </div>
              <div className={styles.companyLogo}>
                <Image src={Logo} alt="Company Logo" />
              </div>
            </div>
            <div className={styles.cardRating}>⭐⭐⭐⭐⭐</div>
            <div className={styles.cardBody}>
              <h3 className={styles.mainHeading}>
                Immersive Learning Experience!!
              </h3>
              <p className={styles.subHeading}>
                Online learning has completely transformed my educational
                experience. The flexibility to attend classes and complete
                assignments on my own schedule has been a game-changer for me.
                It's allowed me to balance my job and family commitments while
                pursuing my degree. I'm so grateful for the opportunity to learn
                this way!
              </p>
            </div>
            <div className={styles.cardLink}>
              Enrolled in: <a href="">Basics of Stock Market</a>
            </div>
          </div> */}
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
