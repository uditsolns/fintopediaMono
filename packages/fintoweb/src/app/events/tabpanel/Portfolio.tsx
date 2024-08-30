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

const Portfolio: React.FC = () => {
  const dummyStockData = [
    {
      stock_id: 1,
      stock: { name: "Dr. Reddy's Laboratories Ltd.", industry: "Technology" },
      stock_current_price: 145.3,
      qty: 14,
      buying_price: 141.3,
      total_price: 2034.2, // Example: qty * buying_price
      round_level: 1,
      game_id: 101,
      remark: "Test Remark", // Example remark
    },
    {
      stock_id: 2,
      stock: { name: "Tesla", industry: "Automobile" },
      stock_current_price: 720.5,
      qty: 25,
      buying_price: 400.3,
      total_price: 10007.5, // Example: qty * buying_price
      round_level: 1,
      game_id: 102,
      remark: "Test Remark", // Example remark
    },
    {
      stock_id: 3,
      stock: { name: "Google", industry: "Technology" },
      stock_current_price: 2720.3,
      qty: 65,
      buying_price: 2141.3,
      total_price: 139184.5, // Example: qty * buying_price
      round_level: 1,
      game_id: 103,
      remark: "Test Remark", // Example remark
    },
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
                            <SellStocks data={el}/>
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
