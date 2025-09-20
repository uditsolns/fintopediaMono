import { UserCourseHistoryState } from "../../../utils/types/UserCourseHistory";
import { createSlice } from "@reduxjs/toolkit";
import {
  createUserCourseHistory,
  deleteUserCourseHistory,
  getUserCourseHistory,
  getUserCourseHistoryById,
  updateUserCourseHistory,
} from "../services/UserCourseHistory.service";

const initialState: UserCourseHistoryState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    user_course_history: false,
    single_user_course_history: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    user_course_history_err: null,
    single_user_course_history_err: null,
  },
  create: null,
  delete: null,
  update: null,
  user_course_history: [],
  single_user_course_history: null,
};

const userCourseHistorySlice = createSlice({
  name: "userCourseHistory",
  initialState,
  reducers: {
    storeSingleUserCourseHistory: (state, action) => {
      state.single_user_course_history = action.payload;
    },
    clearUserCourseHistory: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCourseHistory.pending, (state) => {
        state.loading.user_course_history = true;
      })
      .addCase(getUserCourseHistory.fulfilled, (state, action) => {
        state.loading.user_course_history = false;
        state.user_course_history = action.payload;
        state.err.user_course_history_err = null;
      })
      .addCase(getUserCourseHistory.rejected, (state, action) => {
        state.loading.user_course_history = false;
        state.err.user_course_history_err = action?.payload;
      })

      // single user course history
      .addCase(getUserCourseHistoryById.pending, (state) => {
        state.loading.single_user_course_history = true;
      })
      .addCase(getUserCourseHistoryById.fulfilled, (state, action) => {
        state.loading.single_user_course_history = false;
        state.single_user_course_history = action.payload;
        state.err.single_user_course_history_err = null;
      })
      .addCase(getUserCourseHistoryById.rejected, (state, action) => {
        state.loading.single_user_course_history = false;
        state.err.single_user_course_history_err = action?.payload;
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
export const { storeSingleUserCourseHistory, clearUserCourseHistory } =
  userCourseHistorySlice.actions;
export default userCourseHistorySlice.reducer;
