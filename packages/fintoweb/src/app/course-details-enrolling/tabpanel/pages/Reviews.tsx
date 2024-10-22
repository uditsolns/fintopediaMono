import React from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import styles from "../EnrollTabs.module.css";
import Link from "next/link";
import User from "../../../../assets/userCircle.png";
import Image from "next/image";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { toast } from "react-toastify";
import { createCourseReview } from "shared/src/provider/store/services/course-review.service";
import { imageUrl } from "shared/src/config/imageUrl";
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
const Reviews: React.FC<ReviewFormValues> = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse } = useAppSelector((state) => state.courses);
  const { course_review } = useAppSelector((state) => state.courseReviews);
  console.log("course_review", course_review);
  const [review, setReview] = React.useState<string | null>("");
  const [rating, setRating] = React.useState<number | null>(0);

  // Array to keep track of the "show more" state for each review
  const [showMoreStates, setShowMoreStates] = React.useState<boolean[]>([]);

  // Initialize showMoreStates based on the number of reviews
  React.useEffect(() => {
    if (course_review) {
      setShowMoreStates(new Array(course_review.length).fill(false));
    }
  }, [course_review]);

  const handleShowMore = (index: number) => {
    const updatedShowMoreStates = [...showMoreStates];
    updatedShowMoreStates[index] = !updatedShowMoreStates[index];
    setShowMoreStates(updatedShowMoreStates);
  };

  const handleSubmit = async () => {
    let params = {
      user_id: auth?.user?.id,
      course_id: singleCourse?.id,
      rating_star: `${rating || 0}`,
      review_description: review || "",
    };
    if (!rating || !review) {
      toast.error("Please write your review and select your rating.", {
        position: "top-right",
        theme: "light",
      });
      return;
    }
    dispatch(
      createCourseReview({
        params,
        onSuccess(data) {
          toast.success(data.message, {
            position: "top-right",
            theme: "light",
          });
          onCancel();
        },
        onError(error) {},
      })
    );
  };
  const onCancel = () => {
    setReview("");
    setRating(0);
  };
  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsFormCard}>
        <Form className={styles.reviewsForm}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="textarea"
                  value={review}
                  className={styles.textareaField}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write a review..."
                  rows={4}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <FormGroup className="d-flex justify-content-between align-items-center p-2">
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
                    className={styles.cancleButton}
                    onClick={() => {
                      setReview("");
                      setRating(0);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className={styles.postButton} onClick={handleSubmit}>
                    Post
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.allReviews}>
        <h1>All Reviews</h1>
        <Row className="mt-3">
          {/* {course_review?.map((review, index) => {
            return (
              <Col md={6} key={index} className="mt-3">
                <div className={styles.profileCard}>
                  <div className={styles.cardBody}>
                    <p className={styles.subHeading}>
                      {review.review_description}
                    </p>
                  </div>
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <Image
                        width={50}
                        height={50}
                        // src={
                        //   !review.user?.photo
                        //     ? `${User}`
                        //     : `${imageUrl}/UserImages/${review.user?.photo}`
                        // }
                        src={`${imageUrl}/UserImages/${review.user?.photo}`}
                        alt="User"
                        className={styles.userImage}
                      />
                      <div className={styles.userDetails}>
                        <h4 className={styles.userName}>
                          {review.user?.surname_name}
                          {review.user?.first_name}
                        </h4>
                        <p className={styles.userDesignation}>
                          {review.user?.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })} */}
          {course_review?.map((review, index) => {
            return (
              <Col md={6} key={index} className="mt-3">
                <div className={`${styles.profileCard} d-flex flex-column`}>
                  <div
                    className={styles.cardBody}
                    style={{ height: "180px", overflow: "hidden" }}
                  >
                    <p className={styles.subHeading}>
                      {review.review_description &&
                      review.review_description.trim() ? (
                        <>
                          <p>
                            {showMoreStates ||
                            review.review_description.split(" ").length <= 3
                              ? review.review_description
                              : `${review.review_description
                                  .split(" ")
                                  .slice(0, 3)
                                  .join(" ")}...`}
                          </p>
                          {review.review_description.split(" ").length > 3 && (
                            <span
                              onClick={() => handleShowMore(index)}
                              className={styles.seeMore}
                            >
                              {showMoreStates ? "Show less" : "Show more"}
                            </span>
                          )}
                        </>
                      ) : (
                        <p>No Description</p>
                      )}
                    </p>
                  </div>
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <Image
                        width={50}
                        height={50}
                        src={`${imageUrl}/UserImages/${review.user?.photo}`}
                        alt="User"
                        className={styles.userImage}
                      />
                      <div className={styles.userDetails}>
                        <h4 className={styles.userName}>
                          {review.user?.surname_name} {review.user?.first_name}
                        </h4>
                        <p className={styles.userDesignation}>
                          {review.user?.bio}
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
