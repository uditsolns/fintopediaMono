"use client"; // Must be the very first line in the file

import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Col,
  Row,
  InputGroup,
  Button,
} from "reactstrap";
import styles from "./Homepage.module.css";
import { TbAntennaBars1 } from "react-icons/tb";
import { FaClock, FaStar } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import CustomSelect from "../../custom/CustomSelect";
import Slider from "react-slick";
// import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";

const stocks = [
  {
    id: 1,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company A.",
    rating: 4.6,
    reviews: 1000,
    price: 5000,
    originalPrice: 6000,
  },
  {
    id: 2,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Mastering of Money Management",
    description: "A brief description of Company B.",
    rating: 4.8,
    reviews: 1500,
    price: 4500,
    originalPrice: 5500,
  },
  {
    id: 3,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company C.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 4,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company C.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 5,
    imageSrc: "https://via.placeholder.com/300x200",
    title: "Basic of Stock Market",
    description: "A brief description of Company C.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
];
interface RegisterFormValues {
  college_id: string;
}
const handleSubmit = (
  values: RegisterFormValues,
  { setSubmitting }: FormikHelpers<RegisterFormValues>
) => {
  const register = {
    college_id: values.college_id,
  };
  // dispatch(actions.postRegister(register, () => router.push('/login')));
  setSubmitting(false);
};
const FeaturedCourses: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [slideToShow, setSlideToShow] = useState(3);

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
    setProgress(100 / (stocks.length - slideToShow + 1));
    window.addEventListener("resize", () => {
      setSlides();
    });
  }, []);
  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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
    // afterChange: current => {
    //   setProgress(100 / (stocks.length - slideToShow + 1) * (current + 1));
    //   console.log(slideToShow)
    // }
    afterChange: (current: number) => {
      const totalSlides = stocks.length;
      const totalSlidesToShow = slideToShow;
      const progressPercentage =
        (100 / (totalSlides - totalSlidesToShow + 1)) * (current + 1);
      setProgress(progressPercentage);
      console.log(totalSlidesToShow); // Ensure to use correct variable
    },
  };

  return (
    <>
      <div className={`${styles.courseContainer} relative`}>
        <Slider {...settings}>
          {stocks.map((stock) => (
            <div>
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
                  </div>
                  <div className={styles.cardRating}>
                    {stock.rating} <FaStar className={styles.icon} /> (
                    {stock.reviews} reviews)
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
          ))}
          
        </Slider>
        <div className="h-[3px] bg-gray-300 w-[250px] absolute -bottom-[15px] right-15">
            <div
              className="bg-[#525eff] absolute h-[100%] transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
      </div>

      <div className="container">
        <div className={styles.categoryForm}>
          <Row className="">
            <Col md={8}>
              <h1>Don't know where to start ?</h1>
              <p>
                Create screens directly in Method or add your images from Sketch
                or figma.
                <br />
                You can even sync designs from your cloud storage!
              </p>
            </Col>
            <Col md={4} className="mt-3">
              <Formik
                initialValues={{
                  college_id: "",
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
                          className="btn btn-light font-bold text-black"
                          size="md"
                          block
                          disabled={isSubmitting}
                        >
                         
                          Let's go
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default FeaturedCourses;
