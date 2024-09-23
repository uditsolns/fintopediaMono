"use client";

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

// Dummy stock news data
const stockNews = [
  {
    id: 1,
    title: "Stock Market Hits Record Highs",
    description:
      "The stock market reached new record highs today as investors remain optimistic about the economic recovery.",
    date: "August 22, 2024",
  },
  {
    id: 2,
    title: "Tech Stocks Lead the Rally",
    description:
      "Technology stocks have led the market rally, with significant gains in companies like Apple and Microsoft.",
    date: "August 21, 2024",
  },
  {
    id: 3,
    title: "Oil Prices Surge Amid Supply Concerns",
    description:
      "Oil prices surged today as concerns about supply disruptions in the Middle East continue to grow.",
    date: "August 20, 2024",
  },
  {
    id: 4,
    title: "Federal Reserve Signals Rate Hike",
    description:
      "The Federal Reserve has signaled that it may raise interest rates sooner than expected, citing inflation concerns.",
    date: "August 19, 2024",
  },
  // Add more news items here
];

const LatestNews: React.FC = () => {
  return (
    <div>
      <Container>
        <Row>
          {stockNews.map((news) => (
            <Col key={news.id} xs={12} sm={6} md={4} className="mb-4">
              <Card style={{ border: "none", backgroundColor: "#121622" ,color:"#fff" }}>
                <CardBody>
                  <CardTitle tag="h5" className="font-weight-bold">
                    {news.title}
                  </CardTitle>
                  <CardText>{news.description}</CardText>
                  <CardText>
                    <small className="text-muted text-white">{news.date}</small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LatestNews;
