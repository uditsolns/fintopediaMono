"use client";
import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import styles from "./StockSlider.module.css";

const StocksSlider: React.FC = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <h3>Top stocks in the market</h3>
      <Slider {...settings}>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>S&P Futures</div>
            <div className={styles.widgetValue}>3145.0</div>
            <div className={styles.changeContainer}>
              <span className={styles.positiveChange}>+18.7 (0.57%)</span>
              <div className={styles.iconContainer}>
                <svg
                  width="64"
                  height="32"
                  viewBox="0 0 64 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.positiveIcon}
                >
                  <path d="M1 31L16 24L32 16L48 8L63 1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>S&P Futures</div>
            <div className={styles.widgetValue}>3145.0</div>
            <div className={styles.changeContainer}>
              <span className={styles.negativeChange}>-18.7 (0.57%)</span>
              <div className={styles.iconContainer}>
                <svg
                  width="64"
                  height="32"
                  viewBox="0 0 64 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.negativeIcon}
                >
                  <path d="M1 1L16 8L32 16L48 24L63 31" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>S&P Futures</div>
            <div className={styles.widgetValue}>3145.0</div>
            <div className={styles.changeContainer}>
              <span className={styles.positiveChange}>+18.7 (0.57%)</span>
              <div className={styles.iconContainer}>
                <svg
                  width="64"
                  height="32"
                  viewBox="0 0 64 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.positiveIcon}
                >
                  <path d="M1 31L16 24L32 16L48 8L63 1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>S&P Futures</div>
            <div className={styles.widgetValue}>3145.0</div>
            <div className={styles.changeContainer}>
              <span className={styles.negativeChange}>-18.7 (0.57%)</span>
              <div className={styles.iconContainer}>
                <svg
                  width="64"
                  height="32"
                  viewBox="0 0 64 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.negativeIcon}
                >
                  <path d="M1 1L16 8L32 16L48 24L63 31" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>S&P Futures</div>
            <div className={styles.widgetValue}>3145.0</div>
            <div className={styles.changeContainer}>
              <span className={styles.positiveChange}>+18.7 (0.57%)</span>
              <div className={styles.iconContainer}>
                <svg
                  width="64"
                  height="32"
                  viewBox="0 0 64 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.positiveIcon}
                >
                  <path d="M1 31L16 24L32 16L48 8L63 1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>S&P Futures</div>
            <div className={styles.widgetValue}>3145.0</div>
            <div className={styles.changeContainer}>
              <span className={styles.negativeChange}>-18.7 (0.57%)</span>
              <div className={styles.iconContainer}>
                <svg
                  width="64"
                  height="32"
                  viewBox="0 0 64 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.negativeIcon}
                >
                  <path d="M1 1L16 8L32 16L48 24L63 31" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default StocksSlider;
