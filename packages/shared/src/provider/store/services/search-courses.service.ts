import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  SearchCoursesParams,
  SearchCoursesResponse,
} from "../../../utils/types/search-courses";

export const postSeachCourses = createAsyncThunk<
  SearchCoursesResponse[],
  SearchCoursesParams,
  { state: RootState }
>("postSeachCourses/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.BANNERS.GET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as SearchCoursesResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
