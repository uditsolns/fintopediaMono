import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { CourseReviewParams, CourseReviewResponse } from "../../../utils/types/course-review";

export const getCourseReviews = createAsyncThunk<
  CourseReviewResponse[],
  void,
  { state: RootState }
>("getCourseReviews/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.NOTIFICATION.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CourseReviewResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCourseReviewsById = createAsyncThunk<
  CourseReviewResponse,
  CourseReviewParams,
  { state: RootState }
>("getCourseReviewsById/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.NOTIFICATION.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CourseReviewResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCourseReview = createAsyncThunk<
  CourseReviewResponse,
  CourseReviewParams,
  { state: RootState }
>("createCourseReview/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.NOTIFICATION.POST,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as CourseReviewResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCourseReview= createAsyncThunk<
  CourseReviewResponse,
  CourseReviewParams,
  { state: RootState }
>("updateCourseReview/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.NOTIFICATION.UPDATE + "/" + params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as CourseReviewResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCourseReview = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("deleteCourseReview/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.NOTIFICATION.DELETE + "/" + params,
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
