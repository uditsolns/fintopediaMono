import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  PreviousViewCoursesParams,
  PreviousViewCoursesResponse,
} from "../../../utils/types/previous-view-courses";

export const getPreviousViewCourses = createAsyncThunk<
  PreviousViewCoursesResponse[],
  void,
  { state: RootState }
>("getPreviousViewCourses/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as PreviousViewCoursesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getPreviousViewCoursesById = createAsyncThunk<
  PreviousViewCoursesResponse,
  PreviousViewCoursesParams,
  { state: RootState }
>("getPreviousViewCoursesById/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.COURSES.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as PreviousViewCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createPreviousViewCourses = createAsyncThunk<
  PreviousViewCoursesResponse,
  PreviousViewCoursesParams,
  { state: RootState }
>("createPreviousViewCourses/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSES.POST, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as PreviousViewCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updatePreviousViewCourses = createAsyncThunk<
  PreviousViewCoursesResponse,
  PreviousViewCoursesResponse,
  { state: RootState }
>("updatePreviousViewCourses/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSES.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as PreviousViewCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
