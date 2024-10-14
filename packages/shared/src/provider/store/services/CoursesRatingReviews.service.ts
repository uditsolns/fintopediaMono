import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CoursesRatingReviewsResponse,
  CoursesRatingReviewsParams,
} from "../../../utils/types/CoursesRatingReviews";

export const getCoursesRatingReviews = createAsyncThunk<
  CoursesRatingReviewsResponse[],
  void,
  { state: RootState }
>("coursesRatingReviews/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSES_RATING_REVIEWS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CoursesRatingReviewsResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCoursesRatingReviewById = createAsyncThunk<
  CoursesRatingReviewsParams,
  CoursesRatingReviewsParams,
  { state: RootState }
>("singleCoursesRatingReviews/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.COURSES_RATING_REVIEWS.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as CoursesRatingReviewsParams;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCoursesRatingReviews = createAsyncThunk<
  CoursesRatingReviewsResponse,
  CoursesRatingReviewsParams,
  { state: RootState }
>("coursesRatingReviews/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSES_RATING_REVIEWS.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CoursesRatingReviewsResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCoursesRatingReviews = createAsyncThunk<
  CoursesRatingReviewsResponse,
  CoursesRatingReviewsParams,
  { state: RootState }
>("coursesRatingReviews/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.COURSES_RATING_REVIEWS.UPDATE + "/" + params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as CoursesRatingReviewsResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCoursesRatingReviews = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("coursesRatingReviews/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.COURSES_RATING_REVIEWS.DELETE + "/" + params,
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
