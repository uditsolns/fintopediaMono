"use client";

import React from "react";
import Image from "next/image";
import styles from "./WheretoStart.module.css";
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

interface RegisterFormValues {
  college_id: string;
}
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
    title: "Mastering of Money",
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
];

const WheretoStart: React.FC = () => {
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
  return (
    <>
      <div className={styles.headerHowitWorks}>
        <div className={styles.headerContentsHowitWorks}>
          <h2>
            Don’t know where
            <br />
            to start?
          </h2>
          <p>
            Create screens directly in Method or add your images from Sketch{" "}
            <br />
            or Figma. You can even sync designs from your cloud storage!
          </p>
          <div className="form">
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
                          className={`textfield form-control ${
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
                  <Row className="form-group mt-3">
                    <Col md={12}>
                      <Label
                        htmlFor="beginner"
                        className="form-check-label text-white m-2"
                      >
                        I am:
                      </Label>
                      <div className="form-check form-check-inline">
                        <Field
                          type="radio"
                          name="level"
                          value="beginner"
                          id="beginner"
                          className="form-check-input"
                        />
                        <Label
                          htmlFor="beginner"
                          className="form-check-label text-white"
                        >
                          Beginner
                        </Label>
                      </div>

                      <div className="form-check form-check-inline">
                        <Field
                          type="radio"
                          name="level"
                          value="intermediate"
                          id="intermediate"
                          className="form-check-input"
                        />
                        <Label
                          htmlFor="intermediate"
                          className="form-check-label text-white"
                        >
                          Intermediate
                        </Label>
                      </div>

                      <div className="form-check form-check-inline">
                        <Field
                          type="radio"
                          name="level"
                          value="pro"
                          id="pro"
                          className="form-check-input"
                        />
                        <Label
                          htmlFor="pro"
                          className="form-check-label text-white"
                        >
                          Pro
                        </Label>
                      </div>

                      <ErrorMessage
                        name="level"
                        component="div"
                        className="invalid-feedback"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={12}>
                      <Button
                        type="submit"
                        className={styles.letsgoButton}
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
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={Back} alt="Logo" />
        </div>
      </div>
      <div className={styles.cards}>
        <h2 className={styles.cardsHeading}>
          Become a Finance Manager in 3 months
        </h2>
        <Row className="mt-3">
          {stocks.map((stock) => (
            <Col md={4} key={stock.id}>
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
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default WheretoStart;
