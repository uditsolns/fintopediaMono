"use client";

import React, { useEffect, useState } from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import styles from "./Homepage.module.css";
import { TbAntennaBars1 } from "react-icons/tb";
import { FaClock, FaStar } from "react-icons/fa";
import Slider from "react-slick";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";

const stocks = [
  {
    id: 1,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company A.",
    rating: 4.6,
    reviews: 1000,
    price: 5000,
    originalPrice: 6000,
  },
  {
    id: 2,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Mastering of Money Management",
    description: "A brief description of Company B.",
    rating: 4.8,
    reviews: 1500,
    price: 4500,
    originalPrice: 5500,
  },
  {
    id: 3,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company C.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 4,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company C.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 5,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company C.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
];

const FeaturedCourses: React.FC = () => {
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
    <div className={styles.courseContainer}>
      <Slider {...settings}>
        {stocks.map((stock) => (
          <div key={stock.id}>
            <Card className={styles.card}>
              <CardImg
                top
                width="100%"
                src={stock.imageSrc}
                alt={stock.title}
                className={styles.cardImage}
              />
              <CardBody className={styles.cardContent}>
                <CardTitle tag="h3" className={styles.cardTitle}>
                  {stock.title}
                </CardTitle>
                <div className={styles.iconRow}>
                  <div className={styles.iconText}>
                    <TbAntennaBars1 className={styles.icon} /> Beginner
                  </div>
                  <div className={styles.iconText}>
                    <FaClock className={styles.icon} /> 20 Hours
                  </div>
                </div>
                <div className={styles.cardRating}>
                  {stock.rating} <FaStar className={styles.icon} /> (
                  {stock.reviews} reviews)
                </div>
                <div className={styles.priceContainer}>
                  <h3>&#8377;{stock.price}</h3>{" "}
                  <s>&#8377;{stock.originalPrice}</s>
                  <button className={styles.addToCartButton}>
                    Add to Cart
                  </button>
                </div>
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
      <div className={styles.viewAllCourses}>
        <button>View all courses</button>
      </div>
    </div>
  );
};

export default FeaturedCourses;
