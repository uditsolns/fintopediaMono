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
} from "reactstrap";
import styles from "./Event.module.css";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { useBuySellHelper } from "shared/src/components/structures/buy-sell/buySell.helper";
import { buySellField } from "shared/src/components/structures/buy-sell/buySellModel";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import CircularLoading from "@src/components/loader/CircularLoading";
import { StockDatasResponse } from "shared/src/utils/types/stockDatas";
import { toast } from "react-toastify";

interface Props {
  data: StockDatasResponse;
}

const SellStocks: React.FC<Props> = (props) => {
  const { auth } = useAppSelector((state) => state.auth);
  const { news } = useAppSelector((state) => state.news);
  const { create, loading } = useAppSelector((state) => state.transactions);
  const { filterRoundLevelData } = useAppSelector((state) => state.roundLevel);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { buySellFormik, buySellInputProps } = useBuySellHelper();
  const { handleSubmit, setFieldValue, values } = buySellFormik;

  React.useEffect(() => {
    setFieldValue(buySellField.game_id.name, props.data?.game_id);
    setFieldValue(buySellField.user_id.name, auth?.user?.id);
    setFieldValue(buySellField.stock_id.name, props.data?.stock_id);
    setFieldValue(buySellField.order_type.name, "Sell");
    setFieldValue(buySellField.round_level.name, props.data?.round_level);
  }, [props.data, modal]);

  React.useEffect(() => {
    const stock_filter_amount = props.data?.stock?.stock_datas!.find((e3) => {
      return (
        e3.game_id == filterRoundLevelData?.game_id &&
        e3.round_level == filterRoundLevelData?.round_level
      );
    });
    let current_price: string =
      stock_filter_amount?.stock_current_price?.toString() || "0";
    let quantity: string = values.order_qty?.trim()?.toString() || "0";
    const cleanCurrentPrice = parseFloat(current_price.replace(/,/g, "")) || 0;
    const cleanQuantity = parseFloat(quantity.replace(/,/g, "")) || 0;
    const totalPrice = (cleanQuantity * cleanCurrentPrice).toString();
    setFieldValue(buySellField.total_price.name, totalPrice);
    setFieldValue(buySellField.stock_current_price.name, cleanCurrentPrice);
  }, [props.data, values.order_qty, values.stock_current_price, modal]);

  const sellStock = () => {
    const filterOrderQty = props.data?.user?.user_transactions?.find(
      (el) => el?.stock_id == props.data?.stock_id
    );
    if (Number(values.order_qty) > filterOrderQty?.order_qty) {
      toast.warning("Quantity is less than equal to total quantity", {
        type: "error",
      });
    } else {
      handleSubmit();
    }
  };
  React.useEffect(() => {
    if (create && create?.id) {
      setModal(false);
    }
  }, [create]);
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
                onClick={sellStock}
              >
                {loading.create ? <CircularLoading /> : "Sell"}
              </Button>
            </Col>
          </Row>
          <h2 className="text-start mt-3 mb-3 font-bold">
            Catch up with latest news
          </h2>
          <div className={styles["news-scroll-container"]}>
            {news.length > 0 &&
              news
                ?.filter((item) => item.set_id == filterRoundLevelData?.set_id)
                .map((el, i) => (
                  <Card key={i} className={`${styles["news-card"]} m-2 p-2`}>
                    <CardBody>
                      <CardTitle tag="h6">{el.name}</CardTitle>
                    </CardBody>
                  </Card>
                ))}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SellStocks;
