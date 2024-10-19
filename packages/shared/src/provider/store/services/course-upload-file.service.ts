import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CourseUploadFileParams,
  CourseUploadFileResponse,
} from "../../../utils/types/course-upload-file";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";
import { DeleteParams } from "../../../utils/types/CourseCart";

export const getCourseUploadFile = createAsyncThunk<
  CourseUploadFileResponse[],
  void,
  { state: RootState }
>("getCourseUploadFile/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSE_UPLOAD_FILE.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CourseUploadFileResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCourseUploadFileById = createAsyncThunk<
  CourseUploadFileResponse,
  CourseUploadFileParams,
  { state: RootState }
>("getCourseUploadFileById/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.COURSE_UPLOAD_FILE.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as CourseUploadFileResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCourseUploadFile = createAsyncThunk<
  CourseUploadFileResponse,
  { formData: FormData } & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "createCourseUploadFile/post",
  async ({ formData, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.COURSE_UPLOAD_FILE.POST, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = (await response.json()) as CourseUploadFileResponse;
      thunkApi.dispatch(getCourseUploadFile());
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const createCourseUploadFileFormik = createAsyncThunk<
  CourseUploadFileResponse,
  { formData: FormData },
  { state: RootState }
>(
  "createCourseUploadFile/post",
  async ({ formData }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.COURSE_UPLOAD_FILE.POST, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = (await response.json()) as CourseUploadFileResponse;
      thunkApi.dispatch(getCourseUploadFile());

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateCourseUploadFile = createAsyncThunk<
  CourseUploadFileResponse,
  CourseUploadFileParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "updateCourseUploadFile/update",
  async ({ params, onError, onSuccess }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.COURSE_UPLOAD_FILE.UPDATE + "/" + params?.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );

      const data = (await response.json()) as CourseUploadFileResponse;
      thunkApi.dispatch(getCourseUploadFile());
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCourseUploadFile = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>(
  "deleteCourseUploadFile/delete",
  async ({ id, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.COURSE_UPLOAD_FILE.DELETE + "/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = (await response.json()) as any;
      thunkApi.dispatch(getCourseUploadFile());
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
