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
    slidesToShow: 4, 
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
        breakpoint: 768, // For screens 768px and below
        settings: {
          slidesToShow: 2, // Show 2 slides on smaller tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // For screens 576px and below (common mobile breakpoint)
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile devices
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle tag="h5">Stock A</CardTitle>
              <CardText>Price: $150</CardText>
              <CardText>Change: +1.5%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle tag="h5">Stock B</CardTitle>
              <CardText>Price: $220</CardText>
              <CardText>Change: -0.8%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle tag="h5">Stock C</CardTitle>
              <CardText>Price: $90</CardText>
              <CardText>Change: +2.3%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle tag="h5">Stock D</CardTitle>
              <CardText>Price: $300</CardText>
              <CardText>Change: +0.5%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle tag="h5">Stock E</CardTitle>
              <CardText>Price: $300</CardText>
              <CardText>Change: +0.5%</CardText>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card className={styles.stockCard}>
            <CardBody>
              <CardTitle tag="h5">Stock F</CardTitle>
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
