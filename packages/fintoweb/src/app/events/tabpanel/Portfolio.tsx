"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "reactstrap";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import BuyStocks from "./BuyStocks";
import styles from "./Event.module.css";
import { FaArrowRotateRight } from "react-icons/fa6";
import SellStocks from "./SellStocks";
import {
  useAppSelector,
  useAppDispatch,
} from "shared/src/provider/store/types/storeTypes";
import { getTransactions } from "shared/src/provider/store/services/transactions.service";

const Portfolio: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector(
    (state) => state.transactions
  );
  const { auth } = useAppSelector((state) => state.auth);
  const { filterRoundLevelData } = useAppSelector((state) => state.roundLevel);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);
  console.log("transactions", transactions);
  console.log("filterRoundLevelData", filterRoundLevelData);
  console.log("data", data);

  console.log("filterData", filterData);

  const key: keyof (typeof transactions)[number] = "stock_id";

  useEffect(() => {
    if (transactions) {
      const filteredData = transactions.filter((item) => {
        const userTransaction = item.user?.user_transactions?.find(
          (el) => el.stock_id === item.stock_id
        );
        return (
          item.user_id === auth?.user?.id &&
          item.order_type === "Buy" &&
          userTransaction?.order_qty > 0
        );
      });
      console.log("filteredData", filteredData);
      const reverseData = [...filteredData].reverse();
      const uniqueMap = new Map(reverseData.map((item) => [item[key], item]));
      const uniqueFilteredData = Array.from(uniqueMap.values()); // Convert Map values to an array
      console.log("uniqueFilteredData", uniqueFilteredData);

      setFilterData(uniqueFilteredData);
      setData(uniqueFilteredData);
    }
  }, [transactions, auth]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
                    if (
                      el.round_level === filterRoundLevelData.round_level &&
                      el.game_id === filterRoundLevelData.game_id
                    )
                      return (
                        <tr key={index}>
                          <td>{el.stock.name}</td>
                          <td>{el.qty}</td>
                          <td>{el.buying_price}</td>
                          <td>
                            {Math.round(el.stock_current_price * 10) / 10}
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
                    <div className="row mt-3">
                      <div
                        className="p-1"
                        style={{
                          width: "100%",
                          backgroundColor: "lightblue",
                        }}
                      >
                        <div
                          className="alert alert-warning mt-3 text-center"
                          role="alert"
                        >
                          <i className="fas fa-exclamation-triangle" /> No Data
                          Found... :(
                        </div>
                      </div>
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
