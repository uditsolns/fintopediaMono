"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "reactstrap";
import gameEndedImage from "../../assets/game-ended.png";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";

const GameEnded: React.FC = () => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const [roundLevelGameState, setRoundLevelGameState] = useState();
  const [visible, setVisible] = useState(false);
  const { singleGame } = useAppSelector((state) => state.games);

  useEffect(() => {
    checkSingleGameFinish();
  }, []);

  const checkSingleGameFinish = () => {
    fetch(`${baseUrl}/games/${singlegames?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${login?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.is_active == 0) {
          const stop = {
            game_id: singlegames.id,
          };
          dispatch(stopGames(login?.token, stop));
          getUsergames();
        }
      })
      .catch((error) => {
        console.log("errror in get user game data api :", error);
      });
  };

  const getUsergames = () => {
    fetch(`${baseUrl}/games/${singlegames.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${login?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.to_publish_result == 1) {
          dispatch(actions.topgameuserGetData(login.token, navigate));
        }
      })
      .catch((error) => {
        console.log("error in get user game data api :", error);
      });
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
