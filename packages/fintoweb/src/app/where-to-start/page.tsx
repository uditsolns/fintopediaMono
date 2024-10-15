"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./WheretoStart.module.css";
import Back from "../../assets/whereto-start.png";
import { Col, Row, Label } from "reactstrap";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getCourses } from "shared/src/provider/store/services/courses.service";
import { getCategories } from "shared/src/provider/store/services/categories.service";
import CircularLoading from "@src/components/loader/LoadingAtom";
import CoursesMolecule from "@src/components/molecules/CoursesMolecule/CoursesMolecule";
import ButtonWithIcons from "@src/components/button/ButtonWithIcons";

const WheretoStart: React.FC = () => {
  const [formData, setFormData] = useState({ college_id: "", level: "" });
  const [filteredCourses, setFilteredCourses] = useState([]);
  console.log("filteredCourses", filteredCourses);
  console.log("formData", formData);

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  console.log("coursesLoading", coursesLoading);
  console.log("categoriesLoading", categoriesLoading);
  React.useEffect(() => {
    if (token) {
      dispatch(getCourses());
      dispatch(getCategories());
    }
  }, [token, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter the courses based on selected category and level
    const filtered = courses.filter((course) => {
      const matchesCategory =
        formData.college_id === "" ||
        course.category_id === Number(formData.college_id);
      const matchesLevel =
        formData.level === "" || course.course_type === formData.level;
      return matchesCategory && matchesLevel;
    });

    // Update the state with the filtered courses
    setFilteredCourses(filtered);
  };

  return (
    <>
      {categoriesLoading?.categories || coursesLoading?.courses ? (
        <div className="fullPageLoading">
          <CircularLoading
            style={{
              height: "5rem",
              width: "5rem",
            }}
          />
        </div>
      ) : null}
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
          <form onSubmit={handleSubmit} className="form">
            <Row className="form-group mt-3">
              <Col md={12}>
                <div className="custom-select">
                  <select
                    id="categorySelect"
                    name="college_id"
                    className="textfield form-control"
                    onChange={handleInputChange}
                    value={formData.college_id}
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  <input
                    type="radio"
                    name="level"
                    value="Beginner"
                    id="beginner"
                    className="form-check-input"
                    onChange={handleInputChange}
                    checked={formData.level === "Beginner"}
                  />
                  <Label
                    htmlFor="beginner"
                    className="form-check-label text-white"
                  >
                    Beginner
                  </Label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="level"
                    value="Intermediate"
                    id="intermediate"
                    className="form-check-input"
                    onChange={handleInputChange}
                    checked={formData.level === "Intermediate"}
                  />
                  <Label
                    htmlFor="intermediate"
                    className="form-check-label text-white"
                  >
                    Intermediate
                  </Label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="level"
                    value="Expert"
                    id="pro"
                    className="form-check-input"
                    onChange={handleInputChange}
                    checked={formData.level === "Expert"}
                  />
                  <Label htmlFor="pro" className="form-check-label text-white">
                    Expert
                  </Label>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <ButtonWithIcons label="Let's go" width="100%" />
              </Col>
            </Row>
          </form>
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
          {(filteredCourses.length > 0 ? filteredCourses : courses).map(
            (course) => (
              <Col md={4} key={course.id}>
                <CoursesMolecule
                  course={course}
                  onClick={() => {
                    handleSubmit;
                  }}
                />
              </Col>
            )
          )}
        </Row>
      </div>
    </>
  );
};

export default WheretoStart;
