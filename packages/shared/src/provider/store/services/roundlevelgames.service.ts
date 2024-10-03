import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { RoundLevelInfo } from "../../../utils/types/roundLevel";

export const getRoundLevel = createAsyncThunk<
  RoundLevelInfo[],
  void,
  { state: RootState }
>("roundLevel/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.ROUND_LEVEL_GAMES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as RoundLevelInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});


export const getRoundLevelById = createAsyncThunk<
  RoundLevelInfo,
  {id:number},
  { state: RootState }
>("singleRoundLevel/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.ROUND_LEVEL_GAMES.GET}/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as RoundLevelInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const createRoundLevel = createAsyncThunk<
  RoundLevelInfo,
  RoundLevelInfo,
  { state: RootState }
>("roundLevel/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.ROUND_LEVEL_GAMES.POST + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as RoundLevelInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateRoundLevel = createAsyncThunk<
  RoundLevelInfo,
  RoundLevelInfo,
  { state: RootState }
>("roundLevel/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.ROUND_LEVEL_GAMES.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as RoundLevelInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteRoundLevel = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("roundLevel/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.ROUND_LEVEL_GAMES.DELETE + "/" + params, {
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
