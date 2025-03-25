import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  SearchCoursesParams,
} from "../../../utils/types/search-courses";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";
import { CoursesResponse } from "../../../utils/types/courses";

export const postSeachCourses = createAsyncThunk<
  CoursesResponse[],
  SearchCoursesParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>("postSeachCourses/post", async ({ params, onSuccess, onError }, thunkApi) => {
  try {
    // const state = thunkApi.getState();
    // const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.SEARCH_COURSES.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CoursesResponse[];
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});
