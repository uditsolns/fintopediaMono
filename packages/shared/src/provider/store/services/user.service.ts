import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { UserInfo } from "../../../utils/types/auth";

export const getUser = createAsyncThunk<UserInfo[], void, { state: RootState }>(
  "user/get",
  async (_, thunkApi) => {
    try {
      const response = await fetch(apiUrl.USER.GET, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as UserInfo[];

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<
  UserInfo,
  UserInfo,
  { state: RootState }
>("user/update", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.USER.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as UserInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("user/delete", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.USER.DELETE + "/" + params, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as string;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
