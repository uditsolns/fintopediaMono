import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  PurchaseHistoryParams,
  PurchaseHistoryResponse,
} from "../../../utils/types/PurchaseHistory";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";
import { getCourseCart } from "./CourseCart.service";

export const getPurchaseHistory = createAsyncThunk<
  PurchaseHistoryResponse[],
  void,
  { state: RootState }
>("purchaseHistory/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.PURCHASE_HISTORY.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as PurchaseHistoryResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getPurchaseHistoryById = createAsyncThunk<
  PurchaseHistoryResponse,
  PurchaseHistoryParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "getPurchaseHistoryById/get",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;

      const response = await fetch(
        `${apiUrl.PURCHASE_HISTORY.GET}/${params?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = (await response.json()) as PurchaseHistoryResponse;
      onSuccess(data);
      thunkApi.dispatch(getCourseCart());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createPurchaseHistory = createAsyncThunk<
  PurchaseHistoryResponse,
  PurchaseHistoryParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>("purchaseHistory/post", async ({ params, onSuccess, onError }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.PURCHASE_HISTORY.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as PurchaseHistoryResponse;
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const updatePurchaseHistory = createAsyncThunk<
  PurchaseHistoryResponse,
  PurchaseHistoryParams,
  { state: RootState }
>("purchaseHistory/update", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.PURCHASE_HISTORY.UPDATE + "/" + params?.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as PurchaseHistoryResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deletePurchaseHistory = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("purchaseHistory/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.PURCHASE_HISTORY.DELETE + "/" + params,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as string;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
