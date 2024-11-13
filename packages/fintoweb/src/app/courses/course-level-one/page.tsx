"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./CourseOne.module.css";
import { Button, Col, InputGroup, Row } from "reactstrap";
import { ErrorMessage, Form, Field, Formik, FormikHelpers } from "formik";
import CustomSelect from "@src/custom/CustomSelect";
import CourseLevelOneBanner from "../../../assets/coursel1.png";
import CourseCatalog from "./components/CourseCatalog";
import FeaturedCourses from "@src/app/homepage/components/featured-courses/FeaturedCourses";
import Catalog from "./components/Catalog";
import AchiveingLearningSlider from "@src/app/homepage/AchiveingLearningSlider";
import BasicStockmarketBanner from "@src/app/homepage/BasicStockmarketBanner";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getCourseCart } from "shared/src/provider/store/services/CourseCart.service";
import { getCourses } from "shared/src/provider/store/services/courses.service";
import { getCategories } from "shared/src/provider/store/services/categories.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";

interface RegisterFormValues {
  college_id: string;
}
const CourseLevelOne: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );

  React.useEffect(() => {
    if (token) {
      dispatch(getCourseCart());
    }
  }, [token, dispatch]);

  React.useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategories());
  }, [dispatch]);
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
      {categoriesLoading?.categories || coursesLoading?.courses ? (
        <div className="fullPageLoading">
          <LoadingAtom
            style={{
              height: "5rem",
              width: "5rem",
            }}
          />
        </div>
      ) : null}
      <div className="all-content">
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
          <FeaturedCourses
            courses={courses}
            categories={categories}
            label="What’s new"
          />
        </div>
        <div className={styles.catalogContainer}>
          <FeaturedCourses
            courses={courses}
            categories={categories}
            label="Course Catalog"
          />
        </div>
        <div className="achiveing">
          <AchiveingLearningSlider />
        </div>
        <div className={styles.popularCourses}>
          <FeaturedCourses
            courses={courses}
            categories={categories}
            label="Popular Courses"
          />
        </div>
        <BasicStockmarketBanner />
      </div>
    </>
  );
};

export default CourseLevelOne;
