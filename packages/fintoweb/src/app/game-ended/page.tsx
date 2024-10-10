"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "reactstrap";
import gameEndedImage from "../../assets/game-ended.png";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";
import { getGameUsers } from "shared/src/provider/store/services/gameusers.service";
import { getGamesById } from "shared/src/provider/store/services/games.service";
import { createStopGame } from "shared/src/provider/store/services/stopgame.service";

const GameEnded: React.FC = () => {
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleGame } = useAppSelector((state) => state.games);

  React.useEffect(() => {
    checkSingleGameFinish();
  }, []);

  const checkSingleGameFinish = async () => {
    let id = Number(singleGame?.id);
    dispatch(
      getGamesById({
        id,
        onSuccess: async (data) => {
          if (data?.is_active == 0) {
            await stopGames();
          }
        },
        onError: () => {},
      })
    );
  };

  const stopGames = async () => {
    const startGameInfo = {
      game_id: singleGame?.id,
    };
    dispatch(
      createStopGame({
        startGameInfo,
        onSuccess: async (res) => {
          console.log(res);
          await getUsergames();
        },
        onError: (err) => {},
      })
    );
  };
  const getUsergames = async () => {
    let id = Number(singleGame?.id);
    dispatch(
      getGamesById({
        id,
        onSuccess: async (data) => {
          if (data?.is_active == 0) {
            if (data?.to_publish_result == 1) {
              dispatch(
                getGameUsers({
                  onSuccess: (data) => {
                    router.push("/winners");
                  },
                })
              );
            }
            if (data?.to_publish_result == 0) {
              await getUsergames();
            }
          }
        },
        onError: () => {},
      })
    );
  };

  return (
    <div className="background-gradient">
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center vh-100"
      >
        <Image
          src={gameEndedImage}
          alt="Game Over"
          width={400}
          height={400}
          className="img-fluid mb-3"
        />
        <h1 className="text-white text-center">
          Games are ended, Result
          <br /> will be declared soon!
        </h1>
        <p className="text-gray-400 text-center mt-3">
          Please check back in sometime
          <br /> for results.
        </p>
      </Container>
    </div>
  );
};

export default GameEnded;
