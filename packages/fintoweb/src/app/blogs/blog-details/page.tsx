"use client";

import React from "react";
import styles from "./Blogdetails.module.css";
import Image from "next/image";
import Circle from "../../../assets/bogsDetailscircle.png";

const BlogDetails = () => {
  return (
    <>
      <div className={styles.bannerSection}>
        <h1>
          How to find an <br />
          Undervalued Stock?
        </h1>
        <p>
          Create screens directly in Method or add your images from Sketch or
          Figma. You can
          <br /> even sync designs from your cloud storage!
        </p>
        <div className={styles.bannerSectionImage}>
          <Image src={Circle} alt="Circle" /> <span>By team fintopedia</span>
        </div>
      </div>
      <div className={styles.blogdetailsContent}>
        <div className="row">
          <div className="col-md-8">
            <p>
              At Fintopedia, we believe that education should have no
              boundaries. Our mission is to make top-tier finance education
              accessible to learners worldwide, regardless of their location or
              background. Founded by a team of experts in teaching, technology,
              and design, Fintopedia was created with a vision to break down
              barriers and bring education to the fingertips of aspiring finance
              professionals.
            </p>
            <p>
              Our journey began with a simple idea: to democratize finance
              education and provide a platform where learners can gain the
              knowledge and skills needed to excel in the finance industry. We
              understand that the right education can transform lives, and we
              are dedicated to making that transformation possible for everyone.
            </p>
            <p>
              Through our innovative online courses, comprehensive resources,
              and expert instructors, we strive to provide an unparalleled
              learning experience. Whether you're looking to advance your
              career, switch to a new field, or simply enhance your knowledge,
              Fintopedia is here to support your educational journey every step
              of the way.
            </p>
            <p>
              Join us at Fintopedia and unlock your potential in the world of
              finance. Together, we can achieve greatness and build a brighter
              future.
            </p>
          </div>
          <div className="col-md-4">
            <div className={styles.blogdetailsRightContent}>
              <h3>Contents</h3>
              <ol>
                <li>Important Notices and Disclaimers; Privacy</li>
                <li>Services Overview, Availability, and Eligibility</li>
                <li>
                  Communication Preferences; Electronic Notices and Signatures
                </li>
                <li>Services Overview, Availability, and Eligibility</li>
                <li>Services Overview, Availability, and Eligibility</li>
                <li>
                  Communication Preferences; Electronic Notices and Signatures
                </li>
              </ol>
            </div>
            <div className={styles.socialCard}>
              <div className={styles.socialText}>Follow Us on Social Media</div>
              <div className={styles.socialIcon}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1739_29310)">
                      <path
                        d="M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z"
                        fill="#FCFCFC"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1739_29310">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.2918 18.1256C13.8371 18.1256 17.9652 11.8729 17.9652 6.45216C17.9652 6.27638 17.9613 6.09669 17.9535 5.92091C18.7566 5.34016 19.4496 4.62082 20 3.79669C19.2521 4.12944 18.458 4.34676 17.6449 4.44122C18.5011 3.92803 19.1421 3.12184 19.4492 2.17208C18.6438 2.64941 17.763 2.98612 16.8445 3.16779C16.2257 2.51024 15.4075 2.07487 14.5164 1.92899C13.6253 1.7831 12.711 1.93482 11.9148 2.36069C11.1186 2.78656 10.4848 3.46286 10.1115 4.28504C9.73825 5.10721 9.64619 6.02946 9.84961 6.90919C8.21874 6.82735 6.62328 6.4037 5.16665 5.66569C3.71002 4.92769 2.42474 3.89181 1.39414 2.62521C0.870333 3.52831 0.710047 4.59698 0.945859 5.61402C1.18167 6.63106 1.79589 7.52015 2.66367 8.1006C2.01219 8.07991 1.37498 7.90451 0.804688 7.58888V7.63966C0.804104 8.5874 1.13175 9.5061 1.73192 10.2396C2.3321 10.9731 3.16777 11.4761 4.09687 11.6631C3.49338 11.8282 2.85999 11.8523 2.2457 11.7334C2.50788 12.5485 3.01798 13.2614 3.70481 13.7726C4.39164 14.2838 5.22093 14.5678 6.07695 14.585C4.62369 15.7265 2.82848 16.3457 0.980469 16.3428C0.652739 16.3423 0.325333 16.3222 0 16.2826C1.87738 17.4871 4.06128 18.1268 6.2918 18.1256Z"
                      fill="#FCFCFC"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1739_29316)">
                      <path
                        d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"
                        fill="#FCFCFC"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1739_29316">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
