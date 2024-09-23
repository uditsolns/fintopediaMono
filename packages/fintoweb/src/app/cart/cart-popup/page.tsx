import React from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import styles from "./Cartpopup.module.css";
import CourseDetails from "../../../assets/courseDetails.png";

interface CourseItemProps {
  title: string;
  rating: number;
  reviews: number;
  hours: number;
  price: number;
  originalPrice: number;
  showGoToCart?: boolean;
}

export default function Component() {
  return (
    <div className={styles.overlay}>
      <div className={styles.blurredOverlay}></div>
      <div className={styles.cartPopup}>
        <div className={styles.cartHeader}>
          <h2 className={styles.mainHeading}>Added to cart</h2>
          <FaTimes className="cursor-pointer" />
        </div>

        <CourseItem
          title="Fundamentals of Swing Trading"
          rating={4.8}
          reviews={1234}
          hours={12}
          price={2999}
          originalPrice={4999}
          showGoToCart
        />

        <h3 className={styles.mainHeading}>Frequently Bought Together</h3>

        {[...Array(3)].map((_, index) => (
          <CourseItem
            key={index}
            title="Fundamentals of Swing Trading"
            rating={4.8}
            reviews={1234}
            hours={12}
            price={2999}
            originalPrice={4999}
          />
        ))}
        <hr className="mt-3" />
        <p className={styles.totalText}>Total</p>
        <div className={styles.totalSection}>
          <div className="flex">
            <p className={styles.totalSectionDicount}>₹9,000</p>
            <p className={styles.totalSectionTotal}>₹10,000</p>
          </div>
          <button className={styles.addTocart}>Add all to cart</button>
        </div>
      </div>
    </div>
  );
}

function CourseItem({
  title,
  rating,
  reviews,
  hours,
  price,
  originalPrice,
  showGoToCart = false,
}: CourseItemProps) {
  return (
    <div className={styles.courseItem}>
      <div className={styles.courseImage}>
        <img
          src={CourseDetails.src}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className={styles.courseTitle}>{title}</h3>
        <div className="flex items-center mb-1">
          <span className="text-sm text-white-400">
            Intermediate • {hours} hours
          </span>
        </div>
        <div className="flex items-center mb-1">
          <div className="flex text-yellow-400 mr-1">
            {[...Array(1)].map((_, i) => (
              <FaStar key={i} className="w-4 h-4" />
            ))}
          </div>
          <span className="text-sm text-gray">
            {rating} ({reviews} reviews)
          </span>
        </div>
        <div className={styles.courseInfo}>
          <div className="flex items-center">
            <p className={styles.coursePrice}>₹{price.toLocaleString()}</p>
            <p className={styles.lineThrough}>
              ₹{originalPrice.toLocaleString()}
            </p>
          </div>
          <div>
            {showGoToCart && (
              <button className={styles.addTocart}>Go to cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
