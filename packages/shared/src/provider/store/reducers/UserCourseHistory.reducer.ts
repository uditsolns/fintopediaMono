import { UserCourseHistoryState } from "../../../utils/types/UserCourseHistory";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserCourseHistory,
  getUserCourseHistory,
  updateUserCourseHistory,
  createUserCourseHistory,
} from "../services/UserCourseHistory.service";

const initialState: UserCourseHistoryState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    userCourseHistory: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    userCourseHistoryErr: null,
  },
  create: null,
  delete: null,
  update: null,
  userCourseHistory: [],
};

const userCourseHistorySlice = createSlice({
  name: "userCourseHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCourseHistory.pending, (state) => {
        state.loading.userCourseHistory = true;
      })
      .addCase(getUserCourseHistory.fulfilled, (state, action) => {
        state.loading.userCourseHistory = false;
        state.userCourseHistory = action.payload;
        state.err.userCourseHistoryErr = null;
      })
      .addCase(getUserCourseHistory.rejected, (state, action) => {
        state.loading.userCourseHistory = false;
        state.err.userCourseHistoryErr = action?.payload;
      })
      //   create
      .addCase(createUserCourseHistory.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createUserCourseHistory.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createUserCourseHistory.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateUserCourseHistory.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateUserCourseHistory.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateUserCourseHistory.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteUserCourseHistory.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteUserCourseHistory.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteUserCourseHistory.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default userCourseHistorySlice.reducer;
