"use client";

import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Button,
} from "reactstrap";
import Link from "next/link";
import { getGames } from "shared/src/provider/store/services/games.service";
import { createStartGame } from "shared/src/provider/store/services/startgame.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { imageUrl } from "shared/src/config/imageUrl";
import LightLoading from "@src/components/loader/LightLoading";
import { useRouter } from "next/navigation";
import { capitalizeAndTruncate } from "@src/components/capitalizeAndTruncate/capitalizeAndTruncate";

const GamesPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { games, loading } = useAppSelector((state) => state.games);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <div className="background-gradient">
      <Container>
        <Row className="mt-5">
          {loading?.games ? (
            <div className="d-flex justify-content-center align-items-center p-5">
              <LightLoading />
            </div>
          ) : games.length === 0 ? (
            <div className="text-center text-white p-5">
              No games available at the moment.
            </div>
          ) : (
            games
              .filter((game) => game?.is_active == "1")
              .map((game) => (
                <Col key={game.id} md={4} className="mb-4">
                  <Card
                    className="h-100 d-flex flex-row"
                    style={{ backgroundColor: "black", color: "#FFF" }}
                  >
                    <div style={{ flex: "0 0 40%", overflow: "hidden" }}>
                      <CardImg
                        src={
                          !game.image
                            ? "https://spiderimg.amarujala.com/assets/images/2021/09/02/share-market-business_1630576834.jpeg"
                            : `${imageUrl}/GameImages/${game.image}`
                        }
                        alt="Game Image"
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <CardBody
                      style={{
                        flex: "1 0 60%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardTitle tag="h5">
                        {capitalizeAndTruncate(game.name, 25)}
                      </CardTitle>
                      <Button
                        prefetch={true}
                        className="btn btn-sm btn-light font-bold text-black"
                        style={{ width: "80%" }}
                        onClick={() => {
                          const startGameInfo = {
                            id: game?.id,
                            game_id: game?.id,
                          };
                          dispatch(
                            createStartGame({
                              params: startGameInfo,
                              navigate: router.push,
                              game_id: game.id,
                            })
                          );
                        }}
                      >
                        Play Game
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default GamesPage;
