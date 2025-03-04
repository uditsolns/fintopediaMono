"use client";

import { useEffect } from "react";
import styles from "./CardCarousel.module.css"; // Import CSS module

const Page = () => {
  useEffect(() => {
    // Ensure the Swiper library is available on the global window object
    const Swiper = window.Swiper;

    if (Swiper) {
      // Initialize Swiper after the DOM is fully loaded
      const swiper = new Swiper(".swiper-container", {
        spaceBetween: 20,
        slidesPerView: 3, // Show 3 cards by default on desktop
        centeredSlides: true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1, // Show 1 card on mobile
            spaceBetween: 10,
            centeredSlides: true,
          },
          600: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
          },
        },
      });
    } else {
      console.error("Swiper is not available on the window object");
    }
  }, []);

  return (
    <div className={styles["swiper-container"]}>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className={styles.card}>Card 1</div>
        </div>
        <div className="swiper-slide">
          <div className={styles.card}>Card 2</div>
        </div>
        <div className="swiper-slide">
          <div className={styles.card}>Card 3</div>
        </div>
        <div className="swiper-slide">
          <div className={styles.card}>Card 4</div>
        </div>
        <div className="swiper-slide">
          <div className={styles.card}>Card 5</div>
        </div>
        <div className="swiper-slide">
          <div className={styles.card}>Card 6</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
