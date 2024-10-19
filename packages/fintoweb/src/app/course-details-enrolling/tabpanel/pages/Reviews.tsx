import React from "react";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";
import styles from "../EnrollTabs.module.css";
import Link from "next/link";
import User from "../../../../assets/userCircle.png";
import Image from "next/image";
// import { CoursesRatingReviewsFields } from "@shared/src/utils/types/CoursesRatingReviews";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { toast } from "react-toastify";
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
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );

  const [review, setReview] = React.useState<string | null>("");
  const [rating, setRating] = React.useState<number | null>(0);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   let params: CoursesRatingReviewsFields = {
  //     user_id: auth?.user?.id,
  //     course_id: singleCourse?.id,
  //     rating_star: `${rating || 0}`,
  //     review_description: review!,
  //   };
  //   if (!rating || !review) {
  //     toast.error("Please write your review and select your rating.", {
  //       position: "top-right",
  //       theme: "light",
  //     });
  //     return;
  //   }
  //   console.log(JSON.stringify(params));
  // };
  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsForm}>
        {/* <Formik
          initialValues={{
            review: "",
            rating: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-3">
             
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
        </Formik>  */}
        <Card
          className="bg-dark"
          style={{ maxWidth: "500px", margin: "2rem auto" }}
        >
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="textarea"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write a review..."
                  rows={4}
                  style={{
                    backgroundColor: "#1e2124",
                    color: "#ffffff",
                    border: "none",
                    resize: "none",
                  }}
                />
              </FormGroup>
              <FormGroup className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-white mr-2">Select Rating</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      color="link"
                      className="p-0 mr-1"
                      onClick={() => setRating(star)}
                    >
                      <span
                        style={{
                          fontSize: "1.5rem",
                          color: star <= rating ? "#ffc107" : "#6c757d",
                        }}
                      >
                        ★
                      </span>
                    </Button>
                  ))}
                </div>
                <div>
                  <Button
                    color="secondary"
                    outline
                    className="mr-2"
                    onClick={() => {
                      setReview("");
                      setRating(0);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Post
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
      <div className={styles.allReviews}>
        <h1>All Reviews</h1>
        {/* <Row className="mt-3">
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
        </Row> */}
      </div>
    </div>
  );
};

export default Reviews;
