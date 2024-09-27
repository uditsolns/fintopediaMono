import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { CollegeInfo } from "../../../utils/types/college";

export const getCollege = createAsyncThunk<
  CollegeInfo[],
  void,
  { state: RootState }
>("college/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;

    const response = await fetch(apiUrl.COLLEGES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CollegeInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCollege = createAsyncThunk<
  CollegeInfo,
  CollegeInfo,
  { state: RootState }
>("college/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const response = await fetch(apiUrl.COLLEGES.POST + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CollegeInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCollege = createAsyncThunk<
  CollegeInfo,
  CollegeInfo & { token: string },
  { state: RootState }
>("college/update", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.COLLEGES.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CollegeInfo;

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
    const token = state.auth.token;
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
