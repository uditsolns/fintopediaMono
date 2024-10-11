"use client";

import React from "react";
import styles from "./FeaturedCourses.module.css";
import NextArrow from "@src/app/components/NextArrow";
import PrevArrow from "@src/app/components/PrevArrow";
import Slider from "react-slick";
import { useAppDispatch } from "shared/src/provider/store/types/storeTypes";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { CategoriesResponse } from "shared/src/utils/types/categories";
import CoursesMolecule from "@src/components/molecules/CoursesMolecule/CoursesMolecule";

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

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category_id === selectedCategory)
    : courses;

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
    setCurrentSlide(0); 
  };
  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.courseContainerHeading}>Featured Courses</h1>
      <div className={styles.categories}>
        <button
          className={`${styles.categoryButton} ${
            selectedCategory === null ? styles.active : ""
          }`}
          onClick={() => handleCategoryChange(null)}
        >
          All
        </button>
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
        {filteredCourses.map((course, index) => {
          return <CoursesMolecule course={course} onClick={() => {}} />;
        })}
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
