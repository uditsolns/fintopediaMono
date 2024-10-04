"use client";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import Image from "next/image";
import sponser from "../../assets/Fintopedia logo-White.png";
import {
  useAppSelector,
  useAppDispatch,
} from "shared/src/provider/store/types/storeTypes";
import { getStocks } from "shared/src/provider/store/services/stocks.service";
import { getStockData } from "shared/src/provider/store/services/stockdatas.service";
import { getNews } from "shared/src/provider/store/services/news.service";
import { getGamesById } from "shared/src/provider/store/services/games.service";
import { getRoundLevel } from "shared/src/provider/store/services/roundlevelgames.service";
import { useRouter } from "next/navigation";
import { storeFilterRoundLevelData } from "shared/src/provider/store/reducers/roundlevelgames.reducer";

interface WaitingPageProps {
  id?: number;
}

const WaitingPage: React.FC<WaitingPageProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const { singleGame } = useAppSelector((state) => state.games);
  const { roundLevel } = useAppSelector((state) => state.roundLevel);

  useEffect(() => {
    dispatch(getNews());
    dispatch(getStocks());
    dispatch(getStockData());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const interval = setInterval(() => {
        checkSingleGameFinish();
        getAllRoundLevelGamesData();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [id, dispatch]);

  const checkSingleGameFinish = () => {
    dispatch(getGamesById({ id }));
  };

  const getAllRoundLevelGamesData = () => {
    dispatch(getRoundLevel());
  };

  useEffect(() => {
    if (singleGame && singleGame.is_active === "0") {
      router.push("/winners-loading");
    }
  }, [singleGame, router]);

  useEffect(() => {
    if (roundLevel) {
      handleRoundLevel();
    }
  }, [roundLevel, id, router]);

  const handleRoundLevel = () => {
    const activeRounds = roundLevel?.filter(
      (e) => e.game_id === id && e.is_active === 1
    );

    if (activeRounds && activeRounds.length > 0) {
      pushFilterData(activeRounds[0]);
      router.push(`/events/${id}`);
    } else {
      setModal(true);
    }
  };

  const pushFilterData = (filterRound) => {
    dispatch(storeFilterRoundLevelData(filterRound));
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${
        modal ? "modal-open" : ""
      }`}
    >
      <div className="blur-background"></div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        backdrop="static"
        modalClassName="black-background"
        className="modal-dialog-centered"
      >
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center">
            <Image src={sponser} alt="Sponsor" />
          </div>
          <h3
            className="font-bold text-center mt-5"
            style={{ fontSize: "30px" }}
          >
            Hey! You're in waiting..
          </h3>
          <p className="mt-3 text-center text-gray-300">
            Please wait, the next round will begin shortly or try again later.
          </p>
          <Button
            className="btn btn-info btn-sm btn-light font-bold text-black mt-3"
            block
            onClick={toggleModal}
          >
            Retry
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default WaitingPage;
