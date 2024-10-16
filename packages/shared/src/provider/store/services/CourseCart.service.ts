import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CourseCartParams,
  CourseCartResponse,
  DeleteParams,
} from "../../../utils/types/CourseCart";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";

export const getCourseCart = createAsyncThunk<
  CourseCartResponse[],
  void,
  { state: RootState }
>("courseCart/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COURSE_ADD_TO_CART.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CourseCartResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCourseCartById = createAsyncThunk<
  CourseCartResponse,
  CourseCartParams,
  { state: RootState }
>("singleCourseCart/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.COURSE_ADD_TO_CART.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as CourseCartResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCourseCart = createAsyncThunk<
  CourseCartResponse,
  CourseCartParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>("courseCart/post", async ({ params, onSuccess, onError }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSE_ADD_TO_CART.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CourseCartResponse;
    thunkApi.dispatch(getCourseCart());
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCourseCart = createAsyncThunk<
  CourseCartResponse,
  CourseCartParams,
  { state: RootState }
>("courseCart/update", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.COURSE_ADD_TO_CART.UPDATE + "/" + params?.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as CourseCartResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCourseCart = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>("courseCart/delete", async ({ id, onSuccess, onError }, thunkApi) => {
  console.log(id)
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.COURSE_ADD_TO_CART.DELETE + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as any;
    thunkApi.dispatch(getCourseCart())
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    return thunkApi.rejectWithValue(error);
  }
});
