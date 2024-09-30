import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { NewsInfo } from "../../../utils/types/news";

export const getNews = createAsyncThunk<NewsInfo[], void, { state: RootState }>(
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

      const data = (await response.json()) as NewsInfo[];

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createNews = createAsyncThunk<
  NewsInfo,
  NewsInfo,
  { state: RootState }
>("news/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.NEWS.POST + "/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as NewsInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateNews = createAsyncThunk<
  NewsInfo,
  NewsInfo & { token: string },
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

    const data = (await response.json()) as NewsInfo;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteNews = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("news/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.NEWS.DELETE + "/" + params, {
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
