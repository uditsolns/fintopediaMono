"use client";

import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Card,
  ModalFooter,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import CustomInput from "../../../custom/CustomInput";
import styles from "./Event.module.css";

// import CircularLoading from "../loader/CircularLoading";

type BuyModalProps = {
  data: {
    game_id: number;
    stock_id: number;
    stock: { name: string };
    total_price: number;
    stock_current_price: number;
    round_level: number;
    remark: string;
  };
};

type FormValues = {
  game_id: string;
  user_id: string;
  stock_id: string;
  order_type: string;
  order_qty: string;
  total_price: string;
  stock_current_price: string;
  round_level: string;
};

const BuyStocks: React.FC<BuyModalProps> = (props) => {
  console.log("props", props);
  const [modal, setModal] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [login, setLogin] = useState<{
    user: { id: number };
    token: string;
  } | null>(null);
  const [news, setNews] = useState<
    {
      id: number;
      set_id: number;
      title: string;
      description: string;
      date: string;
    }[]
  >([]);
  const [filterRoundLevelData, setFilterRoundLevelData] = useState<{
    set_id: number;
  } | null>(null);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setIsPostLoading(true);
    // Perform API call or other actions here
    // Example: simulate API call
    setTimeout(() => {
      // API call successful
      setIsPostLoading(false);
      toggle();
      setSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    // Mock fetching data that was originally handled by Redux
    const mockLogin = { user: { id: 1 }, token: "mock-token" };
    const mockNews = [
      // { set_id: 1, name: "News Item 1" },
      // { set_id: 2, name: "News Item 2" },
      {
        id: 1,
        set_id: 1,
        title: "Stock Market Hits Record Highs",
        description:
          "The stock market reached new record highs today as investors remain optimistic about the economic recovery.",
        date: "August 22, 2024",
      },
      {
        id: 2,
        set_id: 1,

        title: "Tech Stocks Lead the Rally",
        description:
          "Technology stocks have led the market rally, with significant gains in companies like Apple and Microsoft.",
        date: "August 21, 2024",
      },
      {
        id: 3,
        set_id: 1,

        title: "Oil Prices Surge Amid Supply Concerns",
        description:
          "Oil prices surged today as concerns about supply disruptions in the Middle East continue to grow.",
        date: "August 20, 2024",
      },
      {
        id: 4,
        set_id: 1,
        title: "Federal Reserve Signals Rate Hike",
        description:
          "The Federal Reserve has signaled that it may raise interest rates sooner than expected, citing inflation concerns.",
        date: "August 19, 2024",
      },
    ];
    const mockFilterRoundLevelData = { set_id: 1 };

    setLogin(mockLogin);
    setNews(mockNews);
    setFilterRoundLevelData(mockFilterRoundLevelData);
  }, []);

  return (
    <div>
      <Button className="btn-success p-1" onClick={toggle} block>
        Buy
      </Button>
      <Modal className="modal-info modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className={`background-gradient ${styles["custom-modal-header"]}`}>
          {props.data?.stock?.name}
        </ModalHeader>

        <ModalBody className="background-gradient">
          <Formik
            initialValues={{
              game_id: "",
              user_id: "",
              stock_id: "",
              order_type: "Buy",
              order_qty: "",
              total_price: "",
              stock_current_price: "",
              round_level: "",
              remark: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              order_qty: Yup.number()
                .positive("This field must contain a positive number")
                .integer("This field should contain an integer")
                .required("This field is required"),
            })}
          >
            {(formProps) => {
              // Update the total price when order quantity and stock price are present
              const orderQty = parseFloat(formProps.values.order_qty);
              const stockPrice = parseFloat(
                props.data?.stock_current_price.toString() || "0"
              );
              formProps.values.total_price =
                !isNaN(orderQty) && !isNaN(stockPrice)
                  ? (orderQty * stockPrice).toFixed(2)
                  : "";

              return (
                <Form className="mt-3">
                  <Row className="form-group mt-3">
                    <Col md={12}>
                      <Label className="text-white">Stock Current Price</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="stock_current_price"
                          id="stock_current_price"
                          placeholder="Stock Current Price"
                          className={`${styles.textfield} form-control ${
                            formProps.errors.stock_current_price &&
                            formProps.touched.stock_current_price
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="stock_current_price"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group mt-3">
                    <Col md={12}>
                      <Label className="text-white">Quantity</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="order_qty"
                          id="order_qty"
                          placeholder="Select Quantity"
                          className={`${styles.textfield} form-control ${
                            formProps.errors.order_qty &&
                            formProps.touched.order_qty
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="order_qty"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group mt-3">
                    <Col md={12}>
                      <Label className="text-white">Total Price</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="total_price"
                          id="total_price"
                          placeholder="Total Price"
                          className={`${styles.textfield} form-control ${
                            formProps.errors.total_price &&
                            formProps.touched.total_price
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="total_price"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group mt-3">
                    <Col md={12}>
                      <Label className="text-white">Remarks (Optional)</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="remark"
                          id="remark"
                          placeholder="Enter Remark"
                          className={`${styles.textfield} form-control ${
                            formProps.errors.remark && formProps.touched.remark
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="remark"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={12}>
                      <Button
                        type="submit"
                        disabled={isPostLoading}
                        color="light"
                        block
                        className="font-bold"
                      >
                        {/* {isPostLoading ? <CircularLoading /> : "BUY"} */}Buy
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
          <h2 className="text-start mt-3 mb-3 font-bold">Catch up with latest news</h2>
          <div className={styles["news-scroll-container"]}>
            {news.length > 0 && (
              <>
                {news.map((el, i) => (
                  <Card key={i} className={`${styles["news-card"]} m-2 p-2`}>
                    <CardBody>
                      <CardTitle tag="h6">{el.title}</CardTitle>
                      <CardText>{el.description}</CardText>
                    </CardBody>
                  </Card>
                ))}
              </>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BuyStocks;
