import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CourseNotesParams,
  CourseNotesResponse,
} from "../../../utils/types/course-notes";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";
import { DeleteParams } from "../../../utils/types/CourseCart";

export const getCourseNotes = createAsyncThunk<
  CourseNotesResponse[],
  void,
  { state: RootState }
>("getCourseNotes/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSE_NOTES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CourseNotesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCourseNotesById = createAsyncThunk<
  CourseNotesResponse,
  CourseNotesParams,
  { state: RootState }
>("getCourseNotesById/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.COURSE_NOTES.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CourseNotesResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCourseNotes = createAsyncThunk<
  CourseNotesResponse,
  CourseNotesParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "createCourseNotes/post",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.COURSE_NOTES.POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      const data = (await response.json()) as CourseNotesResponse;
      thunkApi.dispatch(getCourseNotes())
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCourseNotes = createAsyncThunk<
  CourseNotesResponse,
  CourseNotesParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "updateCourseNotes/update",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.COURSE_NOTES.UPDATE + "/" + params?.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );

      const data = (await response.json()) as CourseNotesResponse;
      thunkApi.dispatch(getCourseNotes())
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCourseNotes = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>("deleteCouponCode/delete", async ({ id, onSuccess, onError }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSE_NOTES.DELETE + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as any;
    thunkApi.dispatch(getCourseNotes())
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});
