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
import User from "../../../../assets/user.jpg";
import Image from "next/image";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { toast } from "react-toastify";
import { createCourseReview } from "shared/src/provider/store/services/course-review.service";
import { imageUrl } from "shared/src/config/imageUrl";
import Pagination from "@src/components/pagination/Pagination";
interface ReviewFormValues {
  review: string;
  rating: string;
}

const Reviews: React.FC<ReviewFormValues> = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse } = useAppSelector((state) => state.courses);
  const { course_review } = useAppSelector((state) => state.courseReviews);
  const [review, setReview] = React.useState<string | null>("");
  const [rating, setRating] = React.useState<number | null>(0);

  // pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = (
    course_review.length > 0 ? course_review : course_review
  ).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (course_review.length > 0 ? course_review.length : course_review.length) /
      itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

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
                  placeholder={`Write a review... (${review.length}/250 characters)`}
                  rows={4}
                  maxLength={250}
                />
              </FormGroup>
            </Col>
            <p className={styles.characterCount}>
              {`Write a review... (${review.length}/250 characters)`}
            </p>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup className={styles.ratingFormgroup}>
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
          {currentReviews?.map((review, index) => {
            return (
              <Col md={6} key={index} className="mt-3">
                <div className={`${styles.profileCard} d-flex flex-column`}>
                  <div
                    className={styles.cardBody}
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <p className={styles.subHeading}>
                      {review.review_description}
                    </p>
                  </div>
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <Image
                        width={50}
                        height={50}
                        src={
                          review.user?.photo
                            ? `${imageUrl}/uploads/user_photo/${review.user.photo}`
                            : User
                        }
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Reviews;
