import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  SearchCoursesParams,
  SearchCoursesResponse,
} from "../../../utils/types/search-courses";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";

export const postSeachCourses = createAsyncThunk<
  SearchCoursesResponse[],
  SearchCoursesParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>("postSeachCourses/post", async ({ params, onSuccess, onError }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.SEARCH_COURSES.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as SearchCoursesResponse[];
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});
