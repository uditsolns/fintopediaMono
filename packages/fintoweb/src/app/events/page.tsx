"use client";
import React, { useCallback, useEffect } from "react";
import styles from "./tabpanel/Event.module.css";
import { Card, Row, Col } from "reactstrap";
import TabPanel from "./tabpanel/TabPanel";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getStockData } from "shared/src/provider/store/services/stockdatas.service";
import { getStocks } from "shared/src/provider/store/services/stocks.service";
import { useRouter } from "next/navigation";
import { getGamesById } from "shared/src/provider/store/services/games.service";
import { getRoundLevelById } from "shared/src/provider/store/services/roundlevelgames.service";
import { storeCheckNavigateHome } from "shared/src/provider/store/reducers/checknavigate.reducer";
import { getGameUserByLoginIDGameID } from "shared/src/provider/store/services/gameusers.service";
import { storeFilterRoundLevelData } from "shared/src/provider/store/reducers/roundlevelgames.reducer";
//import { updateRoundLevel } from "shared/src/provider/store/services/roundlevelgames.service";
import { storeUserGameAmount } from "shared/src/provider/store/reducers/gameusers.reducer";

export interface EventPageProps {
  id: number;
  roundLevel: number;
  roundId: number;
}

const Events: React.FC<EventPageProps> = ({ id, roundLevel, roundId }) => {
  const gameId = id;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { current_user, auth } = useAppSelector((state) => state.auth);
  const { singleGame } = useAppSelector((state) => state.games);
  const { filterRoundLevelData, singleRoundLevel } = useAppSelector(
    (state) => state.roundLevel
  );
  const { gameUserByLoginIDGameID, user_game_amount } = useAppSelector(
    (state) => state.gameUsers
  );

  const { check_naviagte_home } = useAppSelector(
    (state) => state.checkNavigate
  );
  const [hasNavigated, setHasNavigated] = React.useState<boolean>(false);
  const [endTime, setEndTime] = React.useState<string>(
    filterRoundLevelData ? `${filterRoundLevelData.end_datetime}` : "00:00:00"
  );
  const currentTime = new Date().toLocaleTimeString([], { hour12: false });

  React.useEffect(() => {
    if (filterRoundLevelData) {
      setEndTime(`${filterRoundLevelData.end_datetime}`);
    }
  }, [filterRoundLevelData]);

  const getTimeDifferenceInSeconds = (start: string, end: string): number => {
    const [startHours, startMinutes, startSeconds] = start
      .split(":")
      .map(Number);
    const [endHours, endMinutes, endSeconds] = end.split(":").map(Number);
    const timeStart = new Date();
    const timeEnd = new Date();
    timeStart.setHours(startHours, startMinutes, startSeconds, 0);
    timeEnd.setHours(endHours, endMinutes, endSeconds, 0);
    const differenceInSeconds =
      (timeEnd.getTime() - timeStart.getTime()) / 1000;

    return Math.max(differenceInSeconds, 0);
  };

  const [time, setTime] = React.useState<number>(
    getTimeDifferenceInSeconds(currentTime, endTime)
  );
  React.useEffect(() => {
    if (time === 0) {
      // const body: RoundLevelParams = {
      //   id: roundId,
      //   game_id: gameId,
      //   round_level: filterRoundLevelData
      //     ? +filterRoundLevelData.round_level
      //     : null,
      //   start_datetime: filterRoundLevelData
      //     ? filterRoundLevelData.start_datetime
      //     : null,
      //   end_datetime: filterRoundLevelData
      //     ? filterRoundLevelData.end_datetime
      //     : null,
      //   set_id: filterRoundLevelData ? filterRoundLevelData.set_id : null,
      //   is_active: 0,
      // };
      // dispatch(updateRoundLevel(body));
    }
    const timer = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  React.useEffect(() => {
    dispatch(getStockData());
    dispatch(getStocks());
    dispatch(storeCheckNavigateHome(false));
  }, []);

  React.useEffect(() => {
    let user_id = Number(auth?.user?.id);
    let game_id = Number(gameId);
    dispatch(
      getGameUserByLoginIDGameID({
        user_id,
        game_id,
        onSuccess: (data) => {
          if (user_game_amount == 0) {
            dispatch(storeUserGameAmount(data?.amount));
          }
        },
        onError: () => {},
      })
    );
  }, []);

  React.useEffect(() => {
    let interval = setInterval(() => {
      checkSingleGameFinish();
      getAllRoundLevelGamesData();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkSingleGameFinish = async () => {
    dispatch(
      getGamesById({
        id,
        onSuccess: (data) => {
          if (data?.is_active == 0) {
            if (check_naviagte_home == false) {
              router.push("/game-ended");
            }
            dispatch(storeCheckNavigateHome(true));
          }
        },
        onError: () => {},
      })
    );
  };
  const getAllRoundLevelGamesData = async () => {
    let id = roundId ? roundId : Number(filterRoundLevelData?.id);

    dispatch(
      getRoundLevelById({
        id,
        onSuccess: (data) => {
          dispatch(storeFilterRoundLevelData(data));
          if (data?.is_active == 0) {
            router.push(`/waiting-page/${gameId}`);
          }
        },
        onError: () => {},
      })
    );
  };

  return (
    <section className="background-gradient p-0">
      <div className={styles.overview}>
        <h3>Portfolio Overview</h3>
        <h3>Round : {roundLevel}</h3>
      </div>
      <div className="container-fluid p-3">
        <Card body className="p-2 bgBlack">
          <Row className="portfolio-header d-flex justify-content-between align-items-center text-center">
            <Col xs="3">
              <h5 className="text-left text-gray-300">
                Timing :<br />
                <span className="font-bold text-light">
                  {time < 0
                    ? "00:00"
                    : `${String(minutes).padStart(2, "0")}:${String(
                        seconds
                      ).padStart(2, "0")}`}
                </span>
              </h5>
            </Col>
            <Col xs="3">
              <h5 className="text-center text-gray-300">
                V.Balance <br />
                <span className="font-bold text-light">
                  &#8377; &nbsp;
                  {gameUserByLoginIDGameID
                    ? gameUserByLoginIDGameID?.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "0"}
                </span>
              </h5>
            </Col>
            <Col xs="6" md="6" lg="6">
              <h5 className="text-right text-gray-300">
                Total Portfolio Value <br />
                <span className="font-bold text-light">
                  {gameUserByLoginIDGameID
                    ? (
                        Math.round(
                          (user_game_amount -
                            Number(gameUserByLoginIDGameID.amount)) *
                            10
                        ) / 10
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "0"}
                </span>
              </h5>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="container-fluid p-3">
        <TabPanel gameId={gameId} roundLevel={roundLevel} roundId={roundId} />
      </div>
    </section>
  );
};

export default Events;
