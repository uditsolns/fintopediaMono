"use client";
import React, { useCallback, useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import TabPanel from "./tabpanel/TabPanel";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getStockData } from "shared/src/provider/store/services/stockdatas.service";
import { useRouter } from "next/navigation";
import { getGamesById } from "shared/src/provider/store/services/games.service";
import { getRoundLevelById } from "shared/src/provider/store/services/roundlevelgames.service";
import { storeCheckNavigateHome } from "shared/src/provider/store/reducers/checknavigate.reducer";
import { getGameUserByLoginIDGameID } from "shared/src/provider/store/services/gameusers.service";

interface EventPageProps {
  id: number;
}

const Events: React.FC<EventPageProps> = ({ id }) => {
  const gameId = id;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { current_user,auth } = useAppSelector((state) => state.auth);
  const { singleGame } = useAppSelector((state) => state.games);
  const { filterRoundLevelData, singleRoundLevel } = useAppSelector(
    (state) => state.roundLevel
  );
  const { check_naviagte_home } = useAppSelector(
    (state) => state.checkNavigate
  );
  const [hasNavigated, setHasNavigated] = React.useState<boolean>(false);
  // const currentTime = new Date().toLocaleTimeString();
  // const endTime = `${filterRoundLevelData.end_datetime}`;
  const currentTime = "20:55:50";
  const endTime = "21:20:50";
  // console.log("currentTime",currentTime)
  // console.log("endTime",endTime)

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
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);
    // console.log("==", timerRef.current, time);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // React.useEffect(() => {
  //   if (time === 0 && !hasNavigated) {
  //     clearInterval(timerRef.current!);
  //     timerRef.current = null;
  //     navigation.navigate(RouteKeys.GAMEWAITINGSCREEN);
  //     setHasNavigated(true);
  //   }
  // }, [time,hasNavigated,navigation]);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  React.useEffect(() => {
    dispatch(storeCheckNavigateHome(false));
  }, []),
    React.useEffect(() => {
      let user_id = Number(auth?.user?.id);
      let game_id = Number(gameId);
      dispatch(
        getGameUserByLoginIDGameID({
          user_id,
          game_id,
          onSuccess: (data) => {
            console.log("game user ", data);
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
      })
    );
  };
  const getAllRoundLevelGamesData = async () => {
    let id = Number(filterRoundLevelData?.id);
    console.log("filterRoundLevelData", filterRoundLevelData);

    dispatch(
      getRoundLevelById({
        id,
        onSuccess: (data) => {
          console.log("data", data);
          if (data?.is_active == 0) {
            router.push(`/waiting-page/${gameId}`);
          }
        },
      })
    );
  };
  return (
    <section className="background-gradient p-0">
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
                <span className="font-bold text-light">1,000.00</span>
              </h5>
            </Col>
            <Col xs="6" md="6" lg="6">
              <h5 className="text-right text-gray-300">
                Total Portfolio Value <br />
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
