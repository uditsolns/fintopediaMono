import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  CompletionPercentageParams,
  CompletionPercentageResponse,
} from "../../../utils/types/completion-percentage";
import { DeleteParams } from "../../../utils/types/CourseCart";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";

export const getCompletionPercentage = createAsyncThunk<
  CompletionPercentageResponse[],
  void,
  { state: RootState }
>("getCompletionPercentage/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.COMPLETION_PERCENTAGE.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as CompletionPercentageResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCompletionPercentageById = createAsyncThunk<
  CompletionPercentageResponse,
  CompletionPercentageParams,
  { state: RootState }
>("getCompletionPercentageById/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.COMPLETION_PERCENTAGE.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as CompletionPercentageResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCompletionPercentage = createAsyncThunk<
  CompletionPercentageResponse,
  CompletionPercentageParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "createCompletionPercentage/post",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.COMPLETION_PERCENTAGE.POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      const data = (await response.json()) as CompletionPercentageResponse;
      onSuccess(data);
      thunkApi.dispatch(getCompletionPercentage());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCompletionPercentage = createAsyncThunk<
  CompletionPercentageResponse,
  CompletionPercentageParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "updateCompletionPercentage/update",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.COMPLETION_PERCENTAGE.UPDATE + "/" + params?.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );

      const data = (await response.json()) as CompletionPercentageResponse;
      onSuccess(data);
      thunkApi.dispatch(getCompletionPercentage());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCompletionPercentage = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>(
  "deleteCompletionPercentage/delete",
  async ({ id, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.COMPLETION_PERCENTAGE.DELETE + "/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = (await response.json()) as any;
      thunkApi.dispatch(getCompletionPercentage());
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
