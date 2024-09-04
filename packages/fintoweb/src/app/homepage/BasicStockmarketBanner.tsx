import React from "react";
import styles from "./Homepage.module.css";

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
            10,000 +<br />
            <h6>Traders Trusted Us</h6>
          </div>
        </div>
        <div className={styles.stockmarketBannerRightContent}>
          <h2>BASICS OF </h2>
          <h3>STOCK MARKET</h3>
        </div>
      </div>
    </div>
  );
};

export default BasicStockmarketBanner;
