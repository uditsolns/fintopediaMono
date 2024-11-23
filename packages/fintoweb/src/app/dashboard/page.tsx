"use client";

import React from "react";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";

const DashboardHomePage = () => {
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  return (
    <div>
      <h3>Welcome to your dashboard!</h3>
    </div>
  );
};

export default DashboardHomePage;
