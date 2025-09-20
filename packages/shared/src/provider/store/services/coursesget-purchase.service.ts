import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CoursesgetPurchaseParams,
  CoursesgetPurchaseResponse,
} from "../../../utils/types/coursesget-purchase";

export const getCoursesgetPurchase = createAsyncThunk<
  CoursesgetPurchaseResponse[],
  void,
  { state: RootState }
>("getCoursesgetPurchase/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSE_PURCHASE.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CoursesgetPurchaseResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCoursesgetPurchaseById = createAsyncThunk<
  CoursesgetPurchaseResponse,
  CoursesgetPurchaseParams,
  { state: RootState }
>("getCoursesgetPurchaseById/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.COURSE_PURCHASE.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as CoursesgetPurchaseResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
