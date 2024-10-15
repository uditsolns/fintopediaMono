"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Courses.module.css";
import Back from "../../assets/whereto-start.png";
import { FaArrowRight, FaClock, FaStar } from "react-icons/fa";
import {
  Button,
  Col,
  InputGroup,
  Row,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Label,
} from "reactstrap";
import { ErrorMessage, Form, Field, Formik, FormikHelpers } from "formik";
import CustomSelect from "@src/custom/CustomSelect";
import { TbAntennaBars1 } from "react-icons/tb";
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
import CircularLoading from "@src/components/loader/LoadingAtom";

interface RegisterFormValues {
  college_id: string;
}
const CourseFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const handleSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    const register = {
      college_id: values.college_id,
    };
    setSubmitting(false);
  };
  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(4);

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
  }, []);
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
  return (
    <>
      {coursesLoading?.courses ? (
        <div className={styles.loadingContainer}>
          <div className="fullPageLoading">
            <CircularLoading
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
                <Formik
                  initialValues={{
                    college_id: "",
                    level: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="mt-3">
                      <Row className="form-group mt-3">
                        <Col md={12}>
                          <InputGroup>
                            <Field
                              component={CustomSelect}
                              name="college_id"
                              id="college_id"
                              className={`${styles.textfield} form-control ${
                                errors.college_id && touched.college_id
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <option>Select Category</option>
                            </Field>
                            <ErrorMessage
                              name="college_id"
                              component="div"
                              className="invalid-feedback"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col md={12}>
                          <Button
                            type="submit"
                            className={styles.letsgoButton}
                            size="md"
                            block
                            disabled={isSubmitting}
                          >
                            Let&apos;s go
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className={styles.courseContainer}>
            <Slider {...settings}>
              {courses.map((course) => (
                <CoursepageMolecule
                  key={course.id}
                  course={course}
                  onClick={() => {}}
                />
              ))}
            </Slider>
          </div>
          <div className={styles.featureCourses}>
            <FeaturesCourseSlider />
          </div>
          <div className={styles.tradingCourses}>
            <h1>All Investing & Trading Courses</h1>
            <div className={styles.tradingCoursesListing}>
              <Row className="mt-3">
                {/* {stocks.map((stock) => {
              return (
                <Col md={3}>
                  <div key={stock.id}>
                    <Card className={styles.card}>
                      <CardImg
                        top
                        width="100%"
                        src={stock.imageSrc}
                        alt={stock.title}
                        className={styles.cardImage}
                      />
                      <CardBody className={styles.cardContent}>
                        <CardTitle tag="h3" className={styles.cardTitle}>
                          {stock.title}
                        </CardTitle>
                        <div className={styles.iconRow}>
                          <div className={styles.iconText}>
                            <TbAntennaBars1 className={styles.icon} /> Beginner
                          </div>
                          <div className={styles.iconText}>
                            <FaClock className={styles.icon} /> 20 Hours
                          </div>
                          <div className={styles.cardRating}>
                            {stock.rating}{" "}
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
                          </div>
                        </div>

                        <div className={styles.priceContainer}>
                          <h3>&#8377;{stock.price}</h3>{" "}
                          <s>&#8377;{stock.originalPrice}</s>
                          <button className={styles.addToCartButton}>
                            Add to Cart
                          </button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
              );
            })} */}
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
