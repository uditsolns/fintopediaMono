import React, { useEffect, useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import styles from "./Homepage.module.css";
import Slider from "react-slick";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";
import Blog1 from "../../assets/blogs/Blog1.png";
import Blog2 from "../../assets/blogs/Blog2.png";
import Blog3 from "../../assets/blogs/Blog3.png";
import Blog4 from "../../assets/blogs/Blog4.png";
import Image from "next/image";

const stocks = [
  {
    id: 1,
    image: Blog1,
    title: "Mastering Option Trading",
    description:
      "Explore key strategies and concepts to enhance your option trading skills. Gain insights from expert Jyoti Budhia.Lorem ispum",
    rating: 4.6,
    reviews: 1000,
    price: 5000,
    originalPrice: 6000,
  },
  {
    id: 2,
    image: Blog2,
    title: "Decoding Market Trends in Market",
    description:
      "Stay ahead with the latest market analysis and trend predictions. Learn how to make informed trading decisions.",
    rating: 4.8,
    reviews: 1500,
    price: 4500,
    originalPrice: 5500,
  },
  {
    id: 3,
    image: Blog3,
    title: "Leveraging Trading Technology",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 4,
    image: Blog4,
    title: "Fundamental Analysis for Traders",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
];

const BlogsSlider: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(4);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(4);
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
      console.log(totalSlidesToShow);
    },
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
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
    <div className={styles.blogsContainer}>
      <h2>Blogs</h2>
      <Slider {...settings}>
        {stocks.map((stock) => (
          <div key={stock.id}>
            <Card className={styles.blogsCard}>
              <Image
                src={stock.image}
                alt={stock.title}
                className={styles.blogsCardImage}
              />
              <CardBody className={styles.blogsCardContent}>
                <p>Options Trading</p>
                <CardTitle tag="h3" className={styles.blogsCardTitle}>
                  {stock.title}
                </CardTitle>
                <div className={styles.blogsCardText}>
                  <p>{stock.description}</p>
                </div>
                <div className={styles.blogsFooter}>
                  <p>28th March 2023 . 4 mins</p>
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
        <button>View all Blogs</button>
      </div>
    </div>
  );
};

export default BlogsSlider;
