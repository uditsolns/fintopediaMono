"use client";

import React from "react";
import Slider from "react-slick";
import styles from "./FeaturesCourseSlider.module.css";
import HorizontalCardMolecule from "@src/components/molecules/HorizontalCardMolecule/HorizontalCardMolecule";
import { CoursesResponse } from "shared/src/utils/types/courses";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";
import { createCourseCart } from "shared/src/provider/store/services/CourseCart.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { isInCart } from "shared/src/components/atoms/Calculate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FeaturesCourseSliderProps {
  courses: CoursesResponse[];
}
const FeaturesCourseSlider: React.FC<FeaturesCourseSliderProps> = ({
  courses = [],
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const { courseCart } = useAppSelector((state) => state.courseCart);

  const [loadingCourseId, setLoadingCourseId] = React.useState<number | null>(
    null
  );
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    draggable: true, 
    swipeToSlide: true,
    touchMove: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    <div className={styles.sliderContainer}>
      <h1>Featured Courses</h1>
      {courses.length > 0 ? (
        <Slider {...settings}>
          {courses
            .filter((course) => course.is_popular === 1)
            .map((course) => (
              <HorizontalCardMolecule
                key={course.id}
                course={course}
                loading={loadingCourseId === course.id}
                onClick={() => handleCourseClick(course)}
              />
            ))}
        </Slider>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default FeaturesCourseSlider;
