import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { BannerPararms, BannerResponse } from "../../../utils/types/banner";

export const getBanner = createAsyncThunk<
  BannerResponse[],
  void,
  { state: RootState }
>("banner/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.BANNERS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as BannerResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createBanner = createAsyncThunk<
  BannerResponse,
  BannerPararms,
  { state: RootState }
>("banner/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.BANNERS.POST, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as BannerResponse;
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateBanner = createAsyncThunk<
  BannerResponse,
  BannerPararms,
  { state: RootState }
>("banner/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.BANNERS.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as BannerResponse;
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteBanner = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("banner/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.BANNERS.DELETE + "/" + params, {
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
