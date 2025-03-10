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
import { toast } from "react-toastify";

interface FeaturedCoursesProps {
  courses: CoursesResponse[];
  categories: CategoriesResponse[];
  label: string;
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  courses,
  categories,
  label,
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
  const [loadingCourseId, setLoadingCourseId] = React.useState<number | null>(
    null
  );
  const [filterCourses, setFilterCourses] = React.useState<CoursesResponse[]>(
    courses?.length ? courses.filter((course) => course.is_popular === 1) : []
  );
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
    autoplay: true, 
    autoplaySpeed: 3000, 
    pauseOnHover: true, 
    
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
      setFilterCourses(courses.filter((course) => course.is_popular === 1));
    }
  }, [courses]);
  const handleCourseClick = async (course: CoursesResponse) => {
    setLoadingCourseId(course.id);
    if (!auth?.token) {
      router.push("/auth/login");
      setLoadingCourseId(null);
      return;
    }
    if (isInCart(courseCart, course?.id)) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/cart");
      } finally {
        setLoadingCourseId(null);
      }
      return;
    }
    const params = {
      user_id: Number(auth?.user?.id),
      course_id: Number(course?.id),
      status: "1",
    };
    try {
      await dispatch(
        createCourseCart({
          params,
          onSuccess: (data) => {
            toast.success(data.message, {
              position: "top-right",
              theme: "light",
            });
            router.push("/cart");
          },
          onError: (err) => {},
        })
      ).unwrap();
    } finally {
      setLoadingCourseId(null);
    }
  };

  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.courseContainerHeading}>{label}</h1>
      <div className={styles.categories}>
        <button
          className={`${styles.categoryButton} ${
            categoriesSelected === "all" ? styles.active : ""
          }`}
          onClick={() => {
            setCategoriesSelected("all");
            setFilterCourses(
              courses.filter((course) => course.is_popular === 1)
            );
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
              let filterCourseRes = courses.filter(
                (el) => el.category_id == cat.id && el.is_popular === 1
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
              loading={loadingCourseId === course.id}
              onClick={() => handleCourseClick(course)}
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
