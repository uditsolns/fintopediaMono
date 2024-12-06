import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CourseReviewParams,
  CourseReviewResponse,
} from "../../../utils/types/course-review";
import { DeleteParams } from "../../../utils/types/CourseCart";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";
import { getCourses } from "./courses.service";

export const getCourseReviews = createAsyncThunk<
  CourseReviewResponse[],
  void, 
  { state: RootState }
>("getCourseReviews/get", async (_, thunkApi) => {
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
>("getCourseReviewsById/get", async ({ params }, thunkApi) => {
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

    const data = (await response.json()) as CourseReviewResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCourseReview = createAsyncThunk<
  CourseReviewResponse,
  CourseReviewParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "createCourseReview/post",
  async ({ params, onSuccess, onError }, thunkApi) => {
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

      const data = (await response.json()) as CourseReviewResponse;
      onSuccess(data);
      thunkApi.dispatch(getCourseReviews());
      thunkApi.dispatch(getCourses());

      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCourseReview = createAsyncThunk<
  CourseReviewResponse,
  CourseReviewParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "updateCourseReview/update",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.COURSES_RATING_REVIEWS.UPDATE + "/" + params?.id,
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
      onSuccess(data);
      thunkApi.dispatch(getCourseReviews());
      thunkApi.dispatch(getCourses());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCourseReview = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>("deleteCourseReview/delete", async ({ id, onSuccess, onError }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.COURSES_RATING_REVIEWS.DELETE + "/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as any;
    thunkApi.dispatch(getCourseReviews());
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});
