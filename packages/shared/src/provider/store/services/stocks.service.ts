import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { StocksParams, StocksResponse } from "../../../utils/types/stocks";

export const getStocks = createAsyncThunk<
  StocksResponse[],
  void,
  { state: RootState }
>("stocks/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.STOCKS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as StocksResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createStocks = createAsyncThunk<
StocksResponse,
  StocksParams,
  { state: RootState }
>("stocks/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.STOCKS.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as StocksResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateStocks = createAsyncThunk<
StocksResponse,
  StocksParams,
  { state: RootState }
>("stocks/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.STOCKS.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as StocksResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteStocks = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("stocks/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.STOCKS.DELETE + "/" + params, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as string;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
