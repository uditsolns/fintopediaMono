import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  OnSuccessInterface,
  RoundLevelInfo,
} from "../../../utils/types/roundLevel";
import { GetGameByIdParams } from "../../../utils/types/games";

export const getRoundLevel = createAsyncThunk<
  RoundLevelInfo[],
  OnSuccessInterface,
  { state: RootState }
>("roundLevel/get", async ({ onSuccess }, thunkApi) => {
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
    onSuccess(data);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getRoundLevelById = createAsyncThunk<
  RoundLevelInfo,
  GetGameByIdParams,
  { state: RootState }
>("singleRoundLevel/get", async ({id,onSuccess,onError}, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.ROUND_LEVEL_GAMES.GET}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as RoundLevelInfo;
    onSuccess(data)
    return data;
  } catch (error) {
    onError(error)
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
    const response = await fetch(
      apiUrl.ROUND_LEVEL_GAMES.POST + "/" + params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

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
    const response = await fetch(
      apiUrl.ROUND_LEVEL_GAMES.UPDATE + "/" + params.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

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
    const response = await fetch(
      apiUrl.ROUND_LEVEL_GAMES.DELETE + "/" + params,
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
