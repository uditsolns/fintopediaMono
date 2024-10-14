import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CoursesSectionResponse,
  CoursesSectionParams,
} from "../../../utils/types/coursesSections";

export const getCoursesSections = createAsyncThunk<
  CoursesSectionResponse[],
  void,
  { state: RootState }
>("coursesSections/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSE_SECTIONS.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CoursesSectionResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCourseSectionById = createAsyncThunk<
  CoursesSectionResponse,
  CoursesSectionParams, 
  { state: RootState }
>("singleCourseSection/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState(); 
    const token = state.auth?.auth?.token;

    const response = await fetch(`${apiUrl.COURSE_SECTIONS.GET}/${params?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CoursesSectionResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}); 

export const createCoursesSections = createAsyncThunk<
  CoursesSectionResponse,
  CoursesSectionParams,
  { state: RootState }
>("coursesSections/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSE_SECTIONS.POST, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CoursesSectionResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCoursesSections = createAsyncThunk<
  CoursesSectionResponse,
  CoursesSectionParams,
  { state: RootState }
>("coursesSections/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.COURSE_SECTIONS.UPDATE + "/" + params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as CoursesSectionResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCoursesSections = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("coursesSections/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSE_SECTIONS.DELETE + "/" + params, {
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
