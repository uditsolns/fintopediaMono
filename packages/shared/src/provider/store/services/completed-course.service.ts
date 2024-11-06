import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { CompletedCoursesPararms, CompletedCoursesResponse } from "../../../utils/types/completed-course";

export const getCompletedCourse = createAsyncThunk<
  CompletedCoursesResponse[],
  void,
  { state: RootState }
>("getCompletedCourse/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.BANNERS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CompletedCoursesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCompletedCourseById = createAsyncThunk<
  CompletedCoursesResponse,
  CompletedCoursesPararms,
  { state: RootState }
>("getCompletedCourseById/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.BANNERS.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CompletedCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCompletedCourse = createAsyncThunk<
  CompletedCoursesResponse,
  CompletedCoursesPararms,
  { state: RootState }
>("createCompletedCourse/create", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.BANNERS.GET}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CompletedCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCompletedCourse = createAsyncThunk<
  CompletedCoursesResponse,
  CompletedCoursesPararms,
  { state: RootState }
>("createCompletedCourse/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.BANNERS.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CompletedCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
