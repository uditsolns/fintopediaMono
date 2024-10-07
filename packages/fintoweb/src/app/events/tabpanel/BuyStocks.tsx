"use client";

import React, { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import styles from "./Event.module.css";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { useBuySellHelper } from "shared/src/components/structures/buy-sell/buySell.helper";
import { buySellField } from "shared/src/components/structures/buy-sell/buySellModel";
import {
  useAppSelector,
  useAppDispatch,
} from "shared/src/provider/store/types/storeTypes";
import CircularLoading from "@src/components/loader/CircularLoading";
import { StockDatasResponse } from "shared/src/utils/types/stockDatas";

interface Props {
  data: StockDatasResponse;
}
const BuyStocks: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { news } = useAppSelector((state) => state.news);
  const { transactions, loading, create } = useAppSelector(
    (state) => state.transactions
  );

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const { buySellFormik, buySellInputProps } = useBuySellHelper();
  const { handleSubmit, isSubmitting, setFieldValue, values, resetForm } =
    buySellFormik;
  const [totalPrice, setTotalPrice] = useState(0);

  React.useEffect(() => {
    const currentPrice = parseFloat(values.stock_current_price?.trim() || "0");
    const orderQty = parseFloat(values.order_qty?.trim() || "0");

    if (!isNaN(currentPrice) && !isNaN(orderQty)) {
      const calculatedTotalPrice = currentPrice * orderQty;
      setTotalPrice(calculatedTotalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [values.order_qty, values.stock_current_price]);

  React.useEffect(() => {
    setFieldValue(buySellField.game_id.name, props.data.game_id);
    setFieldValue(
      buySellField.stock_current_price.name,
      props.data.stock_current_price
    );
    setFieldValue(buySellField.user_id.name, auth?.user?.id);
    setFieldValue(buySellField.stock_id.name, props.data?.stock_id);
    setFieldValue(buySellField.order_type.name, "Buy");
    setFieldValue(buySellField.round_level.name, props.data?.round_level);
    setFieldValue(buySellField.order_qty.name, values.order_qty);
    setFieldValue(buySellField.total_price.name, totalPrice);
  }, [values.order_qty, values.stock_current_price, totalPrice]);

  return (
    <div>
      <Button className="btn-success p-1" onClick={toggle} block>
        Buy
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
                disabled
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
                onClick={() => {
                  handleSubmit();
                  setModal(false);
                  resetForm();
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

export default BuyStocks;
