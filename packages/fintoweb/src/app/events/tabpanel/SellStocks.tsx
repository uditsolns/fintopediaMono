"use client";

import React, { useState, useEffect } from "react";

import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import styles from "./Event.module.css";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { useBuySellHelper } from "shared/src/components/structures/buy-sell/buySell.helper";
import { buySellField } from "shared/src/components/structures/buy-sell/buySellModel";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import CircularLoading from "@src/components/loader/CircularLoading";

interface Props {
  data: {
    id: number;
    game_id: number;
    user_id: number;
    stock_id: number;
    order_type: string;
    order_qty: number;
    total_price: number;
    stock_current_price: number;
    round_level: number;
    stock: {
      name: string;
    };
  };
}

const SellStocks: React.FC<Props> = (props) => {
  const { auth } = useAppSelector((state) => state.auth);
  const { news } = useAppSelector((state) => state.news);
  const { transactions, loading } = useAppSelector(
    (state) => state.transactions
  );

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const { buySellFormik, buySellInputProps } = useBuySellHelper();
  const { handleSubmit, isSubmitting, setFieldValue } = buySellFormik;
  React.useEffect(() => {
    setFieldValue(buySellField.game_id.name, props.data.game_id);
    setFieldValue(buySellField.user_id.name, auth?.user?.id);
    setFieldValue(buySellField.stock_id.name, props.data?.stock_id);
    setFieldValue(buySellField.order_type.name, "Sell");
    setFieldValue(buySellField.round_level.name, props.data?.round_level);
  }, []);

  // {
  //   game_id: "",
  //   user_id: "",
  //   stock_id: "",
  //   order_type: "Sell",
  //   order_qty: "",
  //   total_price: "",
  //   stock_current_price: "",
  //   round_level: "",
  //   remark: "",
  // }
  return (
    <div>
      <Button className="btn-warning p-1" onClick={toggle} block>
        Sell
      </Button>
      <Modal className="modal-info modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          className={`background-gradient ${styles["custom-modal-header"]}`}
        >
          {props.data?.stock?.name}
        </ModalHeader>

        <ModalBody className="background-gradient">
          <Row className="form-group mt-3">
            <Col md={12}>
              <InputAtom
                label={buySellField.stock_current_price.label}
                placeholder={buySellField.stock_current_price.placeHolder}
                {...buySellInputProps(buySellField.stock_current_price.name)}
              />
            </Col>
          </Row>
          <Row className="form-group mt-3">
            <Col md={12}>
              <InputAtom
                label={buySellField.order_qty.label}
                placeholder={buySellField.order_qty.placeHolder}
                {...buySellInputProps(buySellField.order_qty.name)}
              />
            </Col>
          </Row>
          <Row className="form-group mt-3">
            <Col md={12}>
              <InputAtom
                label={buySellField.total_price.label}
                placeholder={buySellField.total_price.placeHolder}
                {...buySellInputProps(buySellField.total_price.name)}
              />
            </Col>
          </Row>
          <Row className="mt-3 mb-3 row">
            <Col className="col-12">
              <Button
                type="submit"
                className="btn btn-light font-bold text-black"
                size="lg"
                block
                // disabled={isSubmitting}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading.create ? <CircularLoading /> : "Buy"}
              </Button>
            </Col>
          </Row>
          <h2 className="text-start mt-3 mb-3 font-bold">
            Catch up with latest news
          </h2>
          <div className={styles["news-scroll-container"]}>
            {news.length > 0 && (
              <>
                {news.map((el, i) => (
                  <Card key={i} className={`${styles["news-card"]} m-2 p-2`}>
                    <CardBody>
                      <CardTitle tag="h6">{el.name}</CardTitle>
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

export default SellStocks;
