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
import { storeCheckNavigate } from "shared/src/provider/store/reducers/checknavigate.reducer";
import { RoundLevelInfo } from "shared/src/utils/types/roundLevel";

interface WaitingPageProps {
  id?: number;
}

const WaitingPage: React.FC<WaitingPageProps> = ({ id }) => {
  const gameId = id;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(true);

  const toggleModal = () => setModal(!modal);

  const { singleGame } = useAppSelector((state) => state.games);
  const { check_navigate } = useAppSelector((state) => state.checkNavigate);

  useEffect(() => {
    dispatch(getNews());
    dispatch(getStocks());
    dispatch(getStockData());
  }, [dispatch]);

  useEffect(() => {
    if (gameId) {
      const interval = setInterval(() => {
        checkSingleGameFinish();
        getAllRoundLevelGamesData();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [gameId, dispatch]);

  const checkSingleGameFinish = async () => {
    let id = gameId;
    dispatch(
      getGamesById({
        id,
        onSuccess: (data) => {
          if (data?.is_active == 0) {
            if (check_navigate == false) {
              router.push("/game-ended");
            }
            dispatch(storeCheckNavigate(true));
          }
        },
      })
    );
  };
  const getAllRoundLevelGamesData = async () => {
    dispatch(
      getRoundLevel({
        onSuccess: (data) => {
          roundLevelFunction(data);
        },
      })
    );
  };

  const roundLevelFunction = async (roundLevel: RoundLevelInfo[]) => {
    const filterRound = roundLevel?.filter((e1) => {
      return e1?.game_id == gameId;
    });
    let obj = filterRound?.find((o) => o.is_active == 1);
    if (obj == undefined) {
      setModal(true);
    } else {
      for (let i = 0; i < filterRound.length; i++) {
        if (filterRound[i].is_active == 1) {
          await pushFilterData(filterRound[i]);
          setModal(false);
          router.push(`/events/${gameId}`);
          break;
        }
      }
    }
  };

  const pushFilterData = async (filterRound: RoundLevelInfo) => {
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
