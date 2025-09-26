"use client";

import React from "react";
import styles from "./FrequentlyBought.module.css";
import NextArrow from "@src/app/components/NextArrow";
import PrevArrow from "@src/app/components/PrevArrow";
import Slider from "react-slick";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { CoursesResponse } from "shared/src/utils/types/courses";
import CoursesMolecule from "@src/components/molecules/CoursesMolecule/CoursesMolecule";
import { createCourseCart } from "shared/src/provider/store/services/CourseCart.service";
import { useRouter } from "next/navigation";
import { isInCart } from "shared/src/components/atoms/Calculate";
import { toast } from "react-toastify";

interface FrequentlyBoughtProps {
  courses: CoursesResponse[];
  heading: string;
}

const FrequentlyBought: React.FC<FrequentlyBoughtProps> = ({
  courses,
  heading,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const { courseCart } = useAppSelector((state) => state.courseCart);
  const { singleCourse, loading: singleCourseLoading } = useAppSelector(
    (state) => state.courses
  );

  const [progress, setProgress] = React.useState(0);
  const [slideToShow, setSlideToShow] = React.useState(3);

  const [loadingCourseId, setLoadingCourseId] = React.useState<number | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [filterCourses, setFilterCourses] = React.useState<CoursesResponse[]>(
    []
  );
  React.useEffect(() => {
    if (courses?.length && singleCourse) {
      setFilterCourses(
        courses.filter(
          (course) => course.category_id === singleCourse.category_id
        )
      );
    } else {
      setFilterCourses([]);
    }
  }, [courses, singleCourse]);

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
        router.push("/contact-us");
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
    // try {
    //   await dispatch(
    //     createCourseCart({
    //       params,
    //       onSuccess: (data) => {
    //         toast.success(data.message, {
    //           position: "top-right",
    //           theme: "light",
    //         });
    //         router.push("/cart");
    //       },
    //       onError: (err) => {},
    //     })
    //   ).unwrap();
    // } finally {
    //   setLoadingCourseId(null);
    // }
  };

  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.courseContainerHeading}>{heading}</h1>
      <Slider {...settings}>
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
    </div>
  );
};

export default FrequentlyBought;
