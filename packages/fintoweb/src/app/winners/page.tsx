import Image from "next/image";
import React from "react";
import Winner from "../../assets/user.jpg";

const Winners = () => {
  const leaders = [
    { name: "Aishwarya", amount: "₹10,093", img: Winner },
    { name: "Karan Joshi", amount: "₹9,093", img: Winner },
    { name: "Aditya Iyer", amount: "₹7,093", img: Winner },
  ];

  const others = [
    { rank: 4, name: "Anil Deshmukh", amount: "₹6,093", img: Winner },
    { rank: 5, name: "Priya Kapoor", amount: "₹6,077", img: Winner },
    { rank: 6, name: "Suraj Reddy", amount: "₹6,010", img: Winner },
    { rank: 7, name: "Rohan Gupta", amount: "₹5,999", img: Winner },
    { rank: 8, name: "Kavya Mehta", amount: "₹5,999", img: Winner },
  ];

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
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="text-center position-relative"
            style={{ width: "100px" }}
          >
            <div
              className="position-relative"
              style={{ width: "80px", height: "80px" }}
            >
              <Image
                src={leader.img}
                alt={leader.name}
                layout="fill"
                objectFit="cover"
                className="rounded-circle"
              />
              <span
                className="badge bg-primary position-absolute top-0 start-50 translate-middle"
                style={{ fontSize: "1rem" }}
              >
                {index + 1}
              </span>
            </div>
            <p className="mt-2 mb-0 text-white" style={{ fontSize: "0.9rem" }}>
              {leader.name}
            </p>
            <p className="text-success" style={{ fontSize: "0.9rem" }}>
              {leader.amount}
            </p>
          </div>
        ))}
      </div>
      <ul className="list-group">
        {others.map((person, index) => (
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
                  src={person.img}
                  alt={person.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-circle me-3"
                />
              </div>
              <div>
                <strong>
                  {person.rank}. {person.name}
                </strong>
              </div>
            </div>
            <span className="text-success">{person.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Winners;
