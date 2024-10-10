"use client";

import React from "react";
import styles from "./FeaturedCourses.module.css";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { TbAntennaBars1 } from "react-icons/tb";
import { FaClock } from "react-icons/fa";
import NextArrow from "@src/app/components/NextArrow";
import PrevArrow from "@src/app/components/PrevArrow";
import Slider from "react-slick";
import { useAppDispatch } from "shared/src/provider/store/types/storeTypes";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { CategoriesResponse } from "shared/src/utils/types/categories";

interface FeaturedCoursesProps {
  courses: CoursesResponse[];
  categories: CategoriesResponse[];
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  courses,
  categories,
}) => {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = React.useState(0);
  const [slideToShow, setSlideToShow] = React.useState(3);
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = React.useState(0);
  console.log("currentSlide", currentSlide);

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category_id === selectedCategory)
    : courses;
  // console.log("filteredCourses", filteredCourses);
  // console.log("selectedCategory", selectedCategory);

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
      const totalSlides = filteredCourses.length;
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
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentSlide(0); // Reset to the first slide when changing categories
  };
  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.courseContainerHeading}>Featured Courses</h1>
      <div className={styles.categories}>
        {/* <button
          className={`${styles.categoryButton} ${
            selectedCategory === null ? styles.active : ""
          }`}
          onClick={() => handleCategoryChange(null)}
        >
          All
        </button> */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryButton} ${
              selectedCategory === cat.id ? styles.active : ""
            }`}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
            }
          >
            {cat.category_name}
          </button>
        ))}
      </div>
      <Slider {...settings}>
        {filteredCourses.map((course) => (
          <div key={course.id}>
            <Card className={styles.card}>
              <CardImg
                top
                width="100%"
                src={course.course_image}
                alt={course.name}
                className={styles.cardImage}
              />
              <CardBody className={styles.cardContent}>
                <CardTitle tag="h3" className={styles.cardTitle}>
                  {course.name}
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
                  <h6>4.3</h6>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                  >
                    <path
                      d="M0.507883 5.45225C0.3669 5.34722 0.262323 5.20071 0.208815 5.03325C0.155305 4.86579 0.155546 4.68578 0.209506 4.51846C0.263466 4.35114 0.368438 4.20491 0.509702 4.10026C0.650966 3.99562 0.821438 3.9378 0.997217 3.93493L4.41118 3.80596C4.42797 3.8048 4.44406 3.79881 4.45752 3.78872C4.47098 3.77862 4.48123 3.76485 4.48705 3.74906L5.66676 0.562696C5.72604 0.400585 5.83369 0.260604 5.97515 0.161705C6.11662 0.0628059 6.28506 0.00976563 6.45766 0.00976562C6.63027 0.00976562 6.79871 0.0628059 6.94017 0.161705C7.08164 0.260604 7.18929 0.400585 7.24857 0.562696L8.42449 3.76044C8.4303 3.77623 8.44055 3.79 8.45401 3.8001C8.46747 3.81019 8.48357 3.81618 8.50035 3.81734L11.9143 3.94631C12.0901 3.94918 12.2606 4.007 12.4018 4.11164C12.5431 4.21629 12.6481 4.36252 12.702 4.52984C12.756 4.69716 12.7562 4.87717 12.7027 5.04463C12.6492 5.21209 12.5446 5.3586 12.4037 5.46363L9.72559 7.56891C9.71218 7.57946 9.70217 7.5937 9.69677 7.60988C9.69138 7.62606 9.69085 7.64347 9.69524 7.65995L10.617 10.926C10.6648 11.0923 10.6601 11.2693 10.6038 11.4329C10.5474 11.5965 10.4419 11.7387 10.3018 11.8403C10.1617 11.9418 9.99376 11.9977 9.82074 12.0004C9.64772 12.0031 9.47808 11.9525 9.33488 11.8553L6.50508 9.95868C6.49114 9.94906 6.4746 9.9439 6.45766 9.9439C6.44072 9.9439 6.42419 9.94906 6.41025 9.95868L3.58045 11.8553C3.43919 11.9558 3.27015 12.0098 3.09681 12.0098C2.92346 12.0098 2.75442 11.9558 2.61316 11.8553C2.47302 11.7547 2.3675 11.6132 2.31112 11.4501C2.25474 11.2871 2.25027 11.1106 2.29832 10.9449L3.22767 7.66753C3.2326 7.65108 3.23233 7.63351 3.2269 7.61722C3.22146 7.60092 3.21114 7.5867 3.19733 7.57649L0.507883 5.45225Z"
                      fill="#FFA11A"
                    />
                  </svg>
                  <p>(1000 Reviews)</p>
                </div>
                <div className={styles.priceContainer}>
                  <h3>&#8377;{course.sale_price}</h3>{" "}
                  <s>&#8377;{course.actual_price}</s>
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
      <div className="buttonStyles">
        <button>View all courses</button>
      </div>
    </div>
  );
};

export default FeaturedCourses;
