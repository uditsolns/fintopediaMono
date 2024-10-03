"use client";
import React, { useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import TabPanel from "./tabpanel/TabPanel";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getStocks } from "shared/src/provider/store/services/stocks.service";
import { getStockData } from "shared/src/provider/store/services/stockdatas.service";
import { getGameUsers } from "shared/src/provider/store/services/gameusers.service";

import { useRouter } from "next/navigation";
import { getGamesById } from "shared/src/provider/store/services/games.service";
import {
  getRoundLevel,
  getRoundLevelById,
} from "shared/src/provider/store/services/roundlevelgames.service";

interface EventPageProps {
  id: number;
}
const Events: React.FC<EventPageProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { singleGame, loading } = useAppSelector((state) => state.games);
  const {
    roundLevel,
    loading: roundLevelLoading,
    filterRoundLevelData,
    singleRoundLevel,
  } = useAppSelector((state) => state.roundLevel);
  

  useEffect(() => {
    dispatch(getStockData());
  }, [dispatch]);

  // const currentTime1 = new Date().toLocaleTimeString();
  // const currentTime = currentTime1?.split(/(\s+)/);
  // const endTime = filterRoundLevelData?.end_datetime;

  // let time_start = new Date();
  // let time_end = new Date();
  // let value_start = currentTime[0]?.split(":");
  // let value_end = endTime?.split(":");

  // time_start?.setHours(value_start[0], value_start[1], value_start[2], 0);
  // time_end?.setHours(value_end[0], value_end[1], value_end[2], 0);

  // const value = time_end - time_start;

  // const sec = value / 1000;
  // const [time, setTime] = React.useState(sec);
  // const timerRef = React.useRef(time);

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     timerRef.current -= 1;
  //     if (timerRef.current < 0) {
  //       if (timerRef.current == -1) {
  //         setTimeout(() => {
  //           router.push(`/waiting-page/${id}`);
  //         }, 5000);
  //       }

  //       dispatch(getStockData());
  //       clearInterval(timerId);
  //     } else {
  //       setTime(timerRef.current);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      checkSingleGameFinish();
      getAllRoundLevelGamesData();
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkSingleGameFinish = async () => {
    let body = {
      id: id,
    };
    dispatch(getGamesById(body));
    console.log("checkSingleGameFinish")

  };
  const getAllRoundLevelGamesData = async () => {
    let body = {
      id:filterRoundLevelData?.id
    }
    dispatch(getRoundLevelById(body));
    console.log("hello")
  };
  React.useEffect(() => {
    if (singleGame) {
      if (singleGame?.is_active == "0") {
        router.push("/winners-loading");
      }
    }
  }, [singleGame]);

  React.useEffect(() => {
    console.log("singleRoundLevel",singleRoundLevel)
    if (singleRoundLevel) {
      roundLevelFunction();
    }
  }, [singleRoundLevel]);

  const roundLevelFunction = async () => {
    if (singleRoundLevel?.is_active == 0) {
      router.push(`/waiting-page/${id}`);
    }
  };

  // useEffect(() => {
  //   dispatch(getGameUsers(data, login?.user?.id));
  // }, []);

  return (
    <section className="background-gradient p-0">
      <div className="container-fluid p-3">
        <Card body className="p-2 bgBlack">
          <Row className="portfolio-header d-flex justify-content-between align-items-center text-center">
            <Col xs="3">
              <h5 className="text-left text-gray-300">
                Timing :<br />{" "}
                <span className="font-bold text-light">05:00:00</span>
              </h5>
            </Col>
            <Col xs="3">
              <h5 className="text-center text-gray-300">
                V.Balance <br />{" "}
                <span className="font-bold text-light">1,000.00</span>
              </h5>
            </Col>
            <Col xs="6" md="6" lg="6">
              <h5 className="text-right text-gray-300">
                Total Portfolio Value <br />{" "}
                <span className="font-bold text-light">2,000.00</span>
              </h5>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="container-fluid p-3">
        <TabPanel />
      </div>
    </section>
  );
};
export default Events;
