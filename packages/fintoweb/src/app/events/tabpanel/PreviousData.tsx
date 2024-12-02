"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, InputGroup, Input } from "reactstrap";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { FaArrowRotateRight } from "react-icons/fa6";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import styles from "./Event.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { StockDatasResponse } from "shared/src/utils/types/stockDatas";
import CustomSelect from "@src/custom/CustomSelect";
import { ErrorMessage, Field } from "formik";

interface PreviousProps {
  gameId: number;
  roundLevel: number;
  roundId: number;
}
const PreviousData: React.FC<PreviousProps> = ({
  gameId,
  roundLevel,
  roundId,
}) => {
  console.log("roundLevel", roundLevel);
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector((state) => state.auth);
  const { filterRoundLevelData } = useAppSelector((state) => state.roundLevel);
  const { stockData, loading } = useAppSelector((state) => state.stockData);
  console.log("stockData", stockData);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<StockDatasResponse[]>([]);

  const [searchStocksData, setSearchStocksData] = React.useState<
    StockDatasResponse[]
  >(stockData || []);

  console.log("searchStocksData", searchStocksData);
  const [rounds, setRounds] = React.useState<number | string>(roundLevel!);

  const [roundValues, setRoundValues] = useState<number>(roundLevel || "1");
  console.log("roundValues", roundValues);

  const handleRoundChange = (event) => {
    setRoundValues(event.target.value);
  };
  // React.useEffect(() => {
  //   if (stockData) {
  //     let filterData = searchStocksData?.length
  //       ? searchStocksData?.filter(
  //           (e3) =>
  //             e3.game_id == gameId &&
  //             e3.round_level == (roundValues > 1 ? roundValues - 1 : 1)
  //         )
  //       : [];
  //       console.log("filterData")
  //     setSearchStocksData(filterData);
  //   }
  // }, [stockData,roundValues]);
  React.useEffect(() => {
    if (stockData) {
      let filterData =
        stockData && stockData.length
          ? stockData.filter(
              (item) =>
                item.game_id === gameId && item.round_level === roundValues
            )
          : [];

      console.log("filterData", filterData);
      setSearchStocksData(filterData);
    }
  }, [stockData, roundValues, gameId]);

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
                {/* <th scope="col">Current Price</th> */}
                <th scope="col">
                  <InputGroup style={{ width: "300px" }}>
                    <Input
                      component={CustomSelect}
                      type="select"
                      id="round_values"
                      name="round_values"
                      value={roundValues}
                      onChange={(e) => {
                        handleRoundChange(e);
                      }}
                      placeholder="Select Round"
                      className={`form-control ${styles.SelectBox}`}
                    >
                      <option value={"1"}>Round 1 Price</option>
                      <option value={"2"}>Round 2 Price</option>
                      <option value={"3"}>Round 3 Price</option>
                      <option value={"4"}>Round 4 Price</option>
                      <option value={"5"}>Round 5 Price</option>
                    </Input>
                  </InputGroup>
                </th>

                {/* <ErrorMessage
                  name="round_values"
                  component="div"
                  className="text-danger" 
                />*/}
              </tr>
            </thead>
            <tbody>
              {loading.stockData ? (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <LoadingAtom />
                  </td>
                </tr>
              ) : searchStocksData.filter((user) =>
                  user.stock?.name
                    .trim()
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase())
                ).length > 0 ? (
                searchStocksData
                  .filter((user) =>
                    user.stock?.name
                      .trim()
                      .toLowerCase()
                      .includes(searchTerm.trim().toLowerCase())
                  )
                  .map((el, index) => (
                    <tr key={index}>
                      <th>{el.stock?.name}</th>
                      <th>{el.stock_current_price}</th>
                      {/* <td>{Math.round(el.stock_current_price * 10) / 10}</td> */}
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
