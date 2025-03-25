"use client";

import React from "react";
import styles from "./Blogdetails.module.css";
import Image from "next/image";
import Circle from "../../../assets/bogsDetailscircle.png";
import BlogImage from "../../../assets/blogDetailsImage.png";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import BlogCourse from "../../../assets/blogCourse.png";
import User from "../../../assets/userCircle.png";
import Logo from "../../../assets/meta.png";
import { FaInstagram } from "react-icons/fa";
import Blog1 from "../../../assets/blogs/Blog1.png";
import Blog2 from "../../../assets/blogs/Blog2.png";
import Blog3 from "../../../assets/blogs/Blog3.png";
import Blog4 from "../../../assets/blogs/Blog4.png";

const stocks = new Array(2).fill({
  userName: "Priyam Sharma",
  userDesignation: "Product Advisor",
  companyLogo: Logo,
  userImage: User,
  mainHeading: "Access to Quality Education",
  subHeading: `Online learning has completely transformed my educational experience. The flexibility to attend classes and complete assignments on my own schedule has been a game-changer for me. It&apos;s allowed me to balance my job and family commitments while pursuing my degree. I&apos;m so grateful for the opportunity to learn this way!`,
  courseLink: "Basics of Stock Market",
});

const stocksData = [
  {
    id: 1,
    image: Blog1,
    title: "Mastering Option",
    description:
      "Explore key strategies and concepts to enhance your option trading skills. Gain insights from expert Jyoti Budhia.Lorem ispum",
    rating: 4.6,
    reviews: 1000,
    price: 5000,
    originalPrice: 6000,
  },
  {
    id: 2,
    image: Blog2,
    title: "Decoding Market Trends",
    description:
      "Stay ahead with the latest market analysis and trend predictions. Learn how to make informed trading decisions.",
    rating: 4.8,
    reviews: 1500,
    price: 4500,
    originalPrice: 5500,
  },
  {
    id: 3,
    image: Blog3,
    title: "Leveraging Trading ",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 4,
    image: Blog4,
    title: "Fundamental Analysis",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 5,
    image: Blog1,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 6,
    image: Blog2,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 7,
    image: Blog3,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 8,
    image: Blog4,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
];
// const stocksData = [
//   {
//     id: 1,
//     imageSrc: "https://via.placeholder.com/300x200",
//     title: "Mastering Option Trading",
//     description:
//       "Explore key strategies and concepts to enhance your option trading skills. Gain insights from expert Jyoti Budhia.Lorem ispum",
//     rating: 4.6,
//     reviews: 1000,
//     price: 5000,
//     originalPrice: 6000,
//   },
//   {
//     id: 2,
//     imageSrc: "https://via.placeholder.com/300x200",
//     title: "Decoding Market Trends",
//     description:
//       "Stay ahead with the latest market analysis and trend predictions. Learn how to make informed trading decisions.",
//     rating: 4.8,
//     reviews: 1500,
//     price: 4500,
//     originalPrice: 5500,
//   },
//   {
//     id: 3,
//     imageSrc: "https://via.placeholder.com/300x200",
//     title: "Leveraging Trading Technology",
//     description:
//       "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
//     rating: 4.2,
//     reviews: 800,
//     price: 4000,
//     originalPrice: 5000,
//   },
//   {
//     id: 4,
//     imageSrc: "https://via.placeholder.com/300x200",
//     title: "Fundamental Analysis for Traders",
//     description:
//       "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
//     rating: 4.2,
//     reviews: 800,
//     price: 4000,
//     originalPrice: 5000,
//   },
// ];

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
            <div className={styles.blogdetailsParagraph}>
              <p>
                At Fintopedia, we believe that education should have no
                boundaries. Our mission is to make top-tier finance education
                accessible to learners worldwide, regardless of their location
                or background. Founded by a team of experts in teaching,
                technology, and design, Fintopedia was created with a vision to
                break down barriers and bring education to the fingertips of
                aspiring finance professionals.
              </p>
              <p>
                Our journey began with a simple idea: to democratize finance
                education and provide a platform where learners can gain the
                knowledge and skills needed to excel in the finance industry. We
                understand that the right education can transform lives, and we
                are dedicated to making that transformation possible for
                everyone.
              </p>
              <p>
                Through our innovative online courses, comprehensive resources,
                and expert instructors, we strive to provide an unparalleled
                learning experience. Whether you&apos;re looking to advance your
                career, switch to a new field, or simply enhance your knowledge,
                Fintopedia is here to support your educational journey every
                step of the way.
              </p>
              <p>
                Join us at Fintopedia and unlock your potential in the world of
                finance. Together, we can achieve greatness and build a brighter
                future.
              </p>
              <p>
                <Image src={BlogImage} alt="Blog Details Image" />
              </p>
              <p>
                At Fintopedia, we believe that education should have no
                boundaries. Our mission is to make top-tier finance education
                accessible to learners worldwide, regardless of their location
                or background. Founded by a team of experts in teaching,
                technology, and design, Fintopedia was created with a vision to
                break down barriers and bring education to the fingertips of
                aspiring finance professionals.
              </p>
              <p>
                Our journey began with a simple idea: to democratize finance
                education and provide a platform where learners can gain the
                knowledge and skills needed to excel in the finance industry. We
                understand that the right education can transform lives, and we
                are dedicated to making that transformation possible for
                everyone.
              </p>
            </div>
            <div className={styles.blogdetailsCards}>
              <Row className="mt-5">
                <Col md={12} className="mb-4">
                  <Card className={`${styles.blogDetailsCard}`}>
                    <div className={styles.imageContainer}>
                      <Image
                        src={BlogCourse}
                        alt="Blog Course"
                        className={styles.blogImage}
                      />
                    </div>

                    <CardBody className={styles.cardBody}>
                      <h3>Fundamentals of Swing Trading</h3>
                      <h4>Intermediate</h4>
                      <div
                        className={`d-flex align-items-center mt-4 ${styles.reviewContainer}`}
                      >
                        <h4>4.6</h4>
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
                        <span>(1000 reviews)</span>
                      </div>
                      <div className={styles.priceContainer}>
                        <h3>&#8377;2999</h3>
                        <s>&#8377;4999</s>
                        <button className={styles.addToCartButton}>
                          Add to Cart
                        </button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div className={styles.blogdetailsCardsFooter}>
                <div className={styles.leftIcons}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M14 10H18.7639C20.2507 10 21.2177 11.5646 20.5528 12.8944L17.0528 19.8944C16.714 20.572 16.0215 21 15.2639 21H11.2462C11.0827 21 10.9198 20.9799 10.7611 20.9403L7 20M14 10V5C14 3.89543 13.1046 3 12 3H11.9045C11.405 3 11 3.40497 11 3.90453C11 4.61883 10.7886 5.31715 10.3923 5.91149L7 11V20M14 10H12M7 20H5C3.89543 20 3 19.1046 3 18V12C3 10.8954 3.89543 10 5 10H7.5"
                      stroke="#F4F5F5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
                      stroke="#F4F5F5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                {/* Right side icons */}
                <div className={styles.rightIcons}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
                      stroke="#F4F5F5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 8L12 4M12 4L8 8M12 4L12 16"
                      stroke="#F4F5F5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.blogdetailsCardsAchive}>
              <Row>
                {stocks.map((card, index) => (
                  <Col md={6} key={index}>
                    <div className={styles.profileCard}>
                      <div className={styles.cardBody}>
                        <h3 className={styles.mainHeading}>
                          {card.mainHeading}
                        </h3>
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
                ))}
              </Row>
            </div>
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
                    <g clipPath="url(#clip0_1739_29310)">
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
                    <g clipPath="url(#clip0_1739_29316)">
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
                <div>
                  <FaInstagram size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.relatedBlocks}>
        <h1>Related Blogs</h1>
        <div className={styles.blogsListing}>
          <Row>
            {/* {stocksData.map((stock) => {
              return (
                <Col md={3} key={stock.id} className="mt-3">
                  <Card className={styles.blogsCard}>
                    <CardImg
                      top
                      width="100%"
                      src={stock.image}
                      alt={stock.title}
                      className={styles.blogsCardImage}
                    />
                    <CardBody className={styles.blogsCardContent}>
                      <CardTitle tag="h3" className={styles.blogsCardTitle}>
                        {stock.title}
                      </CardTitle>
                      <div className={styles.blogsCardText}>
                        <p>{stock.description}</p>
                      </div>
                      <div className={styles.blogsFooter}>
                        <a href="/blogs-details" className={styles.readmore}>
                          Read More
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })} */}
            {stocksData.map((stock) => {
              return (
                <Col
                  md={3}
                  key={stock.id}
                  className={`${styles.bolgsColumns} mt-3`}
                >
                  <Card className={styles.blogsCard}>
                    <Image
                      src={stock.image}
                      alt={stock.title}
                      className={styles.blogsCardImage}
                    />
                    <CardBody className={styles.blogsCardContent}>
                      <CardTitle tag="h3" className={styles.blogsCardTitle}>
                        {stock.title}
                      </CardTitle>
                      <div className={styles.blogsCardText}>
                        <p>{stock.description}</p>
                      </div>
                      <div className={styles.blogsFooter}>
                        <a
                          href="/blogs/blog-details"
                          className={styles.readmore}
                        >
                          Read More
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
