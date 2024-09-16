import React from "react";
import { ErrorMessage, Form, Field, Formik, FormikHelpers } from "formik";
import { Button, Col, InputGroup, Row, Label } from "reactstrap";
import CustomInput from "@src/custom/CustomInput";
import styles from "../EnrollTabs.module.css";
import Link from "next/link";
import User from "../../../../assets/userCircle.png";
import Image from "next/image";

interface ReviewFormValues {
  review: string;
  rating: string;
}
const stocks = new Array(4).fill({
  userName: "Priyam Sharma",
  userDesignation: "Product Advisor",
  userImage: User,
  mainHeading: "Access to Quality Education",
  subHeading: `Online learning has completely transformed my educational experience. The flexibility to attend classes and complete assignments on my own schedule has been a game-changer for me. It's allowed me to balance my job and family commitments while pursuing my degree. I'm so grateful for the opportunity to learn this way!`,
  courseLink: "Basics of Stock Market",
});
const Reviews: React.FC = () => {
  const handleSubmit = (
    values: ReviewFormValues,
    { setSubmitting }: FormikHelpers<ReviewFormValues>
  ) => {
    const reviewData = {
      review: values.review,
      rating: values.rating,
    };
    // dispatch(actions.postReview(reviewData, () => router.push('/thank-you')));
    setSubmitting(false);
  };

  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsForm}>
        <Formik
          initialValues={{
            review: "",
            rating: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-3">
              {/* Review Textarea */}
              <Row className="form-group mt-3">
                <Col md={12} className="p-0">
                  <InputGroup>
                    <Field
                      component="textarea"
                      name="review"
                      id="review"
                      className={`textfield form-control ${
                        errors.review && touched.review ? "is-invalid" : ""
                      }`}
                      
                      placeholder="Write a review...."
                      rows={5}
                    />
                    <ErrorMessage
                      name="review"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className={`form-group ${styles.buttonRow}`}>
                <Col md={6} className="mt-2">
                  <Field
                    as="select"
                    name="rating"
                    id="rating"
                    className={`textfield form-control ${
                      errors.rating && touched.rating ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Field>
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="invalid-feedback"
                  />
                </Col>
                <Col md={6} className="text-right mt-2">
                  <Link href="#" className={styles.cancleButton}>
                    Cancle
                  </Link>
                  <Button
                    type="submit"
                    className={styles.postButton}
                    size="md"
                    disabled={isSubmitting}
                  >
                    Post
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles.allReviews}>
        <h1>All Reviews</h1>
        <Row className="mt-3">
          {stocks.map((card, index) => {
            return (
              <Col md={6} key={index} className="mt-3">
                <div className={styles.profileCard}>
                  <div className={styles.cardBody}>
                    <h3 className={styles.mainHeading}>{card.mainHeading}</h3>
                    <p className={styles.subHeading}>{card.subHeading}</p>
                  </div>
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <Image
                        src={card.userImage}
                        alt="User"
                        className={styles.userImage}
                      />
                      <div className={styles.userDetails}>
                        <h4 className={styles.userName}>{card.userName}</h4>
                        <p className={styles.userDesignation}>
                          {card.userDesignation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Reviews;
