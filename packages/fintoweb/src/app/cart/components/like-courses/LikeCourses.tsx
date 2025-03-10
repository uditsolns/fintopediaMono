"use client";

import React from "react";
import styles from "./LikeCourses.module.css";
import NextArrow from "@src/app/components/NextArrow";
import PrevArrow from "@src/app/components/PrevArrow";
import Slider from "react-slick";
import { CoursesResponse } from "shared/src/utils/types/courses";
import CoursesMolecule from "@src/components/molecules/CoursesMolecule/CoursesMolecule";
import ButtonWithIcons from "@src/components/button/ButtonWithIcons";
import { createCourseCart } from "shared/src/provider/store/services/CourseCart.service";
import { isInCart } from "shared/src/components/atoms/Calculate";
import { useRouter } from "next/navigation";
import {
  useAppSelector,
  useAppDispatch,
} from "shared/src/provider/store/types/storeTypes";
import { toast } from "react-toastify";
import { LikeCoursesResponse } from "shared/src/utils/types/course-like";

interface LikeCoursesProps {
  courses: LikeCoursesResponse[];
}

const LikeCourses: React.FC<LikeCoursesProps> = ({ courses }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [progress, setProgress] = React.useState(0);
  const [slideToShow, setSlideToShow] = React.useState(3);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const { courseCart, loading: courseCartLoading } = useAppSelector(
    (state) => state.courseCart
  );
  const { auth } = useAppSelector((state) => state.auth);
  const [loadingCourseId, setLoadingCourseId] = React.useState<number | null>(
    null
  );

  
  const setSlides = () => {
    const width = window.innerWidth;

    if (width <= 650) {
      setSlideToShow(1); // For mobile view
    } else if (width <= 1000) {
      setSlideToShow(2); // For tablet view
    } else if (width <= 1280) {
      setSlideToShow(3); // For smaller desktops
    } else {
      setSlideToShow(3); // For larger desktops
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
      const totalSlides = courses.length;
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
  const handleCourseClick = async (course: LikeCoursesResponse) => {
    setLoadingCourseId(course.course_id);
    if (!auth?.token) {
      router.push("/auth/login");
      setLoadingCourseId(null);
      return;
    }
    if (isInCart(courseCart, course?.course_id)) {
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
      course_id: Number(course?.course_id),
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
      <h1 className={styles.courseContainerHeading}>You might also like</h1>
      <Slider {...settings}>
        {courses?.map((course, index) => {
          return (
            <CoursesMolecule
              key={course.id}
              course={course?.course}
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

export default LikeCourses;
