import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  GamesParams,
  GamesResponse,
  GetGameByIdParams,
} from "../../../utils/types/games";

export const getGames = createAsyncThunk<
  GamesResponse[],
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

    const data = (await response.json()) as GamesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getGamesById = createAsyncThunk<
  GamesResponse,
  GetGameByIdParams,
  { state: RootState }
>("singleGame/get", async ({ id, onSuccess, onError }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.GAMES.GET}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as GamesResponse;
    if (onSuccess) {
      onSuccess(data);
    }
    return data;
  } catch (error) {
    if (onError) {
      onError(error);
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const createGames = createAsyncThunk<
  GamesResponse,
  GamesParams,
  { state: RootState }
>("games/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.GAMES.POST, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as GamesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateGames = createAsyncThunk<
  GamesResponse,
  GamesParams,
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

    const data = (await response.json()) as GamesResponse;

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
