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
import { postSeachCourses } from "shared/src/provider/store/services/search-courses.service";
import Pagination from "@src/components/pagination/Pagination";
import { getCourseReviews } from "shared/src/provider/store/services/course-review.service";
import AchiveingSliderMolecule from "@src/components/molecules/AchiveingSliderMolecule/AchiveingSliderMolecule";
import { getCoursesgetPurchase } from "shared/src/provider/store/services/coursesget-purchase.service";

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
  const { search_courses, loading: search_courses_loading } = useAppSelector(
    (state) => state.searchCourses
  );
  const { course_review, loading: coursesReviewLoading } = useAppSelector(
    (state) => state.courseReviews
  );
  const { courseget_purchase, loading: coursesgetPurchaseLoading } =
    useAppSelector((state) => state.coursesgetPurchase);
  console.log("🚀 ~ page ~ courseget_purchase course:", courseget_purchase);
  const [searchTerm, setSearchTerm] = useState("");
  const [slideToShow, setSlideToShow] = useState(4);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const setSlides = () => {
    const width = window.innerWidth;
    if (width <= 650) {
      setSlideToShow(1);
    } else if (width <= 1000) {
      setSlideToShow(4);
    } else if (width <= 1280) {
      setSlideToShow(4);
    } else {
      setSlideToShow(4);
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
    if (auth?.token) {
      dispatch(getCourseCart());
      dispatch(getCoursesgetPurchase());
    }
    dispatch(getCourses());
    dispatch(getCategories());
    dispatch(getCourseReviews());
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
    // autoplay: true,
    // autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          slidesToShow: 4,
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
    sort_rating: "",
  });
  console.log("filter", filter);
  const languages = ["English"];
  const ratingArr = [
    { id: 1, rating: "Low to high", value: "asc" },
    { id: 2, rating: "High to low", value: "desc" },
  ];
  const priceArr = [
    { id: 1, price: "0 - 4000", price_level: "Rs. 0 - Rs. 4000" },
    { id: 2, price: "4000 - 8000", price_level: "Rs. 4000 - Rs. 8000" },
    { id: 3, price: "8000 - 12000", price_level: "Rs. 8000 - Rs. 12000" },
    { id: 4, price: "12000 - 100000", price_level: "Rs. 12000 and Above" },
  ];
  const handleFilter = () => {
    let [minSal, maxSal] = filter?.sale_price
      ? filter?.sale_price.split(" - ").map(Number) || []
      : [];
    let params = {
      name: "",
      sale_price: "",
      min_sale_price: minSal || "",
      max_sale_price: maxSal || "",
      category_name: filter?.category_name || "",
      course_language: "",
      sort_rating: filter?.sort_rating || "",
    };
    console.log("params", params);
    dispatch(
      postSeachCourses({
        params,
        onSuccess(data) {
          console.log(data);
        },
        onError(error) {
          console.log(error);
        },
      })
    );
  };
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = (
    search_courses.length > 0 ? search_courses : search_courses
  ).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (search_courses.length > 0
      ? search_courses.length
      : search_courses.length) / itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  React.useEffect(() => {
    let params = {
      name: "",
      sale_price: "",
      category_name: "",
      min_sale_price: "",
      max_sale_price: "",
      course_language: "",
      sort_rating: "",
    };
    dispatch(
      postSeachCourses({
        params,
        onSuccess(data) {},
        onError(error) {
          console.log(error);
        },
      })
    );
  }, []);
  return (
    <>
      {coursesLoading?.courses ||
      categoriesLoading?.categories ||
      coursesReviewLoading?.course_review ||
      courseCartLoading?.courseCart ? (
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
                  <Row className="mt-5">
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
            <div className="row mb-3">
              <div className="col-md-6">
                <h1>All Investing & Trading Courses</h1>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Search by name"
                  className={`${styles.textfield} form-control`}
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.tradingCoursesListing}>
              <div className={styles.filter}>
                <select
                  value={filter.sale_price}
                  className={`${styles.textfield} form-control`}
                  onChange={(e) =>
                    setFilter({ ...filter, sale_price: e.target.value })
                  }
                >
                  <option value="">Filter by price</option>
                  {priceArr.map((price) => (
                    <option key={price.id} value={price.price}>
                      {price.price_level}
                    </option>
                  ))}
                </select>
                <select
                  value={filter.category_name}
                  className={`${styles.textfield} form-control`}
                  onChange={(e) =>
                    setFilter({ ...filter, category_name: e.target.value })
                  }
                >
                  <option value="">Filter by category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
                <select
                  value={filter.sort_rating}
                  className={`${styles.textfield} form-control`}
                  onChange={(e) =>
                    setFilter({ ...filter, sort_rating: e.target.value })
                  }
                >
                  <option value={""}>Sort by rating</option>
                  {ratingArr.map((rate) => (
                    <option key={rate.id} value={rate.value}>
                      {rate.rating}
                    </option>
                  ))}
                </select>
                <button onClick={handleFilter} className={styles.searchButton}>
                  Filter
                </button>
              </div>

              <Row className="mt-3">
                {search_courses_loading?.search_courses ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "25vh" }}
                  >
                    <LoadingAtom />
                  </div>
                ) : null}

                {!search_courses_loading?.search_courses &&
                  currentCourses
                    ?.filter((course) =>
                      course.name
                        .trim()
                        .toLowerCase()
                        .includes(searchTerm.trim().toLowerCase())
                    )
                    ?.map((course) => (
                      <Col md={4} key={course.id}>
                        <CoursepageMolecule
                          course={course}
                          loading={loadingCourseId === course.id}
                          onClick={() => handleCourseClick(course)}
                        />
                      </Col>
                    ))}
              </Row>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          <AchiveingSliderMolecule />
        </>
      )}
    </>
  );
};

export default CourseFilter;
