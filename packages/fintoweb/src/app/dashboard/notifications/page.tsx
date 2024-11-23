import React from "react";
import styles from "./Notifications.module.css";

const page = () => {
  return (
    <React.Fragment>
      <div className={styles.headerNotification}>
        <h1>Notifications</h1>
        <h4>Mark all as read</h4>
      </div>

      <div className={styles.notificationCard}>
        <div className={styles.notificationIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
          >
            <g clip-path="url(#clip0_1756_35137)">
              <path
                d="M7.66406 9.58398H11.4974"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.58594 7.66602V11.4993"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.0443 7.66602L21.0859 11.4993"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.5 9.58398H38.3333"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M36.4141 7.66602V11.4993"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28.7526 17.25L26.8359 19.1667"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.5 24.9173L38.3333 23.959"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.5 36.416H38.3333"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M36.4141 34.5V38.3333"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M26.8367 31.6588L14.3439 19.166L5.9297 37.5277C5.76339 37.8842 5.71081 38.2832 5.77909 38.6706C5.84738 39.0581 6.03321 39.4151 6.31138 39.6933C6.58955 39.9714 6.94657 40.1573 7.33399 40.2255C7.7214 40.2938 8.12045 40.2412 8.47695 40.0749L26.8367 31.6588Z"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1756_35137">
                <rect width="46" height="46" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles.notificationContent}>
          <h3>Flash Sale upto 30% Off</h3>
          <p>
            Create screens directly in Method or add your images from Sketch or
            Figma.
          </p>
        </div>
        <div className={styles.explore}>Explore now</div>
      </div>
    </React.Fragment>
  );
};

export default page;
