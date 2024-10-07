"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "reactstrap";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { FaArrowRotateRight } from "react-icons/fa6";
import LightLoading from "@src/components/loader/LightLoading";
import styles from "./Event.module.css";
import { useAppDispatch, useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { StockDatasResponse } from "shared/src/utils/types/stockDatas";

const PreviousData: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { auth } = useAppSelector((state) => state.auth);
  const { filterRoundLevelData } = useAppSelector((state) => state.roundLevel);
  const { stockData, loading } = useAppSelector((state) => state.stockData);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<StockDatasResponse[]>([]);

  useEffect(() => {
    const previousRound = filterRoundLevelData?.round_level as number; // Type assertion to ensure it's a number
    if (previousRound > 1) {
      const stock_filter = stockData.filter((e3: StockDatasResponse) => {
        return (
          e3.game_id === filterRoundLevelData?.game_id &&
          e3.round_level === previousRound - 1
        );
      });
      setData(stock_filter);
    } else {
      const stock_filter = stockData.filter((e3: StockDatasResponse) => {
        return (
          e3.game_id === filterRoundLevelData?.game_id &&
          e3.round_level === previousRound
        );
      });
      setData(stock_filter);
    }
  }, [filterRoundLevelData, stockData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={styles["inline-row"]}>
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search..."
          className={styles["search-textfield"]}
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
        <Button className={styles["search-button"]}>
          <FaArrowRotateRight />
        </Button>
      </div>
      <Row className="mt-3">
        <Col md={12}>
          <Table className={styles["custom-table"]}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Current Price</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <LightLoading />
                  </td>
                </tr>
              ) : data.filter((user) =>
                  user.stock?.name
                    .trim()
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase())
                ).length > 0 ? (
                data
                  .filter((user) =>
                    user.stock?.name
                      .trim()
                      .toLowerCase()
                      .includes(searchTerm.trim().toLowerCase())
                  )
                  .map((el, index) => (
                    <tr key={index}>
                      <th>{el.stock?.name}</th>
                      <td>{Math.round(el.stock_current_price * 10) / 10}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={2}>
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
