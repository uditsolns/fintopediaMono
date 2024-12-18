import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  OngoingCoursesParams,
  OngoingCoursesResponse,
} from "../../../utils/types/ongoing-course";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/auth";

export const getOngoingCourse = createAsyncThunk<
  OngoingCoursesResponse[],
  void,
  { state: RootState }
>("getOngoingCourse/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.ONGOING_COURSES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as OngoingCoursesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getOngoingCourseById = createAsyncThunk<
  OngoingCoursesResponse,
  OngoingCoursesParams,
  { state: RootState }
>("getOngoingCourseById/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.ONGOING_COURSES.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as OngoingCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createOngoingCourse = createAsyncThunk<
  OngoingCoursesResponse,
  OngoingCoursesParams,
  { state: RootState }
>("createOngoingCourse/create", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.ONGOING_COURSES.GET}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as OngoingCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateOngoingCourse = createAsyncThunk<
  OngoingCoursesResponse,
  OngoingCoursesParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "updateOngoingCourse/update",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.ONGOING_COURSES.UPDATE + "/" + params?.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );

      const data = (await response.json()) as OngoingCoursesResponse;
      onSuccess(data);
      thunkApi.dispatch(getOngoingCourse());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
