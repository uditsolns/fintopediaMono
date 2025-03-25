import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  OngoingCoursesStatusPararms,
  OngoingCoursesStatusResponse,
} from "../../../utils/types/ongoing-courses-status";

export const getOngoingCourseStatus = createAsyncThunk<
  OngoingCoursesStatusResponse[],
  void,
  { state: RootState }
>("getOngoingCourseStatus/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.ONGOING_COURSES_STATUS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as OngoingCoursesStatusResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getOngoingCourseStatusById = createAsyncThunk<
  OngoingCoursesStatusResponse,
  OngoingCoursesStatusPararms,
  { state: RootState }
>("getOngoingCourseStatusById/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.ONGOING_COURSES_STATUS.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as OngoingCoursesStatusResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createOngoingCourseStatus = createAsyncThunk<
  OngoingCoursesStatusResponse,
  OngoingCoursesStatusPararms,
  { state: RootState }
>("createOngoingCourseStatus/create", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.ONGOING_COURSES_STATUS.GET}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as OngoingCoursesStatusResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateOngoingCourseStatus= createAsyncThunk<
  OngoingCoursesStatusResponse,
  OngoingCoursesStatusPararms,
  { state: RootState }
>("updateOngoingCourseStatus/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.ONGOING_COURSES_STATUS.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as OngoingCoursesStatusResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

