import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { UserCertificateInfo } from "../../../utils/types/UserCertificate";

export const getUserCertificate = createAsyncThunk<
  UserCertificateInfo[],
  void,
  { state: RootState }
>("userCertificate/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.USER_CERTIFICATE.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as UserCertificateInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createUserCertificate = createAsyncThunk<
  UserCertificateInfo,
  UserCertificateInfo,
  { state: RootState }
>("userCertificate/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.USER_CERTIFICATE.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as UserCertificateInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateUserCertificate = createAsyncThunk<
  UserCertificateInfo,
  UserCertificateInfo,
  { state: RootState }
>("userCertificate/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.USER_CERTIFICATE.UPDATE + "/" + params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as UserCertificateInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteUserCertificate = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("userCertificate/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.USER_CERTIFICATE.DELETE + "/" + params,
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
