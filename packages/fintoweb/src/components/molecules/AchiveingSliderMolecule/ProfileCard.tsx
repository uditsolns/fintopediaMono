import React from "react";
import Image from "next/image";
import styles from "./AchiveingSliderMolecule.module.css";
import Logo from "../../../assets/meta.png";
import User from "../../../assets/userCircle.png";
import { imageUrl } from "shared/src/config/imageUrl";

const ProfileCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          {i <= rating ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path d="M18 25.9056L24.225 29.6706C25.365 30.3606 26.76 29.3406 26.46 28.0506L24.81 20.9706L30.315 16.2006C31.32 15.3306 30.78 13.6806 29.46 13.5756L22.215 12.9606L19.38 6.27062C18.87 5.05563 17.13 5.05563 16.62 6.27062L13.785 12.9456L6.53999 13.5606C5.21999 13.6656 4.67999 15.3156 5.68499 16.1856L11.19 20.9556L9.53999 28.0356C9.23999 29.3256 10.635 30.3456 11.775 29.6556L18 25.9056Z" fill="#FFA11A" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path d="M18 25.9056L24.225 29.6706C25.365 30.3606 26.76 29.3406 26.46 28.0506L24.81 20.9706L30.315 16.2006C31.32 15.3306 30.78 13.6806 29.46 13.5756L22.215 12.9606L19.38 6.27062C18.87 5.05563 17.13 5.05563 16.62 6.27062L13.785 12.9456L6.53999 13.5606C5.21999 13.6656 4.67999 15.3156 5.68499 16.1856L11.19 20.9556L9.53999 28.0356C9.23999 29.3256 10.635 30.3456 11.775 29.6556L18 25.9056Z" fill="#CCCCCC" />
            </svg>
          )}
        </span>
      );
    }
    return stars;
  };
  return (
    <div className={styles.profileCard}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <Image
            src={
              review.user?.photo
                ? `${imageUrl}/uploads/user_photo/${review.user.photo}`
                : User
            }
            width={50}
            height={50}
            alt="User"
            className={styles.userImage}
          />
          <div className={styles.userDetails}>
            <h4 className={styles.userName}>
              {review.user?.surname_name}&nbsp;{review.user?.first_name}
            </h4>
            <p className={styles.userDesignation}>
              {review.user?.qualification}
            </p>
          </div>
        </div>
        <div className={styles.companyLogo}>
          <Image src={Logo} alt="Company Logo" />
        </div>
      </div>
      <div className={styles.cardRating} style={{ display: 'flex', alignItems: 'center' }}>
        {renderStars(review.course?.rating)}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.mainHeading}>{review.course?.name}</h3>
        <p className={styles.subHeading}>{review?.review_description}</p>
      </div>
      <div className={styles.cardLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M3.95317 17.7625C7.39028 18.2287 10.553 19.8918 12.8851 22.4593C15.2172 19.8918 18.3799 18.2287 21.817 17.7625C22.2082 17.7192 22.5696 17.5326 22.8312 17.2385C23.0929 16.9445 23.2364 16.564 23.234 16.1704V3.35362C23.234 3.12572 23.185 2.90049 23.0905 2.69314C22.9959 2.4858 22.8579 2.30117 22.6858 2.15174C22.5138 2.00231 22.3116 1.89156 22.0931 1.82698C21.8745 1.7624 21.6446 1.74549 21.419 1.7774C18.1323 2.32288 15.1257 3.96083 12.8851 6.42646C10.6445 3.96083 7.63785 2.32288 4.3512 1.7774C4.12555 1.74549 3.89568 1.7624 3.67713 1.82698C3.45857 1.89156 3.25643 2.00231 3.08436 2.15174C2.91229 2.30117 2.7743 2.4858 2.67973 2.69314C2.58516 2.90049 2.5362 3.12572 2.53616 3.35362V16.1704C2.53377 16.564 2.67727 16.9445 2.93895 17.2385C3.20063 17.5326 3.56195 17.7192 3.95317 17.7625Z"
            fill="white"
          />
          <path
            d="M12.8851 22.4593C10.553 19.8918 7.39028 18.2287 3.95317 17.7625C3.56195 17.7192 3.20063 17.5326 2.93895 17.2385C2.67727 16.9445 2.53377 16.564 2.53616 16.1704V3.35362C2.5362 3.12572 2.58516 2.90049 2.67973 2.69314C2.7743 2.4858 2.91229 2.30117 3.08436 2.15174C3.25643 2.00231 3.45857 1.89156 3.67713 1.82698C3.89568 1.7624 4.12555 1.74549 4.3512 1.7774C7.63785 2.32288 10.6445 3.96083 12.8851 6.42646V22.4593Z"
            stroke="url(#paint0_linear_4183_4417)"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8848 22.4593C15.2169 19.8918 18.3796 18.2287 21.8167 17.7625C22.2079 17.7192 22.5692 17.5326 22.8309 17.2385C23.0926 16.9445 23.2361 16.564 23.2337 16.1704V3.35362C23.2337 3.12572 23.1847 2.90049 23.0901 2.69314C22.9956 2.4858 22.8576 2.30117 22.6855 2.15174C22.5134 2.00231 22.3113 1.89156 22.0927 1.82698C21.8742 1.7624 21.6443 1.74549 21.4187 1.7774C18.132 2.32288 15.1254 3.96083 12.8848 6.42646V22.4593Z"
            stroke="url(#paint1_linear_4183_4417)"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4183_4417"
              x1="17.0534"
              y1="2.00238"
              x2="1.32942"
              y2="2.64714"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#717171" />
              <stop offset="1" stop-color="#0D0D0C" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_4183_4417"
              x1="27.4021"
              y1="2.00238"
              x2="11.6781"
              y2="2.64714"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#717171" />
              <stop offset="1" stop-color="#0D0D0C" />
            </linearGradient>
          </defs>
        </svg>
        &nbsp; Enrolled in: <a href="">{review.course?.name}</a>
      </div>
    </div>
  );
};

export default ProfileCard;
