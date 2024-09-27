import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { CoursesRatingReviewsInfo } from "../../../utils/types/CoursesRatingReviews";

export const getCoursesRatingReviews = createAsyncThunk<
  CoursesRatingReviewsInfo[],
  void,
  { state: RootState }
>("coursesRatingReviews/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;

    const response = await fetch(apiUrl.COURSES_RATING_REVIEWS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CoursesRatingReviewsInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCoursesRatingReviews = createAsyncThunk<
  CoursesRatingReviewsInfo,
  CoursesRatingReviewsInfo,
  { state: RootState }
>("coursesRatingReviews/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const response = await fetch(apiUrl.COURSES_RATING_REVIEWS.POST + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CoursesRatingReviewsInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCoursesRatingReviews = createAsyncThunk<
  CoursesRatingReviewsInfo,
  CoursesRatingReviewsInfo,
  { state: RootState }
>("coursesRatingReviews/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const response = await fetch(apiUrl.COURSES_RATING_REVIEWS.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CoursesRatingReviewsInfo;

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
    const token = state.auth.token;
    const response = await fetch(apiUrl.COURSES_RATING_REVIEWS.DELETE + "/" + params, {
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
