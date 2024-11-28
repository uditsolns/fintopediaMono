import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import {
  DownloadCertificateParams,
  UserCertificateParams,
  UserCertificateResponse,
} from "../../../utils/types/UserCertificate";

export const getUserCertificate = createAsyncThunk<
  UserCertificateResponse[],
  void,
  { state: RootState }
>("userCertificate/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.USER_CERTIFICATE.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as UserCertificateResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getUserCertificateById = createAsyncThunk<
  UserCertificateResponse,
  UserCertificateParams,
  { state: RootState }
>("getUserCertificateById/get", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.DOWNLOAD_CERTIFICATE.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as UserCertificateResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createUserCertificate = createAsyncThunk<
  UserCertificateResponse,
  UserCertificateParams,
  { state: RootState }
>("userCertificate/post", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.USER_CERTIFICATE.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as UserCertificateResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateUserCertificate = createAsyncThunk<
  UserCertificateResponse,
  UserCertificateParams,
  { state: RootState }
>("userCertificate/update", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.USER_CERTIFICATE.UPDATE + "/" + params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      }
    );

    const data = (await response.json()) as UserCertificateResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// export const downloadUserCertificate = createAsyncThunk<
//   any,
//   DownloadCertificateParams,
//   { state: RootState } 
// >("userCertificate/post", async ({ id, onSuccess, onError }, thunkApi) => {
//   try {
//     const state = thunkApi.getState();
//     const token = state.auth?.auth?.token;
//     const response = await fetch(apiUrl.DOWNLOAD_CERTIFICATE.GET + "/" + id, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = (await response.json()) as any;
//     thunkApi.dispatch(getUserCertificate());
//     onSuccess(data);
//     return data;
//   } catch (error) {
//     onError(error);
//     return thunkApi.rejectWithValue(error);
//   }
// });
export const deleteUserCertificate = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("userCertificate/delete", async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(
      apiUrl.USER_CERTIFICATE.DELETE + "/" + params,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as string;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
