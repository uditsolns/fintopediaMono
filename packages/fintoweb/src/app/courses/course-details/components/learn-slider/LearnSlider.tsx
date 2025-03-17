"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import styles from "./LearnSlider.module.css";
import NextArrow from "../../../../components/NextArrow";
import PrevArrow from "../../../../components/PrevArrow";

interface CardData {
  id: number;
  title: string;
  text: string;
  svg: JSX.Element;
}
const cardData: CardData[] = [
  {
    id: 1,
    title: "1 Year Access",
    text: "I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24 12.084C20.7032 9.12673 16.4288 7.4939 12 7.50002C9.896 7.50002 7.876 7.86002 6 8.52402V37.024C7.92724 36.3441 9.95633 35.9978 12 36C16.61 36 20.816 37.734 24 40.584M24 12.084C27.2967 9.12657 31.5712 7.49371 36 7.50002C38.104 7.50002 40.124 7.86002 42 8.52402V37.024C40.0728 36.3441 38.0437 35.9978 36 36C31.5712 35.9939 27.2968 37.6267 24 40.584M24 12.084V40.584"
          stroke="#F5FAFE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Certificate of completion",
    text: "I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M39 28.5V23.25C39 21.4598 38.2888 19.7429 37.023 18.477C35.7571 17.2112 34.0402 16.5 32.25 16.5H29.25C28.6533 16.5 28.081 16.2629 27.659 15.841C27.2371 15.419 27 14.8467 27 14.25V11.25C27 9.45979 26.2888 7.7429 25.023 6.47703C23.7571 5.21116 22.0402 4.5 20.25 4.5H16.5M16.5 30H31.5M16.5 36H24M21 4.5H11.25C10.008 4.5 9 5.508 9 6.75V41.25C9 42.492 10.008 43.5 11.25 43.5H36.75C37.992 43.5 39 42.492 39 41.25V22.5C39 17.7261 37.1036 13.1477 33.7279 9.77208C30.3523 6.39642 25.7739 4.5 21 4.5Z"
          stroke="#F1F8FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  // {
  //   id: 3,
  //   title: "Trading Strategies",
  //   text: "I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.",
  //   svg: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="48"
  //       height="48"
  //       viewBox="0 0 48 48"
  //       fill="none"
  //     >
  //       <path
  //         d="M5.66406 22.5347L42.2833 5.88086"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M35.4375 3.30273L42.2837 5.88201L39.7363 12.7282"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M36.4453 44.1985H43.406V22.4085C43.406 22.119 43.291 21.8412 43.0863 21.6364C43.0863 21.6363 43.0862 21.6362 43.0862 21.6362M36.4453 44.1985L43.0862 21.6362M36.4453 44.1985V22.4085C36.4453 22.119 36.5604 21.8412 36.765 21.6364M36.4453 44.1985L36.765 21.6364M43.0862 21.6362C42.8813 21.4314 42.6034 21.3164 42.3139 21.3164H37.5375C37.2479 21.3164 36.9701 21.4314 36.7652 21.6362C36.7651 21.6362 36.765 21.6363 36.765 21.6364M43.0862 21.6362L35.9453 22.4085C35.9453 21.9863 36.1131 21.5813 36.4115 21.2827L36.765 21.6364"
  //         stroke="white"
  //       />
  //       <path
  //         d="M27.4842 27.1839V44.1975H20.5234V27.1839C20.5234 26.8943 20.6385 26.6165 20.8433 26.4117L20.8433 26.4117C21.0481 26.2069 21.3259 26.0918 21.6156 26.0918H26.392C26.6817 26.0918 26.9595 26.2069 27.1642 26.4117L27.1643 26.4117C27.3691 26.6165 27.4842 26.8943 27.4842 27.1839Z"
  //         stroke="white"
  //       />
  //       <path
  //         d="M4.92143 31.189L4.92145 31.189C5.12627 30.9842 5.40405 30.8691 5.69371 30.8691H10.4701C10.7598 30.8691 11.0376 30.9842 11.2424 31.189L11.2424 31.1891C11.4472 31.3938 11.5623 31.6716 11.5623 31.9613V44.1984H4.60156V31.9613C4.60156 31.6716 4.71663 31.3938 4.92143 31.189Z"
  //         stroke="white"
  //       />
  //       <path
  //         d="M43.906 44.6985H35.9453V22.4085C35.9453 21.9863 36.1131 21.5813 36.4115 21.2827C36.7102 20.9842 37.1152 20.8164 37.5375 20.8164H42.3139C42.7361 20.8164 43.1412 20.9842 43.4398 21.2827C43.7382 21.5813 43.906 21.9863 43.906 22.4085V44.6985Z"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M27.9842 44.6975H20.0234V27.1839C20.0234 26.7617 20.1912 26.3567 20.4898 26.0581C20.7883 25.7595 21.1933 25.5918 21.6156 25.5918H26.392C26.8143 25.5918 27.2193 25.7595 27.5178 26.0581C27.8164 26.3567 27.9842 26.7617 27.9842 27.1839V44.6975Z"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M12.0623 44.6984H4.10156V31.9613C4.10156 31.539 4.26931 31.134 4.56789 30.8355C4.86648 30.5369 5.27144 30.3691 5.69371 30.3691H10.4701C10.8924 30.3691 11.2974 30.5369 11.5959 30.8355C11.8945 31.134 12.0623 31.539 12.0623 31.9613V44.6984Z"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   id: 4,
  //   title: "Trading Strategies",
  //   text: "I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.",
  //   svg: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="48"
  //       height="48"
  //       viewBox="0 0 48 48"
  //       fill="none"
  //     >
  //       <path
  //         d="M5.66406 22.5347L42.2833 5.88086"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M35.4375 3.30273L42.2837 5.88201L39.7363 12.7282"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M36.4453 44.1985H43.406V22.4085C43.406 22.119 43.291 21.8412 43.0863 21.6364C43.0863 21.6363 43.0862 21.6362 43.0862 21.6362M36.4453 44.1985L43.0862 21.6362M36.4453 44.1985V22.4085C36.4453 22.119 36.5604 21.8412 36.765 21.6364M36.4453 44.1985L36.765 21.6364M43.0862 21.6362C42.8813 21.4314 42.6034 21.3164 42.3139 21.3164H37.5375C37.2479 21.3164 36.9701 21.4314 36.7652 21.6362C36.7651 21.6362 36.765 21.6363 36.765 21.6364M43.0862 21.6362L35.9453 22.4085C35.9453 21.9863 36.1131 21.5813 36.4115 21.2827L36.765 21.6364"
  //         stroke="white"
  //       />
  //       <path
  //         d="M27.4842 27.1839V44.1975H20.5234V27.1839C20.5234 26.8943 20.6385 26.6165 20.8433 26.4117L20.8433 26.4117C21.0481 26.2069 21.3259 26.0918 21.6156 26.0918H26.392C26.6817 26.0918 26.9595 26.2069 27.1642 26.4117L27.1643 26.4117C27.3691 26.6165 27.4842 26.8943 27.4842 27.1839Z"
  //         stroke="white"
  //       />
  //       <path
  //         d="M4.92143 31.189L4.92145 31.189C5.12627 30.9842 5.40405 30.8691 5.69371 30.8691H10.4701C10.7598 30.8691 11.0376 30.9842 11.2424 31.189L11.2424 31.1891C11.4472 31.3938 11.5623 31.6716 11.5623 31.9613V44.1984H4.60156V31.9613C4.60156 31.6716 4.71663 31.3938 4.92143 31.189Z"
  //         stroke="white"
  //       />
  //       <path
  //         d="M43.906 44.6985H35.9453V22.4085C35.9453 21.9863 36.1131 21.5813 36.4115 21.2827C36.7102 20.9842 37.1152 20.8164 37.5375 20.8164H42.3139C42.7361 20.8164 43.1412 20.9842 43.4398 21.2827C43.7382 21.5813 43.906 21.9863 43.906 22.4085V44.6985Z"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M27.9842 44.6975H20.0234V27.1839C20.0234 26.7617 20.1912 26.3567 20.4898 26.0581C20.7883 25.7595 21.1933 25.5918 21.6156 25.5918H26.392C26.8143 25.5918 27.2193 25.7595 27.5178 26.0581C27.8164 26.3567 27.9842 26.7617 27.9842 27.1839V44.6975Z"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //       <path
  //         d="M12.0623 44.6984H4.10156V31.9613C4.10156 31.539 4.26931 31.134 4.56789 30.8355C4.86648 30.5369 5.27144 30.3691 5.69371 30.3691H10.4701C10.8924 30.3691 11.2974 30.5369 11.5959 30.8355C11.8945 31.134 12.0623 31.539 12.0623 31.9613V44.6984Z"
  //         stroke="white"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       />
  //     </svg>
  //   ),
  // },
];
const LearnSlider: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(3);

  // const setSlides = () => {
  //   if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
  //     setSlideToShow(3);
  //   } else if (window.innerWidth <= 1000 && window.innerWidth > 650) {
  //     setSlideToShow(2);
  //   } else if (window.innerWidth <= 650) {
  //     setSlideToShow(1);
  //   }
  // };
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
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current: number) => {
      const totalSlides = cardData.length;
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
    <div className={styles.sliderContainer}>
      <h3>What will you learn</h3>
      <Slider {...settings}>
        {cardData.map((card) => (
          <div key={card.id}>
            <Card className={styles.stockCard}>
              <CardBody>
                <div className={styles.stockCardSvg}>{card.svg}</div>
                <CardTitle className={styles.cardTitle}>{card.title}</CardTitle>
                <CardText className={styles.cardText}>{card.text}</CardText>
              </CardBody>
            </Card>
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
  );
};

export default LearnSlider;
