import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { NewsInfo, NewsInfo2 } from "../../../utils/types/news";

export const getNews = createAsyncThunk<NewsInfo2[], void, { state: RootState }>(
  "news/get",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;

      const response = await fetch(apiUrl.NEWS.GET, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as NewsInfo2[];

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createNews = createAsyncThunk<
  NewsInfo2,
  NewsInfo,
  { state: RootState }
>("news/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.NEWS.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as NewsInfo2;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateNews = createAsyncThunk<
  NewsInfo2,
  NewsInfo,
  { state: RootState }
>("news/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.NEWS.UPDATE + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as NewsInfo2;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteNews = createAsyncThunk<
  string | number,
  number,
  { state: RootState }
>("news/delete", async (id, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.NEWS.DELETE + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as string | number;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
