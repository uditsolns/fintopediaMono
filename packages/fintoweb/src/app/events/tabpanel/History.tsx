"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "reactstrap";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Event.module.css";
import { FaArrowRotateRight } from "react-icons/fa6";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import LightLoading from "@src/components/loader/LightLoading";
import { getTransactions } from "shared/src/provider/store/services/transactions.service";

interface HistoryProps {
  gameId: number;
  roundLevel: number;
  roundId: number;
}
const History: React.FC<HistoryProps> = ({ gameId, roundLevel, roundId }) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { transactions, loading } = useAppSelector(
    (state) => state.transactions
  );
  const { auth } = useAppSelector((state) => state.auth);
  const { filterRoundLevelData } = useAppSelector((state) => state.roundLevel);
  const { singleGame } = useAppSelector((state) => state.games);

  React.useEffect(() => {
    dispatch(getTransactions());
  }, []);
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
                <th scope="col">Name</th>
                <th scope="col">Qty</th>

                <th scope="col">Total Price</th>
                <th scope="col">Order Type</th>
              </tr>
            </thead>
            <tbody>
              {loading.transactions ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    <LightLoading />
                  </td>
                </tr>
              ) : transactions.filter((user) =>
                  user.stock?.name
                    .trim()
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase())
                ).length > 0 ? (
                transactions
                  ?.filter((user) =>
                    user.stock?.name
                      .trim()
                      .toLowerCase()
                      .includes(searchTerm.trim().toLowerCase())
                  )
                  .filter(
                    (i) => i.user_id == auth?.user?.id && i.game_id == gameId
                  )
                  .sort((a, b) => a.stock?.name.localeCompare(b.stock?.name))
                  .map((el, index) => {
                    return (
                      <tr key={index}>
                        <th>{el.stock?.name}</th>
                        <td>{el.order_qty}</td>
                        <td>{Math.round(el.total_price * 10) / 10}</td>
                        <td>{el.order_type}</td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={6}>
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

export default History;
