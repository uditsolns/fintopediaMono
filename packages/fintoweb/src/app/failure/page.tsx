"use client";

import React from "react";
import { useOtpless } from "@src/app/context/OtplessContext";

const page = () => {
  const { transactionId, setTransactionId } = useOtpless();
  console.log("trasactionId in fail", transactionId);

  return (
    <div className="flex justify-center items-center text-center">
      You payment has been cancelled
    </div>
  );
};

export default page;
