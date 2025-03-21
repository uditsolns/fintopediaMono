"use client";

import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Logo from "../../assets/Fintopedia logo-White.png";
import { Col, Row } from "reactstrap";
import Link from "next/link";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@src/components/loader/LoadingOverlay";

export const Footer = () => {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const { courses, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const currentYear = new Date().getFullYear();
  const links = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/courses", label: "Courses" },
    { path: "/contact-us", label: "Contact Us" },
  ];
  const [loading, setLoading] = React.useState(false);

  const handleRouteClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    setLoading(true);
    router.push(path);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (auth?.token) {
      router.push("/games");
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <>
      <LoadingOverlay isLoading={loading} />
      <footer className={styles.footer}>
        <Row>
          <Col md={6}>
            <div className={styles.aboutContetnFooter}>
              <Image src={Logo} alt="Logo" />
              <p>
                Discover a diverse range of online courses
                <br /> designed to cater to learners of all levels,
                <br /> interests, and ambitions.
              </p>
            </div>
            <div className={styles.ratingFooter}>
              <div className={styles.ratingIconFooter}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="34"
                  viewBox="0 0 33 34"
                  fill="none"
                >
                  <g clip-path="url(#clip0_3608_1047)">
                    <path
                      d="M31.1665 15.8825C31.5072 15.6287 31.7599 15.2746 31.8892 14.8699C32.0185 14.4653 32.018 14.0303 31.8876 13.6259C31.7572 13.2216 31.5035 12.8682 31.1621 12.6153C30.8208 12.3625 30.4088 12.2228 29.984 12.2158L21.734 11.9041C21.6935 11.9013 21.6546 11.8869 21.622 11.8625C21.5895 11.8381 21.5647 11.8048 21.5507 11.7666L18.6999 4.06665C18.5566 3.6749 18.2965 3.33663 17.9546 3.09764C17.6128 2.85864 17.2057 2.73047 16.7886 2.73047C16.3715 2.73047 15.9645 2.85864 15.6226 3.09764C15.2807 3.33663 15.0206 3.6749 14.8774 4.06665L12.0357 11.7941C12.0216 11.8323 11.9969 11.8656 11.9643 11.89C11.9318 11.9144 11.8929 11.9288 11.8524 11.9316L3.60235 12.2433C3.17758 12.2503 2.76562 12.39 2.42425 12.6428C2.08288 12.8957 1.82921 13.2491 1.69881 13.6534C1.56842 14.0578 1.56783 14.4928 1.69714 14.8974C1.82645 15.3021 2.07916 15.6562 2.41985 15.91L8.89152 20.9975C8.92391 21.023 8.94812 21.0574 8.96115 21.0965C8.97418 21.1356 8.97547 21.1777 8.96485 21.2175L6.73735 29.11C6.62193 29.5119 6.63311 29.9396 6.76938 30.3349C6.90565 30.7302 7.1604 31.074 7.49897 31.3194C7.83753 31.5648 8.24348 31.7 8.66158 31.7065C9.07968 31.713 9.48964 31.5906 9.83569 31.3558L16.674 26.7725C16.7077 26.7492 16.7477 26.7368 16.7886 26.7368C16.8295 26.7368 16.8695 26.7492 16.9032 26.7725L23.7415 31.3558C24.0829 31.5986 24.4914 31.729 24.9103 31.729C25.3292 31.729 25.7377 31.5986 26.079 31.3558C26.4177 31.1127 26.6727 30.7706 26.8089 30.3767C26.9452 29.9827 26.956 29.5562 26.8399 29.1558L24.594 21.2358C24.5821 21.1961 24.5828 21.1536 24.5959 21.1142C24.609 21.0748 24.634 21.0405 24.6674 21.0158L31.1665 15.8825Z"
                      fill="#FFA11A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3608_1047">
                      <rect
                        width="33"
                        height="33"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className={styles.ratingContentFooter}>
                <h4>4.8/5</h4>
                <p>12K Reviews</p>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4}>
                {/* onClick={(e) => handleRouteClick(e, link.path)} */}
                <div className={styles.footerLinks}>
                  <h3>Quick Links</h3>
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      prefetch={true}
                      className={styles.links}
                      onClick={(e) => handleRouteClick(e, link.path)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </Col>
              <Col md={4}>
                <div className={styles.footerLinks}>
                  <h3>Courses</h3>
                  {courses?.length > 0 &&
                    courses
                      ?.filter((item) => item.is_popular === 1)
                      ?.slice(0, 4)
                      ?.map((course) => {
                        const truncateCourseName = (name) => {
                          return name.length > 12
                            ? `${name.slice(0, 12)}...`
                            : name;
                        };

                        return (
                          <Link
                            href={`/courses/course-details/${course.id}`}
                            prefetch={true}
                            className={styles.links}
                            key={course.id}
                          >
                            {truncateCourseName(course?.name)}
                          </Link>
                        );
                      })}
                </div>
              </Col>
              <Col md={4}>
                <div className={styles.footerLinks}>
                  <h3>Categories</h3>
                  <Link href="/blogs" prefetch={true} className={styles.links}>
                    Blogs
                  </Link>
                  <Link href="/" prefetch={true} className={styles.links}>
                    Case Studies
                  </Link>
                  <a onClick={handleClick} className={styles.links}>
                    Events
                  </a>
                  <Link href="/" prefetch={true} className={styles.links}>
                    Press Release
                  </Link>
                  <Link href="/" prefetch={true} className={styles.links}>
                    Press Coverage
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="mt-5">
          <hr />
        </div>

        <div className={styles.footerContainer}>
          <h5>© {currentYear} Fintopedia</h5>
          <div className={styles.footerLinksRow}>
            <Link href="/privacy-policy" prefetch={true}>
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" prefetch={true}>
              Cookie Policy
            </Link>
            <Link href="/sitemap" prefetch={true}>
              Sitemap
            </Link>
            <Link href="/terms-conditions" prefetch={true}>
              Terms of Use
            </Link>
          </div>
          <div className={styles.footerIcons}>
            <a
              href="https://www.instagram.com/fintopedia_official/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  opacity="0.1"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.0009 7.4668C13.6834 7.4668 13.3925 7.47693 12.4823 7.51835C11.5739 7.55995 10.9538 7.70378 10.4112 7.9148C9.84993 8.13276 9.37384 8.42432 8.89952 8.89881C8.42485 9.37313 8.13329 9.84922 7.91462 10.4103C7.70307 10.9531 7.55906 11.5733 7.51818 12.4814C7.47746 13.3917 7.4668 13.6827 7.4668 16.0002C7.4668 18.3178 7.47711 18.6077 7.51835 19.5179C7.56013 20.4264 7.70395 21.0465 7.9148 21.5891C8.13294 22.1503 8.4245 22.6264 8.89899 23.1007C9.37313 23.5754 9.84922 23.8677 10.4101 24.0856C10.9531 24.2967 11.5733 24.4405 12.4816 24.4821C13.3918 24.5235 13.6825 24.5336 15.9999 24.5336C18.3176 24.5336 18.6075 24.5235 19.5178 24.4821C20.4262 24.4405 21.047 24.2967 21.59 24.0856C22.151 23.8677 22.6264 23.5754 23.1006 23.1007C23.5752 22.6264 23.8668 22.1503 24.0855 21.5893C24.2952 21.0465 24.4392 20.4262 24.4819 19.5181C24.5228 18.6079 24.5335 18.3178 24.5335 16.0002C24.5335 13.6827 24.5228 13.3918 24.4819 12.4816C24.4392 11.5732 24.2952 10.9531 24.0855 10.4105C23.8668 9.84922 23.5752 9.37313 23.1006 8.89881C22.6259 8.42414 22.1512 8.13258 21.5894 7.9148C21.0454 7.70378 20.425 7.55995 19.5165 7.51835C18.6063 7.47693 18.3165 7.4668 15.9983 7.4668H16.0009ZM15.2354 9.00457C15.4626 9.00421 15.7161 9.00457 16.0009 9.00457C18.2793 9.00457 18.5494 9.01274 19.4491 9.05363C20.2811 9.09168 20.7327 9.2307 21.0335 9.3475C21.4317 9.50217 21.7156 9.68706 22.0141 9.98573C22.3128 10.2844 22.4977 10.5688 22.6527 10.9671C22.7695 11.2675 22.9087 11.7191 22.9466 12.5511C22.9875 13.4507 22.9963 13.7209 22.9963 15.9982C22.9963 18.2756 22.9875 18.5458 22.9466 19.4454C22.9085 20.2774 22.7695 20.729 22.6527 21.0294C22.498 21.4276 22.3128 21.7112 22.0141 22.0097C21.7154 22.3084 21.4319 22.4932 21.0335 22.6479C20.733 22.7652 20.2811 22.9039 19.4491 22.942C18.5495 22.9828 18.2793 22.9917 16.0009 22.9917C13.7223 22.9917 13.4522 22.9828 12.5527 22.942C11.7207 22.9036 11.2691 22.7645 10.9681 22.6477C10.5699 22.4931 10.2855 22.3082 9.98679 22.0095C9.68812 21.7108 9.50323 21.4271 9.3482 21.0287C9.2314 20.7282 9.0922 20.2767 9.05433 19.4447C9.01344 18.5451 9.00527 18.2749 9.00527 15.9961C9.00527 13.7173 9.01344 13.4485 9.05433 12.549C9.09238 11.717 9.2314 11.2654 9.3482 10.9646C9.50287 10.5664 9.68812 10.2819 9.98679 9.98324C10.2855 9.68457 10.5699 9.49968 10.9681 9.34466C11.2689 9.22732 11.7207 9.08866 12.5527 9.05043C13.3399 9.01488 13.645 9.00421 15.2354 9.00243V9.00457ZM20.556 10.4215C19.9906 10.4215 19.532 10.8796 19.532 11.4451C19.532 12.0105 19.9906 12.4691 20.556 12.4691C21.1213 12.4691 21.58 12.0105 21.58 11.4451C21.58 10.8798 21.1213 10.4215 20.556 10.4215ZM16.0009 11.6179C13.5808 11.6179 11.6187 13.5801 11.6187 16.0002C11.6187 18.4203 13.5808 20.3816 16.0009 20.3816C18.4211 20.3816 20.3825 18.4203 20.3825 16.0002C20.3825 13.5801 18.4211 11.6179 16.0009 11.6179ZM16.0009 13.1557C17.5718 13.1557 18.8454 14.4292 18.8454 16.0002C18.8454 17.5711 17.5718 18.8447 16.0009 18.8447C14.4299 18.8447 13.1564 17.5711 13.1564 16.0002C13.1564 14.4292 14.4299 13.1557 16.0009 13.1557Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61551172396495"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  opacity="0.1"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                  fill="#1877F2"
                />

                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.5 16.5h-3.3v10h-4v-10h-2v-3.8h2v-2.4c0-2.8 1.6-4.4 4.1-4.4 1.2 0 2.4.1 2.7.2v3h-1.8c-1.5 0-1.9.7-1.9 1.8v2.2h3.7l-1 3.8z"
                  fill="white"
                />
              </svg>
            </a>
            <a href="https://x.com/fintopedia" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  opacity="0.1"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.5208 13.0046L15.5544 13.5582L14.9948 13.4905C12.9579 13.2306 11.1784 12.3493 9.66756 10.8692L8.92891 10.1347L8.73865 10.6771C8.33575 11.886 8.59316 13.1628 9.43253 14.0215C9.8802 14.496 9.77948 14.5638 9.00725 14.2814C8.73865 14.191 8.50363 14.1232 8.48124 14.1571C8.4029 14.2362 8.6715 15.2643 8.88414 15.6711C9.17513 16.236 9.76828 16.7897 10.4174 17.1173L10.9658 17.3772L10.3167 17.3885C9.68994 17.3885 9.66756 17.3998 9.73471 17.6371C9.95854 18.3715 10.8427 19.1511 11.8276 19.4901L12.5214 19.7273L11.9171 20.0889C11.0218 20.6086 9.96973 20.9024 8.91772 20.925C8.41409 20.9363 8 20.9815 8 21.0154C8 21.1284 9.36538 21.7611 10.16 22.0097C12.5438 22.7441 15.3753 22.4277 17.5017 21.1736C19.0126 20.281 20.5235 18.5071 21.2286 16.7897C21.6091 15.8745 21.9896 14.2023 21.9896 13.4001C21.9896 12.8803 22.0232 12.8125 22.6499 12.1911C23.0192 11.8295 23.3662 11.4341 23.4333 11.3211C23.5452 11.1064 23.534 11.1064 22.9633 11.2985C22.012 11.6375 21.8777 11.5923 22.3477 11.0838C22.6947 10.7223 23.1088 10.0669 23.1088 9.87487C23.1088 9.84097 22.9409 9.89747 22.7506 9.99916C22.5492 10.1121 22.1015 10.2816 21.7658 10.3833L21.1614 10.5754L20.613 10.2025C20.3108 9.99916 19.8856 9.77318 19.6617 9.70539C19.0909 9.54721 18.218 9.56981 17.7032 9.75059C16.3042 10.259 15.4201 11.5697 15.5208 13.0046Z"
                  fill="white"
                />
              </svg>
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                opacity="0.1"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                fill="#0077B5"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.6679 10.499C23.4022 10.7005 23.9805 11.2943 24.1768 12.0483C24.5335 13.4148 24.5335 16.2661 24.5335 16.2661C24.5335 16.2661 24.5335 19.1174 24.1768 20.484C23.9805 21.238 23.4022 21.8317 22.6679 22.0334C21.3371 22.3995 16.0001 22.3995 16.0001 22.3995C16.0001 22.3995 10.6632 22.3995 9.3323 22.0334C8.59795 21.8317 8.01962 21.238 7.82335 20.484C7.4668 19.1174 7.4668 16.2661 7.4668 16.2661C7.4668 16.2661 7.4668 13.4148 7.82335 12.0483C8.01962 11.2943 8.59795 10.7005 9.3323 10.499C10.6632 10.1328 16.0001 10.1328 16.0001 10.1328C16.0001 10.1328 21.3371 10.1328 22.6679 10.499ZM14.4001 13.8661V19.1994L18.6668 16.5329L14.4001 13.8661Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </footer>
    </>
  );
};
