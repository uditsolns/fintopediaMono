import React from "react";
import styles from "./CoursepageMolecule.module.css";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { Card, CardBody, CardTitle } from "reactstrap";
import { FaClock } from "react-icons/fa";
import Image from "next/image";
import { imageUrl } from "shared/src/config/imageUrl";
import ProgressBar from "@src/components/progress/ProgressBar";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import {
  isCoursePurchased,
  isInCart,
} from "shared/src/components/atoms/Calculate";
import { useRouter } from "next/navigation";

interface CoursepageMoleculeProps {
  course?: CoursesResponse;
  onClick?: () => void;
  loading: boolean;
}
const CoursepageMolecule: React.FC<CoursepageMoleculeProps> = ({
  course,
  onClick, 
  loading = false, 
}) => {
  const router = useRouter();
  const { courseCart } = useAppSelector((state) => state.courseCart);
  const { auth } = useAppSelector((state) => state.auth);

  const { courseget_purchase } = useAppSelector(
    (state) => state.coursesgetPurchase
  );

  const flattenedCourses = courseget_purchase.flat();

  const isCoursePurchasedStatus = isCoursePurchased(
    flattenedCourses,
    course?.id
  );
  const handleNavigation = async () => {
    if (!auth?.token) {
      await router.push("/auth/login");
      return;
    }
    if (course?.id) {
      if (isCoursePurchasedStatus) {
        await router.push(`/course-details-enrolling/${course.id}`);
      } else {
        await router.push(`/courses/course-details/${course.id}`);
      }
    }
  };

  return (
    <div key={course.id} className={styles.coursepageMolecule}>
      <Card className={styles.card}>
        <div className={styles.cardImage} onClick={handleNavigation}>
          <Image
            src={`${imageUrl}/uploads/course_images/${course.course_image}`}
            alt={course.name}
            width={350}
            height={178}
            className={styles.image}
          />
          <div className={styles.languageBadge}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clip-path="url(#clip0_3837_6467)">
                <path
                  d="M1.25781 7C1.25781 8.52292 1.86279 9.98347 2.93966 11.0603C4.01653 12.1372 5.47708 12.7422 7 12.7422C8.52292 12.7422 9.98347 12.1372 11.0603 11.0603C12.1372 9.98347 12.7422 8.52292 12.7422 7C12.7422 5.47708 12.1372 4.01653 11.0603 2.93966C9.98347 1.86279 8.52292 1.25781 7 1.25781C5.47708 1.25781 4.01653 1.86279 2.93966 2.93966C1.86279 4.01653 1.25781 5.47708 1.25781 7Z"
                  stroke="#434A4A"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.53906 7C4.53906 5.47708 4.79834 4.01653 5.25985 2.93966C5.72137 1.86279 6.34732 1.25781 7 1.25781C7.65268 1.25781 8.27863 1.86279 8.74015 2.93966C9.20166 4.01653 9.46094 5.47708 9.46094 7C9.46094 8.52292 9.20166 9.98347 8.74015 11.0603C8.27863 12.1372 7.65268 12.7422 7 12.7422C6.34732 12.7422 5.72137 12.1372 5.25985 11.0603C4.79834 9.98347 4.53906 8.52292 4.53906 7Z"
                  stroke="#434A4A"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.66797 8.91406H12.332"
                  stroke="#434A4A"
                  stroke-linecap="round"
                />
                <path
                  d="M1.66797 5.08594H12.332"
                  stroke="#434A4A"
                  stroke-linecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3837_6467">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {course.course_language}
          </div>
        </div>
        <CardBody className={styles.cardContent}>
          <CardTitle
            tag="h3"
            className={styles.cardTitle}
            onClick={handleNavigation}
          >
            {course.name}
          </CardTitle>
          <div className={styles.iconRow}>
            <div className={styles.iconText}>
              <ProgressBar level={course.course_type} />
            </div>
            <div className={styles.iconText}>
              <FaClock className={styles.icon} /> {course.duration_time}
            </div>
            <div className={styles.cardRating}>
              {course.rating}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
              >
                <path
                  d="M0.507883 5.45225C0.3669 5.34722 0.262323 5.20071 0.208815 5.03325C0.155305 4.86579 0.155546 4.68578 0.209506 4.51846C0.263466 4.35114 0.368438 4.20491 0.509702 4.10026C0.650966 3.99562 0.821438 3.9378 0.997217 3.93493L4.41118 3.80596C4.42797 3.8048 4.44406 3.79881 4.45752 3.78872C4.47098 3.77862 4.48123 3.76485 4.48705 3.74906L5.66676 0.562696C5.72604 0.400585 5.83369 0.260604 5.97515 0.161705C6.11662 0.0628059 6.28506 0.00976563 6.45766 0.00976562C6.63027 0.00976562 6.79871 0.0628059 6.94017 0.161705C7.08164 0.260604 7.18929 0.400585 7.24857 0.562696L8.42449 3.76044C8.4303 3.77623 8.44055 3.79 8.45401 3.8001C8.46747 3.81019 8.48357 3.81618 8.50035 3.81734L11.9143 3.94631C12.0901 3.94918 12.2606 4.007 12.4018 4.11164C12.5431 4.21629 12.6481 4.36252 12.702 4.52984C12.756 4.69716 12.7562 4.87717 12.7027 5.04463C12.6492 5.21209 12.5446 5.3586 12.4037 5.46363L9.72559 7.56891C9.71218 7.57946 9.70217 7.5937 9.69677 7.60988C9.69138 7.62606 9.69085 7.64347 9.69524 7.65995L10.617 10.926C10.6648 11.0923 10.6601 11.2693 10.6038 11.4329C10.5474 11.5965 10.4419 11.7387 10.3018 11.8403C10.1617 11.9418 9.99376 11.9977 9.82074 12.0004C9.64772 12.0031 9.47808 11.9525 9.33488 11.8553L6.50508 9.95868C6.49114 9.94906 6.4746 9.9439 6.45766 9.9439C6.44072 9.9439 6.42419 9.94906 6.41025 9.95868L3.58045 11.8553C3.43919 11.9558 3.27015 12.0098 3.09681 12.0098C2.92346 12.0098 2.75442 11.9558 2.61316 11.8553C2.47302 11.7547 2.3675 11.6132 2.31112 11.4501C2.25474 11.2871 2.25027 11.1106 2.29832 10.9449L3.22767 7.66753C3.2326 7.65108 3.23233 7.63351 3.2269 7.61722C3.22146 7.60092 3.21114 7.5867 3.19733 7.57649L0.507883 5.45225Z"
                  fill="#FFA11A"
                />
              </svg>
            </div>
          </div>

          <div className={styles.priceContainer}>
            <h3>&#8377;{course.sale_price}</h3>{" "}
            <s>&#8377;{course.actual_price}</s>
            <button
              className={styles.addToCartButton}
              onClick={onClick}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : isCoursePurchasedStatus
                ? "Watch Now"
                : isInCart(courseCart, course?.id)
                ? "Go to cart"
                : "Add to cart"}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CoursepageMolecule;
