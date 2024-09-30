import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { StartGameInfo } from "../../../utils/types/startgame";

export const getStartGame = createAsyncThunk<
  StartGameInfo[],
  void,
  { state: RootState }
>("startGame/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.START_GAME.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as StartGameInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createStartGame = createAsyncThunk<
  StartGameInfo,
  StartGameInfo,
  { state: RootState }
>("startGame/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.START_GAME.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    const data = (await response.json()) as StartGameInfo;
    return data;
  } catch (error) {
    console.log('error', error)
    return thunkApi.rejectWithValue(error);
  }
});

export const updateStartGame = createAsyncThunk<
  StartGameInfo,
  StartGameInfo & { token: string },
  { state: RootState }
>("startGame/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.START_GAME.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as StartGameInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteStartGame = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("startGame/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.START_GAME.DELETE + "/" + params, {
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
