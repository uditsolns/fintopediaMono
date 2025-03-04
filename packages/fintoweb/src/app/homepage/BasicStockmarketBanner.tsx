import React from "react";
import styles from "./Homepage.module.css";
import Image from "next/image";
import BasicStock from "../../assets/basic-stock-text-image.png";
import subscribers from "../../assets/subscribers.png";

const BasicStockmarketBanner = () => {
  return (
    <div className={styles.stockmarketBanner}>
      <div className={styles.overlay}>
        <div className={styles.stockmarketBannerContent}>
          <h2>
            Explore Top Finance Courses
            <br /> to Boost Your Career
          </h2>
          <p>
            Discover a diverse range of online courses designed to cater to
            learners of all levels, interests, and ambitions.
          </p>
          <button>Explore Menu</button>
          <div className={styles.countBtn}>
            <div>
              <Image src={subscribers} alt="subscribers" />
            </div>
            <div>
              10,000 +<br />
              <h6>Traders Trusted Us</h6>
            </div>
          </div>
        </div>
        <div className={styles.stockmarketBannerRightContent}>
          <Image src={BasicStock} alt="BASICS OF STOCK MARKET" />
        </div>
      </div>
    </div>
  );
};

export default BasicStockmarketBanner;
