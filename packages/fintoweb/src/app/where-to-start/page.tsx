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
import { toast } from "react-toastify";
import { isInCart } from "shared/src/components/atoms/Calculate";
import { useRouter } from "next/navigation";
import {
  createCourseCart,
  getCourseCart,
} from "shared/src/provider/store/services/CourseCart.service";
import { CoursesResponse } from "shared/src/utils/types/courses";

const WheretoStart: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({ college_id: "", level: "" });
  const [filteredCourses, setFilteredCourses] = useState([]);

  const { auth } = useAppSelector((state) => state.auth);
  const { courseCart, loading: courseCartLoading } = useAppSelector(
    (state) => state.courseCart
  );

  const token = auth?.token;
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const [loadingCourseId, setLoadingCourseId] = React.useState<number | null>(
    null
  );
  React.useEffect(() => {
    if (token) {
      dispatch(getCourses());
      dispatch(getCourseCart());
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
    const filtered = courses.filter((course) => {
      const matchesCategory =
        formData.college_id === "" ||
        course.category_id === Number(formData.college_id);
      const matchesLevel =
        formData.level === "" || course.course_type === formData.level;
      return matchesCategory && matchesLevel;
    });
    setFilteredCourses(filtered);
  };
  const handleSubmitWrapper = () => {
    handleSubmit({
      preventDefault: () => {},
    } as React.FormEvent);
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
    <>
      {categoriesLoading?.categories ||
      coursesLoading?.courses ||
      courseCartLoading?.courseCart ? (
        <div className="fullPageLoading">
          <CircularLoading
            style={{
              height: "5rem",
              width: "5rem",
            }}
          />
        </div>
      ) : null} 
      <div className={styles.whereTostart}>
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
                    <Label
                      htmlFor="pro"
                      className="form-check-label text-white"
                    >
                      Expert
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={12}>
                  <ButtonWithIcons
                    label="Let's go"
                    width="100%"
                    onClick={handleSubmitWrapper}
                  />
                </Col>
              </Row>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <Image src={Back} alt="Logo" />
          </div>
        </div>
        <div className={styles.cards}>
          <h2 className={styles.cardsHeading}>Recommended Courses</h2>
          <Row className="mt-3">
            {(filteredCourses.length > 0 ? filteredCourses : courses).map(
              (course) => (
                <Col md={4} key={course.id}>
                  <CoursesMolecule
                    course={course}
                    loading={loadingCourseId === course.id}
                    onClick={() => handleCourseClick(course)}
                  />
                </Col>
              )
            )}
          </Row>
        </div> 
      </div>
    </>
  );
};

export default WheretoStart;
