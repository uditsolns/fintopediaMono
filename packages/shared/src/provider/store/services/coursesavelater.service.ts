import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CoursesSaveLaterParams,
  CoursesSaveLaterResponse,
} from "../../../utils/types/courses-save-later";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";
import { DeleteParams } from "../../../utils/types/CourseCart";

export const getCoursesSaveLater = createAsyncThunk<
  CoursesSaveLaterResponse[],
  void,
  { state: RootState }
>("getCoursesSaveLater/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSE_SAVE_LATER.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CoursesSaveLaterResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCoursesSaveLaterById = createAsyncThunk<
  CoursesSaveLaterResponse,
  CoursesSaveLaterParams,
  { state: RootState }
>("getCoursesSaveLaterById/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.COURSE_SAVE_LATER.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as CoursesSaveLaterResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCoursesSaveLater = createAsyncThunk<
  CoursesSaveLaterResponse,
  CoursesSaveLaterParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "createCoursesSaveLater/post",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.COURSE_SAVE_LATER.POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      const data = (await response.json()) as CoursesSaveLaterResponse;
      thunkApi.dispatch(getCoursesSaveLater());
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCoursesSaveLater = createAsyncThunk<
  CoursesSaveLaterResponse,
  CoursesSaveLaterParams,
  { state: RootState }
>("updateCoursesSaveLater/update", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.COURSE_SAVE_LATER.UPDATE + "/" + params?.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as CoursesSaveLaterResponse;
    thunkApi.dispatch(getCoursesSaveLater())
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCoursesSaveLater = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>(
  "deleteCoursesSaveLater/delete",
  async ({ id, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.COURSE_SAVE_LATER.DELETE + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as any;
      thunkApi.dispatch(getCoursesSaveLater())
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
