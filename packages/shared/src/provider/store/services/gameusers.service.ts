import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  GameUserLoginIDGameIDPayload,
  GameUserLoginIDGameIDResponse,
  GameUsersInfo,
} from "../../../utils/types/gameUsers";

export const getGameUsers = createAsyncThunk<
  GameUsersInfo[],
  void,
  { state: RootState }
>("gameUsers/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.GAME_USERS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as GameUsersInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const getGameUserByLoginIDGameID = createAsyncThunk<
  GameUserLoginIDGameIDResponse,
  GameUserLoginIDGameIDPayload,
  { state: RootState }
>(
  "gameUserByLoginIDGameID/get",
  async ({ user_id, game_id, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;

      const response = await fetch(
        `${apiUrl.GAME_USER.GET}/${user_id}/${game_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = (await response.json()) as GameUserLoginIDGameIDResponse;
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createGameUsers = createAsyncThunk<
  GameUsersInfo,
  GameUsersInfo,
  { state: RootState }
>("gameUsers/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.GAME_USERS.POST + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as GameUsersInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateGameUsers = createAsyncThunk<
  GameUsersInfo,
  GameUsersInfo & { token: string },
  { state: RootState }
>("gameUsers/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.GAME_USERS.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as GameUsersInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteGameUsers = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("gameUsers/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.GAME_USERS.DELETE + "/" + params, {
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
