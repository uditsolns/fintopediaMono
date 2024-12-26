
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserCertificate,
  getUserCertificate,
  updateUserCertificate,
  createUserCertificate,
  getUserCertificateById,
} from "../services/UserCertificate.service";
import { UserCertificateState } from "../../../utils/types/UserCertificate";

const initialState: UserCertificateState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    userCertificate: false,
    singleUserCertificate:false
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    userCertificateErr: null,
    singleUserCertificateErr: null,
  },
  create: null,
  delete: null,
  update: null,
  userCertificate: [],
  singleUserCertificate: null,
};

const userCertificateSlice = createSlice({
  name: "userCertificate",
  initialState,
  reducers: {
    storeSingleUserCertificate: (state, action) => {
      state.singleUserCertificate = action.payload;
    },
    clearUserCertificate: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCertificate.pending, (state) => {
        state.loading.userCertificate = true;
      })
      .addCase(getUserCertificate.fulfilled, (state, action) => {
        state.loading.userCertificate = false;
        state.userCertificate = action.payload;
        state.err.userCertificateErr = null;
      })
      .addCase(getUserCertificate.rejected, (state, action) => {
        state.loading.userCertificate = false;
        state.err.userCertificateErr = action?.payload;
      })

      // single user certificate
      .addCase(getUserCertificateById.pending, (state) => {
        state.loading.singleUserCertificate = true;
      })
      .addCase(getUserCertificateById.fulfilled, (state, action) => {
        state.loading.singleUserCertificate = false;
        state.singleUserCertificate = action.payload;
        state.err.singleUserCertificateErr = null;
      })
      .addCase(getUserCertificateById.rejected, (state, action) => {
        state.loading.singleUserCertificate = false;
        state.err.singleUserCertificateErr = action?.payload;
      })
      //   create
      .addCase(createUserCertificate.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createUserCertificate.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createUserCertificate.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateUserCertificate.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateUserCertificate.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateUserCertificate.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteUserCertificate.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteUserCertificate.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteUserCertificate.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export const { storeSingleUserCertificate, clearUserCertificate } =
userCertificateSlice.actions;

export default userCertificateSlice.reducer;
