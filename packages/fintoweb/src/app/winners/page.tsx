import Image from "next/image";
import React from "react";
import Winner from "../../assets/user.jpg";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";

interface WinnerProps {}
const Winners: React.FC<WinnerProps> = () => {
  const nameShorter = (name: string) => {
    if (name?.length > 10) {
      return name.slice(0, 15) + "...";
    }
    return name;
  };
  const dispatch = useAppDispatch();
  const { gameUsers } = useAppSelector((state) => state.gameUsers);
  console.log("gameUsers", gameUsers);
  const [firstWinner, secondWinner, thirdWinner] = gameUsers;

  return (
    <div
      className="container mt-4 mb-4"
      style={{
        maxWidth: "400px",

        padding: "20px",
      }}
    >
      <div className=" text-white">
        <h1>Leaderboard</h1>
      </div>
      <div className="d-flex justify-content-around align-items-end my-4">
        <div
          className="text-center position-relative"
          style={{ width: "100px" }}
        >
          <div
            className="position-relative"
            style={{ width: "80px", height: "80px" }}
          >
            <Image
              src="#"
              alt={"Second"}
              layout="fill"
              objectFit="cover"
              className="rounded-circle"
            />
            <span
              className="badge bg-primary position-absolute top-0 start-50 translate-middle"
              style={{ fontSize: "1rem" }}
            >
              1
            </span>
          </div>
          <p className="mt-2 mb-0 text-white" style={{ fontSize: "0.9rem" }}>
            {secondWinner?.user
              ? nameShorter(
                  `${secondWinner?.user?.first_name} ${secondWinner?.user?.surname_name}`
                )
              : ""}
          </p>
          <p className="text-success" style={{ fontSize: "0.9rem" }}>
            {`${secondWinner?.amount || 0}`}
          </p>
        </div>
        <div
          className="text-center position-relative"
          style={{ width: "100px" }}
        >
          <div
            className="position-relative"
            style={{ width: "80px", height: "80px" }}
          >
            <Image
              src="#"
              alt={"Second"}
              layout="fill"
              objectFit="cover"
              className="rounded-circle"
            />
            <span
              className="badge bg-primary position-absolute top-0 start-50 translate-middle"
              style={{ fontSize: "1rem" }}
            >
              1
            </span>
          </div>
          <p className="mt-2 mb-0 text-white" style={{ fontSize: "0.9rem" }}>
            {firstWinner?.user
              ? nameShorter(
                  `${firstWinner?.user?.first_name} ${firstWinner?.user?.surname_name}`
                )
              : ""}
          </p>
          <p className="text-success" style={{ fontSize: "0.9rem" }}>
            {`${firstWinner?.amount || 0}`}
          </p>
        </div>
        <div
          className="text-center position-relative"
          style={{ width: "100px" }}
        >
          <div
            className="position-relative"
            style={{ width: "80px", height: "80px" }}
          >
            <Image
              src="#"
              alt={"Second"}
              layout="fill"
              objectFit="cover"
              className="rounded-circle"
            />
            <span
              className="badge bg-primary position-absolute top-0 start-50 translate-middle"
              style={{ fontSize: "1rem" }}
            >
              3
            </span>
          </div>
          <p className="mt-2 mb-0 text-white" style={{ fontSize: "0.9rem" }}>
            {thirdWinner?.user
              ? nameShorter(
                  `${thirdWinner?.user?.first_name} ${thirdWinner?.user?.surname_name}`
                )
              : ""}
          </p>
          <p className="text-success" style={{ fontSize: "0.9rem" }}>
            {`${thirdWinner?.amount || 0}`}
          </p>
        </div>
      </div>
      <ul className="list-group">
        {gameUsers?.length > 3 &&
          gameUsers?.slice(3).map((person, index) => {
            return (
              <li
                key={index}
                className="list-group-item background-gradient d-flex justify-content-between align-items-center"
                style={{
                  borderColor: "#444444",
                  color: "white",
                }}
              >
                <div className="d-flex align-items-center">
                  <div
                    className="position-relative"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <Image
                      src="#"
                      alt={person?.user?.first_name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-circle me-3"
                    />
                  </div>
                  <div>
                    <strong>
                      {index + 1}
                      {"."}
                      {person?.user?.first_name}
                    </strong>
                  </div>
                </div>
                <span className="text-success">{person.amount}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Winners;
