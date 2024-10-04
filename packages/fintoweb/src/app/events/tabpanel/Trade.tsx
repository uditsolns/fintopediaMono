import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "reactstrap";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import BuyStocks from "./BuyStocks";
import styles from "./Event.module.css";
import { FaArrowRotateRight } from "react-icons/fa6";
import { getStocks } from "shared/src/provider/store/services/stocks.service";
import { getStockData } from "shared/src/provider/store/services/stockdatas.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import LightLoading from "@src/components/loader/LightLoading";

const Trade: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stocks } = useAppSelector((state) => state.stocks);
  const { stockData, loading } = useAppSelector((state) => state.stockData);
  const { filterRoundLevelData, singleRoundLevel } = useAppSelector(
    (state) => state.roundLevel
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState(stockData);
  const [allData, setAllData] = useState(stockData);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  useEffect(() => {
    setAllData(stockData);
    setData(stockData);
  }, [stockData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const uniqueIndustries = Array.from(
    new Set(stockData.map((item) => item.stock.industry))
  ).map((industry) => {
    return stockData.find((item) => item.stock.industry === industry)!;
  });

  const filterItem = (industry: string) => {
    const updatedItems = stockData.filter(
      (curElm) => curElm.stock.industry === industry
    );
    setData(updatedItems);
    setActiveIndustry(industry);
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
        <Col md={3} className={styles["sector-name"]}>
          <Button
            // className={styles["btn"] + " " + styles["sector-btn"] }
            className={`${styles["btn"]} ${styles["sector-btn"]} ${
              activeIndustry === null ? styles.active : ""
            }`}
            block
            onClick={() => {
              setData(allData);
              setActiveIndustry(null);
            }}
          >
            All
          </Button>

          {uniqueIndustries.map((el, index) => (
            <Button
              key={index}
              // className={styles["btn"] + " " + styles["sector-btn"]}
              className={`${styles["btn"]} ${styles["sector-btn"]} ${
                activeIndustry === el.stock.industry ? styles.active : ""
              }`}
              block
              onClick={() => filterItem(el.stock.industry)}
            >
              {el.stock.industry}
            </Button>
          ))}
        </Col>

        <Col md={9}>
          <Table className={styles["custom-table"]}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Avg.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading?.stockData ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    <LightLoading />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data
                  .filter((item) =>
                    item.stock.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((el, index) => {
                    if (
                      el.round_level == filterRoundLevelData.round_level &&
                      el.game_id == filterRoundLevelData.game_id
                    ) {
                      return (
                        <tr key={index}>
                          <td>{el.stock.name}</td>
                          <td>
                            {Math.round(el.stock_current_price * 10) / 10}
                          </td>
                          <td>
                            <BuyStocks data={el} />
                          </td>
                        </tr>
                      );
                    }
                    return null;
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

export default Trade;
