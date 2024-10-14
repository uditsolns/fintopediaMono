"use client";
import React from "react";
import { Card, Row, Col } from "reactstrap";
import TabPanel from "./tabpanel/TabPanel";

const Events: React.FC = () => {
  return (
    <section className="background-gradient p-0">
      <div className="container-fluid p-3">
        <Card body className="p-2 bgBlack">
          <Row className="portfolio-header d-flex justify-content-between align-items-center text-center">
            <Col xs="3">
              <h5 className="text-left text-gray-300">
                Timing :<br /> <span className="font-bold text-light">05:00:00</span>
              </h5>
            </Col>
            <Col xs="3">
              <h5 className="text-center text-gray-300">
                V.Balance <br /> <span className="font-bold text-light">1,000.00</span>
              </h5>
            </Col>
            <Col xs="6" md="6" lg="6">
              <h5 className="text-right text-gray-300">
                Total Portfolio Value <br /> <span className="font-bold text-light">2,000.00</span>
              </h5>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="container-fluid p-3">
        <TabPanel />
      </div>
    </section>
  );
};
export default Events;