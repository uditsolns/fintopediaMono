import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  AuthParams,
  AuthResponse,
  SignupParams,
  UpdatePasswordParams,
} from "../../../utils/types/auth";
import { storeCurrentUser } from "../reducers/auth.reducer";

export const signIn = createAsyncThunk<
  AuthResponse,
  AuthParams,
  { state: RootState }
>("auth/signin", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = (await response.json()) as AuthResponse;
    thunkApi.dispatch(storeCurrentUser(data?.user))
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const signUp = createAsyncThunk<
  AuthResponse,
  SignupParams,
  { state: RootState }
>("auth/signup", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.AUTH.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as AuthResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const forgotPassword = createAsyncThunk<
  AuthResponse,
  { email: string },
  { state: RootState }
>("auth/forgot", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.AUTH.FORGOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as AuthResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const confirmPassword = createAsyncThunk<
  AuthResponse,
  UpdatePasswordParams,
  { state: RootState }
>("auth/confirm", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.AUTH.FORGOTCONFIRM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as AuthResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
