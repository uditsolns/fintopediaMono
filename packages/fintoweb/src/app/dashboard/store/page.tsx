"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";

const Store = () => {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;

  React.useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);
  return <div>Store Page</div>;
};

export default Store;
