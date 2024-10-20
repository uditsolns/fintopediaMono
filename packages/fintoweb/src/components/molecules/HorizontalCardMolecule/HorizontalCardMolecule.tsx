"use client";

import React from "react";
import { Card, CardBody } from "reactstrap";
import styles from "./HorizontalCardMolecule.module.css";
import Image from "next/image";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { imageUrl } from "shared/src/config/imageUrl";
import ProgressBar from "@src/components/progress/ProgressBar";
import { isInCart } from "shared/src/components/atoms/Calculate";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";

interface CartsliderProps {
  course?: CoursesResponse;
  onClick?: () => void;
  loading: boolean;
}
const HorizontalCardMolecule: React.FC<CartsliderProps> = ({
  course,
  onClick,
  loading = false,
}) => { 
  const router = useRouter();
  const { courseCart } = useAppSelector((state) => state.courseCart);

  const handleNavigation = async () => {
    if (course?.id) {
      await router.push(`/courses/course-details/${course.id}`);
    }
  };
  return (
    <div>
      <Card className={`${styles.courseCard}`}>
        <div className={styles.courseImageContainer} onClick={handleNavigation}>
          <Image
            src={`${imageUrl}/uploads/course_images/${course.course_image}`}
            alt={course.name}
            width={350}
            height={250}
            className={styles.image}
          />
        </div>
        <div className={styles.cardBody}>
          <h3 onClick={handleNavigation}>{course.name}</h3>
          <div
            className={`d-flex align-items-center ${styles.featurecardContent}`}
          >
            <ProgressBar level={course.course_type} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M10.2858 1.33203C8.47282 1.33203 6.70053 1.86965 5.19308 2.87689C3.68563 3.88414 2.51072 5.31578 1.81692 6.99077C1.12311 8.66576 0.941582 10.5089 1.29528 12.287C1.64898 14.0652 2.52202 15.6985 3.804 16.9805C5.08598 18.2625 6.71932 19.1355 8.49748 19.4892C10.2756 19.8429 12.1188 19.6614 13.7937 18.9676C15.4687 18.2738 16.9004 17.0989 17.9076 15.5914C18.9149 14.084 19.4525 12.3117 19.4525 10.4987C19.4496 8.06843 18.4829 5.73851 16.7645 4.02005C15.046 2.30159 12.7161 1.3349 10.2858 1.33203ZM13.375 13.5879C13.2187 13.7441 13.0068 13.8319 12.7858 13.8319C12.5648 13.8319 12.3529 13.7441 12.1966 13.5879L9.69664 11.0879C9.54035 10.9316 9.45253 10.7197 9.45248 10.4987V5.4987C9.45248 5.27768 9.54028 5.06572 9.69656 4.90944C9.85284 4.75316 10.0648 4.66536 10.2858 4.66536C10.5068 4.66536 10.7188 4.75316 10.8751 4.90944C11.0313 5.06572 11.1191 5.27768 11.1191 5.4987V10.1537L13.375 12.4095C13.5312 12.5658 13.619 12.7777 13.619 12.9987C13.619 13.2197 13.5312 13.4316 13.375 13.5879Z"
                fill="white"
              />
            </svg>
            <span>{course.duration_time}</span>
          </div>
          <div
            className={`d-flex align-items-center ${styles.featurereviewContainer}`}
          >
            <h4>{course.rating}</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={styles.starIcon}
            >
              <path
                d="M19.3718 9.11727C19.595 8.95098 19.7606 8.71899 19.8453 8.45385C19.93 8.1887 19.9296 7.90368 19.8442 7.63877C19.7587 7.37385 19.5925 7.14231 19.3689 6.97662C19.1452 6.81093 18.8753 6.71939 18.597 6.71485L13.1915 6.51064C13.165 6.50881 13.1395 6.49933 13.1182 6.48334C13.0968 6.46736 13.0806 6.44555 13.0714 6.42055L11.2035 1.37547C11.1097 1.1188 10.9392 0.897161 10.7152 0.740571C10.4913 0.58398 10.2246 0.5 9.95127 0.5C9.67797 0.5 9.41128 0.58398 9.1873 0.740571C8.96331 0.897161 8.79286 1.1188 8.69901 1.37547L6.83713 6.43857C6.82793 6.46357 6.81169 6.48538 6.79038 6.50136C6.76907 6.51735 6.74359 6.52683 6.71701 6.52866L1.31157 6.73287C1.03325 6.73741 0.763336 6.82895 0.539668 6.99464C0.316 7.16033 0.149795 7.39187 0.064359 7.65678C-0.021077 7.9217 -0.0214604 8.20672 0.0632628 8.47186C0.147986 8.73701 0.313567 8.96899 0.536789 9.13529L4.77706 12.4686C4.79828 12.4853 4.81414 12.5079 4.82268 12.5335C4.83122 12.5591 4.83206 12.5867 4.82511 12.6128L3.36564 17.784C3.29001 18.0473 3.29733 18.3276 3.38662 18.5866C3.47591 18.8456 3.64282 19.0708 3.86465 19.2316C4.08648 19.3924 4.35246 19.481 4.6264 19.4852C4.90034 19.4895 5.16895 19.4093 5.39568 19.2555L9.87619 16.2525C9.89826 16.2372 9.92445 16.2291 9.95127 16.2291C9.97809 16.2291 10.0043 16.2372 10.0263 16.2525L14.5069 19.2555C14.7305 19.4145 14.9982 19.5 15.2726 19.5C15.5471 19.5 15.8147 19.4145 16.0384 19.2555C16.2603 19.0962 16.4274 18.8721 16.5166 18.6139C16.6059 18.3558 16.613 18.0763 16.5369 17.814L15.0654 12.6248C15.0576 12.5987 15.0581 12.5709 15.0666 12.5451C15.0752 12.5193 15.0916 12.4968 15.1135 12.4807L19.3718 9.11727Z"
                fill="#FFA11A"
              />
            </svg>
            <span>({course.reviews} reviews)</span>
          </div>
          <div className={styles.featurePriceContainer}>
            <h3>&#8377;{course.sale_price}</h3>
            <s>&#8377;{course.actual_price}</s>
            <button
              className={styles.featureaddToCartButton}
              onClick={onClick}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : isInCart(courseCart, course?.id)
                ? "Go to cart"
                : "Add to cart"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HorizontalCardMolecule;
