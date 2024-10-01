"use client";

import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { getNews } from "shared/src/provider/store/services/news.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import LightLoading from "@src/components/loader/LightLoading";

const LatestNews: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, loading } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews());
  }, []);
  return (
    <div>
      <Container>
        <Row className="mt-5">
          {loading?.news ? (
            <div className="d-flex justify-content-center align-items-center p-5">
              <LightLoading />
            </div>
          ) : news.length === 0 ? (
            <div className="text-center text-white p-3">
              No news available at the moment.
            </div>
          ) : (
            news.map((item) => {
              return (
                <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
                  <Card
                    style={{
                      border: "none",
                      backgroundColor: "#121622",
                      color: "#fff",
                      height:"120px"
                    }}
                  > 
                    <CardBody>
                      <CardTitle tag="h5" className="font-weight-bold">
                        {item.name}
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default LatestNews;
