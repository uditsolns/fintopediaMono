"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "reactstrap";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import BuyStocks from "./BuyStocks";
import styles from "./Event.module.css";
import { FaArrowRotateRight } from "react-icons/fa6";

const PreviousData: React.FC = () => {
  const dummyStockData = [
    {
      stock: { name: "Dr. Reddy's Laboratries Ltd.", industry: "Technology" },
      stock_current_price: 145.3,
      qty: 14,
      order_type: "Buy",
      buying_price: 141.3,
      round_level: 1,
      game_id: 101,
    },
    {
      stock: { name: "Tesla", industry: "Automobile" },
      stock_current_price: 720.5,
      qty: 25,
      order_type: "Sell",
      buying_price: 400.3,
      round_level: 1,
      game_id: 102,
    },
    {
      stock: { name: "Google", industry: "Technology" },
      stock_current_price: 2720.3,
      qty: 65,
      order_type: "Sell",
      buying_price: 2141.3,
      round_level: 1,
      game_id: 103,
    },
    // Add more dummy data as needed
  ];

  const filterRoundLevelData = { round_level: 1, game_id: 101 };

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(dummyStockData);
  const [allData, setAllData] = useState(dummyStockData);

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
          onClick={() => setData(allData)}
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
                <th>Round 1 Price</th>
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
                          <td>
                            {Math.round(el.stock_current_price * 10) / 10}
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

export default PreviousData;
