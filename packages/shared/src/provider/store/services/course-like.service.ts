import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  LikeCoursesParams,
  LikeCoursesResponse,
} from "../../../utils/types/course-like";
import { DeleteParams } from "../../../utils/types/CourseCart";
import {
  OnErrorInterface,
  OnSuccessInterface, 
} from "../../../utils/types/roundLevel"; 

export const getLikeCourse = createAsyncThunk<
  LikeCoursesResponse[], 
  void, 
  { state: RootState }
>("getLikeCourse/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSE_LIKE.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as LikeCoursesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getLikeCourseById = createAsyncThunk<
  LikeCoursesResponse,
  LikeCoursesParams,
  { state: RootState }
>("getLikeCourseById/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.COURSE_LIKE.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as LikeCoursesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createLikeCourse = createAsyncThunk<
  LikeCoursesResponse,
  LikeCoursesParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "createLikeCourse/post",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.COURSE_LIKE.POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      const data = (await response.json()) as LikeCoursesResponse;
      onSuccess(data);
      thunkApi.dispatch(getLikeCourse());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateLikeCourse = createAsyncThunk<
  LikeCoursesResponse,
  LikeCoursesParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "updateLikeCourse/update",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.COURSE_LIKE.UPDATE + "/" + params?.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );

      const data = (await response.json()) as LikeCoursesResponse;
      onSuccess(data);
      thunkApi.dispatch(getLikeCourse());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteLikeCourse = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>("deleteLikeCourse/delete", async ({ id, onSuccess, onError }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.COURSE_LIKE.DELETE + "/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as any;
    thunkApi.dispatch(getLikeCourse());
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});
