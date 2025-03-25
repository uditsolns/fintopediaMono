import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { CollegeParams, CollegeResponse } from "../../../utils/types/college";

export const getCollege = createAsyncThunk<
  CollegeResponse[],
  void,
  { state: RootState }
>("college/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COLLEGES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CollegeResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCollege = createAsyncThunk<
  CollegeResponse,
  CollegeParams,
  { state: RootState }
>("college/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COLLEGES.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CollegeResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCollege = createAsyncThunk<
  CollegeResponse,
  CollegeParams,
  { state: RootState }
>("college/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COLLEGES.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CollegeResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCollege = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("college/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COLLEGES.DELETE + "/" + params, {
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
