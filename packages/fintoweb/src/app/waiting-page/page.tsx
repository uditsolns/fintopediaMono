"use client";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import Image from "next/image";
import sponser from "../../assets/Fintopedia logo-White.png";
import {
  useAppSelector,
  useAppDispatch,
} from "shared/src/provider/store/types/storeTypes";
import { getNews } from "shared/src/provider/store/services/news.service";
import { getStocks} from "shared/src/provider/store/services/stocks.service";
import { getStockData } from "shared/src/provider/store/services/stockdatas.service";
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

  const toggle = () => setModal(!modal);

  const { singleGame, loading } = useAppSelector((state) => state.games);
  const { roundLevel, loading: roundLevelLoading } = useAppSelector(
    (state) => state.roundLevel
  );

  useEffect(() => {
    dispatch(getNews());
    dispatch(getStocks());
    dispatch(getStockData());
  }, []);

  useEffect(
    React.useCallback(() => {
      if (id) {
        let interval = setInterval(() => {
          checkSingleGameFinish();
          getAllRoundLevelGamesData();
        }, 10000);
        return () => {
          clearInterval(interval);
        };
      }
    }, [id])
  );

  const checkSingleGameFinish = async () => {
    let body = {
      id: id,
    };
    dispatch(getGamesById(body));
  };
  const getAllRoundLevelGamesData = async () => {
    dispatch(getRoundLevel());
  };
  React.useEffect(() => {
    if (singleGame) {
      if (singleGame?.is_active == "0") {
        router.push("/winners-loading");
      }
    }
  }, [singleGame]);

  React.useEffect(() => {
    if (roundLevel) {
      roundLevelFunction();
    }
  }, [roundLevel]);

  const roundLevelFunction = async () => {
    const filterRound = roundLevel?.filter((e1) => {
      return e1.game_id == id;
    });
    let obj = filterRound?.find((o) => o.is_active == 1);
    if (obj == undefined) {
      setModal(true);
    } else {
      for (let i = 0; i < filterRound.length; i++) {
        if (filterRound[i].is_active == 1) {
          await pushFilterData(filterRound[i]);
          router.push(`/events/${id}`);
          break;
        }
      }
    }
  };

  const pushFilterData = async (filterRound) => {
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
        toggle={toggle}
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
            Please Wait, Next Round will begin
            <br />
            Shortly or try again later
          </p>
          <Button
            className="btn btn-info btn-sm btn-light font-bold text-black mt-3"
            block
          >
            Retry
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default WaitingPage;
