"use client";
import React, { useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import TabPanel from "./tabpanel/TabPanel";
import { useAppDispatch, useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { getStockData } from "shared/src/provider/store/services/stockdatas.service";
import { useRouter } from "next/navigation";
import { getGamesById } from "shared/src/provider/store/services/games.service";
import { getRoundLevelById } from "shared/src/provider/store/services/roundlevelgames.service";

interface EventPageProps {
  id: number;
}

const Events: React.FC<EventPageProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { singleGame } = useAppSelector((state) => state.games);
  const { filterRoundLevelData, singleRoundLevel } = useAppSelector((state) => state.roundLevel);

  useEffect(() => {
    dispatch(getStockData());
    const interval = setInterval(() => {
      checkGameStatus();
      fetchRoundLevelData();
    }, 20000);
    
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (singleGame && singleGame.is_active === "0") {
      router.push("/game-ended");
    }
  }, [singleGame, router]);

  useEffect(() => {
    if (singleRoundLevel) {
      handleRoundLevelStatus();
    }
  }, [singleRoundLevel, router]);

  const checkGameStatus = () => {
    dispatch(getGamesById({ id }));
  };

  const fetchRoundLevelData = () => {
    if (filterRoundLevelData?.id) {
      dispatch(getRoundLevelById({ id: filterRoundLevelData.id }));
    }
  };

  const handleRoundLevelStatus = () => {
    if (singleRoundLevel?.is_active === 0) {
      router.push(`/waiting-page/${id}`);
    }
  };

  return (
    <section className="background-gradient p-0">
      <div className="container-fluid p-3">
        <Card body className="p-2 bgBlack">
          <Row className="portfolio-header d-flex justify-content-between align-items-center text-center">
            <Col xs="3">
              <h5 className="text-left text-gray-300">
                Timing :<br />
                <span className="font-bold text-light">05:00:00</span>
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
