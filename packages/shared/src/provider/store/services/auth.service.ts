import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  AuthParams,
  AuthResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
  SignupParams,
  UpdatePasswordParams,
  UpdatePasswordResponse,
  UserInfo,
  VerifyOtpParams,
  VerifyOtpResponse,
} from "../../../utils/types/auth";
import { storeCurrentUser, logout } from "../reducers/auth.reducer";

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
    if(response.status !== 201){
      return thunkApi.rejectWithValue(await response.json());
    }
    const data = (await response.json()) as AuthResponse;
    thunkApi.dispatch(storeCurrentUser(data?.user));
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
 
export const googleSignIn = createAsyncThunk<
  AuthResponse,
  ForgotPasswordParams,
  { state: RootState }
>("googleSignIn/signin", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.AUTH.GOOGLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = (await response.json()) as AuthResponse;
    thunkApi.dispatch(storeCurrentUser(data?.user as UserInfo));
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
  ForgotPasswordResponse,
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

    const data = (await response.json()) as ForgotPasswordResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const confirmPassword = createAsyncThunk<
  UpdatePasswordResponse,
  UpdatePasswordParams,
  { state: RootState }
>("auth/confirm", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.AUTH.FORGOTCONFIRM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as UpdatePasswordResponse;
    console.log("data---------", data);
    if (data?.code === 200) {
      thunkApi.dispatch(logout());
    }
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const VerifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpParams,
  { state: RootState }
>("auth/verifyOtp", async (params, thunkApi) => {
  try {
    const response = await fetch(apiUrl.AUTH.VERIFYOTP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as VerifyOtpResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
