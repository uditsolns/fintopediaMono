"use client";

import React from "react";
import styles from "./FeaturedCourses.module.css";
import NextArrow from "@src/app/components/NextArrow";
import PrevArrow from "@src/app/components/PrevArrow";
import Slider from "react-slick";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { CategoriesResponse } from "shared/src/utils/types/categories";
import CoursesMolecule from "@src/components/molecules/CoursesMolecule/CoursesMolecule";
import ButtonWithIcons from "@src/components/button/ButtonWithIcons";
import { createCourseCart } from "shared/src/provider/store/services/CourseCart.service";
import { useRouter } from "next/navigation";
import { isInCart } from "shared/src/components/atoms/Calculate";

interface FeaturedCoursesProps {
  courses: CoursesResponse[];
  categories: CategoriesResponse[];
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  courses,
  categories,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const { courseCart } = useAppSelector((state) => state.courseCart);

  const [progress, setProgress] = React.useState(0);
  const [slideToShow, setSlideToShow] = React.useState(3);
  const [categoriesSelected, setCategoriesSelected] = React.useState<
    number | string
  >("all");

  const [filterCourses, setFilterCourses] = React.useState<CoursesResponse[]>(
    courses?.length ? courses : []
  );
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
      const totalSlides = filterCourses.length;
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
  React.useEffect(() => {
    if (courses?.length) {
      setFilterCourses(courses);
    }
  }, [courses]);

  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.courseContainerHeading}>Featured Courses</h1>
      <div className={styles.categories}>
        <button
          className={`${styles.categoryButton} ${
            categoriesSelected === "all" ? styles.active : ""
          }`}
          onClick={() => {
            setCategoriesSelected("all");
            setFilterCourses(courses);
            setCurrentSlide(0);
            setProgress(0);
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryButton} ${
              categoriesSelected === cat.id ? styles.active : ""
            }`}
            onClick={() => {
              setCategoriesSelected(cat.id);
              let filterCourseRes = courses?.filter(
                (el) => el?.category_id == cat.id
              );
              setFilterCourses(filterCourseRes);
              setCurrentSlide(0);
              setProgress(0);
            }}
          >
            {cat.category_name}
          </button>
        ))}
      </div>
      <Slider key={categoriesSelected} {...settings}>
        {filterCourses?.map((course, index) => {
          return (
            <CoursesMolecule
              key={course.id}
              course={course}
              onClick={async () => {
                let params = {
                  user_id: Number(auth?.user?.id),
                  course_id: Number(course?.id),
                  status: "1",
                };
                if (isInCart(courseCart, course?.id)) {
                  router.push("/cart");
                } else {
                  await dispatch(
                    createCourseCart({
                      params,
                      onSuccess: (data) => {
                        router.push("/cart");
                      },
                      onError: (err) => {},
                    })
                  ).unwrap();
                }
              }}
            />
          );
        })}
      </Slider>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <ButtonWithIcons label="View all courses" path="/courses" />
      </div>
    </div>
  );
};

export default FeaturedCourses;
