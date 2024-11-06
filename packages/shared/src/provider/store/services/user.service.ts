import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { UserInfo, UserUpdateParams } from "../../../utils/types/auth";
import { storeCurrentUser } from "../reducers/auth.reducer";

export const getUser = createAsyncThunk<UserInfo[], void, { state: RootState }>(
  "user/get",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.USER.GET, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as UserInfo[];

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getUserById = createAsyncThunk<
  UserInfo,
  { id: string },
  { state: RootState }
>("getUserById/get", async ({ id }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.USER.GET + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response.json()) as UserInfo;
    thunkApi.dispatch(storeCurrentUser(data));
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk<
  UserInfo,
  { formData: FormData; id: string },
  { state: RootState }
>("user/update", async ({ formData, id }, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth?.auth?.token;
  try {
    const response = await fetch(apiUrl.USER.UPDATE + "/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = (await response.json()) as UserInfo;
    thunkApi.dispatch(storeCurrentUser(data));
    thunkApi.dispatch(getUserById({ id }));

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
