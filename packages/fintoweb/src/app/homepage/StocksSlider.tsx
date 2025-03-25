"use client";
import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import styles from "./StockSlider.module.css";
import RedLine from "../../assets/redLine.png";
import GreenLine from "../../assets/GreenLine.png";
import Image from "next/image";

const StocksSlider: React.FC = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    // autoplay: true,
    // autoplaySpeed: 3000,
    pauseOnHover: true,
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
            <div className={styles.widgetContent}>
              <div className={styles.widgetHeader}>S&P Futures</div>
              <div className={styles.widgetValue}>3145.0</div>
              <div className={styles.changeContainer}>
                <span className={styles.positiveChange}>
                  +18.7 <small className={styles.percentValue}>(0.57%)</small>
                </span>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <Image src={GreenLine} alt="Green Line" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetContent}>
              <div className={styles.widgetHeader}>S&P Futures</div>
              <div className={styles.widgetValue}>3145.0</div>
              <div className={styles.changeContainer}>
                <span className={styles.negativeChange}>
                  -18.7 <small className={styles.percentValue}>(0.57%)</small>
                </span>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <Image src={RedLine} alt="Red Line" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetContent}>
              <div className={styles.widgetHeader}>S&P Futures</div>
              <div className={styles.widgetValue}>5145.0</div>
              <div className={styles.changeContainer}>
                <span className={styles.negativeChange}>
                  -15.7 <small className={styles.percentValue}>(0.47%)</small>
                </span>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <Image src={RedLine} alt="Red Line" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetContent}>
              <div className={styles.widgetHeader}>S&P Futures</div>
              <div className={styles.widgetValue}>5145.0</div>
              <div className={styles.changeContainer}>
                <span className={styles.negativeChange}>
                  -15.7 <small className={styles.percentValue}>(0.47%)</small>
                </span>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <Image src={RedLine} alt="Red Line" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetContent}>
              <div className={styles.widgetHeader}>S&P Futures</div>
              <div className={styles.widgetValue}>3145.0</div>
              <div className={styles.changeContainer}>
                <span className={styles.positiveChange}>
                  +18.7 <small className={styles.percentValue}>(0.57%)</small>
                </span>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <Image src={GreenLine} alt="Green Line" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.widget}>
            <div className={styles.widgetContent}>
              <div className={styles.widgetHeader}>S&P Futures</div>
              <div className={styles.widgetValue}>3145.0</div>
              <div className={styles.changeContainer}>
                <span className={styles.positiveChange}>
                  +18.7 <small className={styles.percentValue}>(0.57%)</small>
                </span>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <Image src={GreenLine} alt="Green Line" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default StocksSlider;
