"use client";

import React from "react";
// import { ShoppingCart } from 'lucide-react';
import { Button, Table } from "reactstrap";
import styles from "./Purchase.module.css";

const page = () => {
  const transactions = Array(10).fill({
    courseName: "Pro-Investor Membership",
    date: "11 Dec 2022",
    price: "Rs. 499",
    paymentType: "UPI",
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fintopedia Credits: 500</h1>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className={styles.borderTop}>
              <td className={styles.flexItems}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>&nbsp;
                {transaction.courseName}
              </td>
              <td>{transaction.date}</td>
              <td>{transaction.price}</td>
              <td>{transaction.paymentType}</td>
              <td>
                <Button outline color="light" className={styles.Receipt}>
                  Receipt
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default page;
