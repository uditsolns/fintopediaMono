"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "reactstrap";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Event.module.css";
import { FaArrowRotateRight } from "react-icons/fa6";
import SellStocks from "./SellStocks";
import {
  useAppSelector,
  useAppDispatch,
} from "shared/src/provider/store/types/storeTypes";
import { getTransactions } from "shared/src/provider/store/services/transactions.service";
import { toast } from "react-toastify";
import { resetTransaction } from "shared/src/provider/store/reducers/transactions.reducer";

const Portfolio: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading, create } = useAppSelector(
    (state) => state.transactions
  );
  const { auth } = useAppSelector((state) => state.auth);
  const { filterRoundLevelData } = useAppSelector((state) => state.roundLevel);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  console.log("data", data);
  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const key: keyof (typeof transactions)[number] = "stock_id";

  useEffect(() => {
    if (transactions) {
      const filteredData = transactions.filter((item) => {
        const userTransaction = item.user?.user_transactions?.find(
          (el) => el.stock_id === item.stock_id
        );
        console.log("userTransaction", userTransaction);

        const orderQty = userTransaction?.order_qty;
        return (
          item.user_id === auth?.user?.id &&
          item.order_type === "Buy" &&
          orderQty !== undefined &&
          parseInt(orderQty) > 0
        );
      });

      const reverseData = [...filteredData].reverse();
      const uniqueMap = new Map(reverseData.map((item) => [item[key], item]));
      const uniqueFilteredData = Array.from(uniqueMap.values());

      setFilterData(uniqueFilteredData);
      setData(uniqueFilteredData);
    }
  }, [transactions, auth]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    if (create?.id) {
      toast.success("Sell successfully !", {
        position: "top-right",
        theme: "light",
      });
      dispatch(resetTransaction());
    }
  }, [create]);
  return (
    <React.Fragment>
      <div className={styles["inline-row"]}>
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search..."
          className={`${styles["search-textfield"]}`}
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className={styles["search-icon"]} />
              </InputAdornment>
            ),
            classes: {
              input: styles["search-input"],
            },
          }}
          InputLabelProps={{
            className: styles["search-placeholder"],
          }}
          variant="outlined"
        />
        <Button
          // onClick={() => setData(allData)}
          className={`${styles["search-button"]}`}
        >
          <FaArrowRotateRight />
        </Button>
      </div>
      <Row className="mt-3">
        <Col md={12}>
          <Table className={styles["custom-table"]}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Buying Price</th>
                <th>Current Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.filter((user) =>
                user.stock.name
                  .trim()
                  .toLowerCase()
                  .includes(searchTerm.trim().toLowerCase())
              ).length > 0 ? (
                data
                  ?.filter((user) =>
                    user.stock.name
                      .trim()
                      .toLowerCase()
                      .includes(searchTerm.trim().toLowerCase())
                  )
                  .map((el, index) => {
                    if (el.order_type == "Buy")
                      return (
                        <tr key={index}>
                          <td>{el.stock.name}</td>
                          <td>
                            {el?.user?.user_transactions
                              .filter((i) => i.stock_id == el.stock_id)
                              .map((itm) => itm.order_qty)}
                          </td>

                          <td>
                            {Math.round(el.stock_current_price * 10) / 10}
                          </td>
                          <td>
                            {el?.stock?.stock_datas
                              .filter(
                                (i) =>
                                  i.game_id == el.game_id &&
                                  i.round_level ==
                                    filterRoundLevelData.round_level
                              )
                              .map((itm) => {
                                return (
                                  Math.round(itm.stock_current_price * 10) / 10
                                );
                              })}
                          </td>
                          <td>
                            <SellStocks data={el} />
                          </td>
                        </tr>
                      );
                  })
              ) : (
                <tr>
                  <td colSpan={3}>
                    <div className="alert alert-warning mt-3 text-center">
                      <i className="fas fa-exclamation-triangle" /> No Data
                      Found... :(
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Portfolio;
