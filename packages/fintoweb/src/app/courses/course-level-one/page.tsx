"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./CourseOne.module.css";
import { Button, Col, InputGroup, Row } from "reactstrap";
import { ErrorMessage, Form, Field, Formik, FormikHelpers } from "formik";
import CustomSelect from "@src/custom/CustomSelect";
import CourseLevelOneBanner from "../../../assets/coursel1.png";
import CourseCatalog from "./components/CourseCatalog";
import FeaturedCourses from "@src/app/homepage/FeaturedCourses";
import Catalog from "./components/Catalog";
import AchiveingLearningSlider from "@src/app/homepage/AchiveingLearningSlider";
import BasicStockmarketBanner from "@src/app/homepage/BasicStockmarketBanner";

interface RegisterFormValues {
  college_id: string;
}
const CourseLevelOne: React.FC = () => {
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
      <div className={styles.headerCourse}>
        <div className={styles.headerImage}>
          <Image src={CourseLevelOneBanner} alt="Course Level One" />
        </div>
        <div className={styles.headerContent}>
          <h1>
            Full Range of Financial <br />
            Education Courses
          </h1>
          <div className={styles.formContainer}>
            <div className="form">
              <h2>
                Don’t know where to
                <br /> start?
              </h2>
              <p>
                Create screens directly in Method or add your images from Sketch
                or Figma. You can even sync designs from your cloud storage!
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
                    <Row className="form-group">
                      <Col md={6} className="mt-3">
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
                      <Col md={6} className="mt-3">
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
      </div>
      <div className={styles.whatsNew}>
        <h2 className="Heading">What’s new</h2>
        <FeaturedCourses />
      </div>
      <div className={styles.catalogContainer}>
        <Catalog/>
      </div>
      <div className="achiveing">
        <AchiveingLearningSlider/>
      </div>
      <div className={styles.popularCourses}>
        <h2 className="Heading">Popular Courses</h2>
        <FeaturedCourses />
      </div>
      <BasicStockmarketBanner />
    </>
  );
};

export default CourseLevelOne;
