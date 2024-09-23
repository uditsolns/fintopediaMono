import React from "react";
import Image from "next/image";
import { Container } from "reactstrap";
import gameEndedImage from "../../assets/game-ended.png";

const GameEnded: React.FC = () => {
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
