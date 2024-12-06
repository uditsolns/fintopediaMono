"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";

const DashboardHomePage = () => {
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]); 
  return (
    <div>
      <h3>Welcome to your dashboard!</h3>
    </div>
  );
};

export default DashboardHomePage;
