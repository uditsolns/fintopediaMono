"use client";

import React, { useEffect, useState } from "react";
import styles from "./Courses.module.css";
import { Col, Row } from "reactstrap";
import Slider from "react-slick";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";
import FeaturesCourseSlider from "./FeaturesCourseSlider";
import AchiveingLearningSlider from "../homepage/AchiveingLearningSlider";
import CoursepageMolecule from "@src/components/molecules/CoursepageMolecule/CoursepageMolecule";
import { getCourses } from "shared/src/provider/store/services/courses.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { getCategories } from "shared/src/provider/store/services/categories.service";
import ButtonWithIcons from "@src/components/button/ButtonWithIcons";
import {
  createCourseCart,
  getCourseCart,
} from "shared/src/provider/store/services/CourseCart.service";
import { isInCart } from "shared/src/components/atoms/Calculate";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CourseFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const { courseCart, loading: courseCartLoading } = useAppSelector(
    (state) => state.courseCart
  );
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const [loadingCourseId, setLoadingCourseId] = React.useState<number | null>(
    null
  );
  const [slideToShow, setSlideToShow] = useState(4);
  const [activeFilter, setActiveFilter] = useState("All");

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(3);
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
  React.useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategories());
    dispatch(getCourseCart());
  }, []);

  const filteredCourses = courses.filter(
    (course) => activeFilter === "All" || course.course_type === activeFilter
  );
  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
  const [filter, setFilter] = useState({
    name: "",
    sale_price: "",
    category_name: "",
    course_language: "",
  });

  const languages = ["English"];
  const handleFilter = () => {
    // dispatch(creat)
  };
  return (
    <>
      {coursesLoading?.courses || categoriesLoading?.categories ? (
        <div className={styles.loadingContainer}>
          <div className="fullPageLoading">
            <LoadingAtom
              style={{
                height: "5rem",
                width: "5rem",
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.headerCourseFilter}>
            <div className={styles.headerContentsCourseFilter}>
              <h2>Investing & Trading Courses</h2>
              <p>
                Master the art of investing and trading, from beginner to
                advanced levels, in stocks, mutual funds, bonds, options, forex,
                and cryptocurrencies. Build your financial acumen through
                project-driven courses, and gain valuable skills by selecting
                courses from top platforms like NPTEL, Coursera, Udacity, Edx,
                CFA Institute, NYIF, and MIT. Compare and read reviews to find
                the best course for your investment and trading journey.
              </p>
            </div>
            <div className={styles.formContainer}>
              <div className="form">
                <h2>
                  Don’t know where to
                  <br /> start?
                </h2>
                <p>
                  Create screens directly in Method or add your images from
                  Sketch or Figma. You can even sync designs from your cloud
                  storage!
                </p>
                <div className="form">
                  {/* <Row className="form-group mt-3">
                    <Col md={12}>
                      <div className="custom-select">
                        <select
                          id="categorySelect"
                          className={`${styles.textfield} form-control`}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.category_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                  </Row> */}
                  <Row className="mt-3">
                    <Col md={12}>
                      <ButtonWithIcons
                        label="Let's Go"
                        path="/where-to-start"
                        width="100%"
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.courseContainer}>
            <div className={styles.courseFilterHeader}>
              <div className={styles.filterButtons}>
                {["All", "Beginner", "Intermediate", "Expert"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`${styles.filterButton} ${
                      activeFilter === type ? styles.activeFilter : ""
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <Slider key={activeFilter} {...settings}>
              {filteredCourses.map((course) => (
                <CoursepageMolecule
                  key={course.id}
                  course={course}
                  loading={loadingCourseId === course.id}
                  onClick={() => handleCourseClick(course)}
                />
              ))}
            </Slider>
          </div>
          <div className={styles.featureCourses}>
            <FeaturesCourseSlider courses={courses} />
          </div>
          <div className={styles.tradingCourses}>
            <h1>All Investing & Trading Courses</h1>
            <div className={styles.tradingCoursesListing}>
              <div className="filter">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={filter.name}
                  onChange={(e) =>
                    setFilter({ ...filter, name: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Search by sale price"
                  value={filter.sale_price}
                  onChange={(e) =>
                    setFilter({ ...filter, sale_price: e.target.value })
                  }
                />

                <select
                  value={filter.category_name}
                  onChange={(e) =>
                    setFilter({ ...filter, category_name: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                </select>

                <select
                  value={filter.course_language}
                  onChange={(e) =>
                    setFilter({ ...filter, course_language: e.target.value })
                  }
                >
                  <option value="">Select Language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>

                <button onClick={handleFilter}>Filter</button>
              </div>

              <Row className="mt-3">
                {courses.map((course) => {
                  return (
                    <Col md={4}>
                      <CoursepageMolecule
                        key={course.id}
                        course={course}
                        loading={loadingCourseId === course.id}
                        onClick={() => handleCourseClick(course)}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
          <AchiveingLearningSlider />
        </>
      )}
    </>
  );
};

export default CourseFilter;
