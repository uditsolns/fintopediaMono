import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { CoursesParams, CoursesResponse } from "../../../utils/types/courses";

export const getCourses = createAsyncThunk<
  CoursesResponse[],
  void,
  { state: RootState }
>("courses/get", async (_, thunkApi) => {
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

    const data = (await response.json()) as CoursesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCourses = createAsyncThunk<
  CoursesResponse,
  CoursesParams,
  { state: RootState }
>("courses/post", async (params, thunkApi) => {
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

    const data = (await response.json()) as CoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCourses = createAsyncThunk<
  CoursesResponse,
  CoursesParams,
  { state: RootState }
>("courses/update", async (params, thunkApi) => {
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

    const data = (await response.json()) as CoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCourses = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("courses/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSES.DELETE + "/" + params, {
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
