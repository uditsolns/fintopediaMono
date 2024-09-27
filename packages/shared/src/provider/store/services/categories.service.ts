import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { CategoriesInfo } from "../../../utils/types/categories";

export const getCategories = createAsyncThunk<
  CategoriesInfo[],
  void,
  { state: RootState }
>("categories/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;

    const response = await fetch(apiUrl.CATEGORIES.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CategoriesInfo[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCategories = createAsyncThunk<
  CategoriesInfo,
  CategoriesInfo,
  { state: RootState }
>("categories/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const response = await fetch(apiUrl.CATEGORIES.POST + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CategoriesInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateCategories = createAsyncThunk<
  CategoriesInfo,
  CategoriesInfo,
  { state: RootState }
>("categories/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const response = await fetch(apiUrl.CATEGORIES.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as CategoriesInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCategories = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("categories/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const response = await fetch(apiUrl.CATEGORIES.DELETE + "/" + params, {
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
