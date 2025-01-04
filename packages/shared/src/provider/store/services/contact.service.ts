import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types/storeTypes";
import apiUrl from "../../../config/apiUrl";
import { ContactParams, ContactResponse } from "../../../utils/types/contactus";
import { DeleteParams } from "../../../utils/types/CourseCart";
import {
  OnErrorInterface,
  OnSuccessInterface,
} from "../../../utils/types/roundLevel";
import { clearContact } from "../reducers/contact.reducer";

export const getContactSupport = createAsyncThunk<
  ContactResponse[],
  void,
  { state: RootState }
>("getContactSupport/get", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(apiUrl.CONTACT_SUPPORT.GET, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as ContactResponse[];

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getContactSupportById = createAsyncThunk<
  ContactResponse,
  ContactParams,
  { state: RootState }
>("getContactSupportById/get", async ({ params }, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;

    const response = await fetch(
      `${apiUrl.CONTACT_SUPPORT.GET}/${params?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (await response.json()) as ContactResponse;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// export const createContactSupport = createAsyncThunk<
//   ContactResponse,
//   ContactParams & OnSuccessInterface & OnErrorInterface,
//   { state: RootState }
// >(
//   "createContactSupport/post",
//   async ({ params, onSuccess, onError }, thunkApi) => {
//     try {
//       const state = thunkApi.getState();
//       const token = state.auth?.auth?.token;
//       const response = await fetch(apiUrl.CONTACT_SUPPORT.POST, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(params),
//       });

//       const data = (await response.json()) as ContactResponse;
//       onSuccess(data);
//       thunkApi.dispatch(getContactSupport());
//       return data;
//     } catch (error) {
//       onError(error);
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );
export const createContactSupport = createAsyncThunk<
  ContactResponse,
  ContactParams & OnSuccessInterface,
  { state: RootState }
>("createContactSupport/post", async ({params,onSuccess}, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth?.auth?.token;
    const response = await fetch(apiUrl.CONTACT_SUPPORT.POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as ContactResponse;
    thunkApi.dispatch(clearContact());
    thunkApi.dispatch(getContactSupport());
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const updateContactSupport = createAsyncThunk<
  ContactResponse,
  ContactParams & OnSuccessInterface & OnErrorInterface,
  { state: RootState }
>(
  "updateContactSupport/update",
  async ({ params, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(
        apiUrl.CONTACT_SUPPORT.UPDATE + "/" + params?.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );

      const data = (await response.json()) as ContactResponse;
      onSuccess(data);
      thunkApi.dispatch(getContactSupport());
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteContactSupport = createAsyncThunk<
  any,
  DeleteParams,
  { state: RootState }
>(
  "deleteContactSupport/delete",
  async ({ id, onSuccess, onError }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth?.auth?.token;
      const response = await fetch(apiUrl.CONTACT_SUPPORT.DELETE + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as any;
      thunkApi.dispatch(getContactSupport());
      onSuccess(data);
      return data;
    } catch (error) {
      onError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
