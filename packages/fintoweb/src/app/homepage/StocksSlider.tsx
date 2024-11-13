'use client';
import React from 'react';
import Slider from 'react-slick';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import styles from './StockSlider.module.css'; 

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
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle className={styles.cardTitle}>Stock A</CardTitle>
              <CardText>Price: $150</CardText>
              <CardText>Change: +1.5%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle className={styles.cardTitle}>Stock B</CardTitle>
              <CardText>Price: $220</CardText>
              <CardText>Change: -0.8%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle className={styles.cardTitle}>Stock C</CardTitle>
              <CardText>Price: $90</CardText>
              <CardText>Change: +2.3%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle className={styles.cardTitle}>Stock D</CardTitle>
              <CardText>Price: $300</CardText>
              <CardText>Change: +0.5%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle className={styles.cardTitle}>Stock E</CardTitle>
              <CardText>Price: $300</CardText>
              <CardText>Change: +0.5%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle className={styles.cardTitle}>Stock F</CardTitle>
              <CardText>Price: $300</CardText>
              <CardText>Change: +0.5%</CardText>
            </CardBody>
          </Card>
        </div>
      </Slider>
    </div>
  );
};

export default StocksSlider;
