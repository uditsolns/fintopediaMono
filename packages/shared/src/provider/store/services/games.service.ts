import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { GamesInfo, GetGameByIdParams } from "../../../utils/types/games";

export const getGames = createAsyncThunk<
  GamesInfo[],
  void,
  { state: RootState }
>("games/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.GAMES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as GamesInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getGamesById = createAsyncThunk<
  GamesInfo,
  GetGameByIdParams,
  { state: RootState }
>("singleGame/get", async (params, thunkApi) => {
  console.log("Params",params)
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.GAMES.GET}/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as GamesInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createGames = createAsyncThunk<
  GamesInfo,
  GamesInfo,
  { state: RootState }
>("games/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.GAMES.POST + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as GamesInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateGames = createAsyncThunk<
  GamesInfo,
  GamesInfo,
  { state: RootState }
>("games/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.GAMES.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as GamesInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteGames = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("games/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.GAMES.DELETE + "/" + params, {
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
