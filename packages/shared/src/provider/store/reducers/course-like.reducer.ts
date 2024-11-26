import { createSlice } from "@reduxjs/toolkit";
import { LikeCoursesState } from "../../../utils/types/course-like";
import {
  createLikeCourse,
  deleteLikeCourse,
  getLikeCourse,
  getLikeCourseById,
  updateLikeCourse,
} from "../services/course-like.service";
const initialState: LikeCoursesState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    likeCourse: false,
    singleLikeCourse: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    likeCourseErr: null,
    singleLikeCourseErr: null,
  },
  create: null,
  delete: null,
  update: null,
  likeCourse: [],
  singleLikeCourse: null,
};

const likeCourseSlice = createSlice({
  name: "likeCourse",
  initialState,
  reducers: {
    storeSingleLikeCourse: (state, action) => {
      state.singleLikeCourse = action.payload;
    },
    clearLikeCourse: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLikeCourse.pending, (state) => {
        state.loading.likeCourse = true;
      })
      .addCase(getLikeCourse.fulfilled, (state, action) => {
        state.loading.likeCourse = false;
        state.likeCourse = action.payload;
        state.err.likeCourseErr = null;
      })
      .addCase(getLikeCourse.rejected, (state, action) => {
        state.loading.likeCourse = false;
        state.err.likeCourseErr = action?.payload;
      })

      // single user course history
      .addCase(getLikeCourseById.pending, (state) => {
        state.loading.singleLikeCourse = true;
      })
      .addCase(getLikeCourseById.fulfilled, (state, action) => {
        state.loading.singleLikeCourse = false;
        state.singleLikeCourse = action.payload;
        state.err.singleLikeCourseErr = null;
      })
      .addCase(getLikeCourseById.rejected, (state, action) => {
        state.loading.singleLikeCourse = false;
        state.err.singleLikeCourseErr = action?.payload;
      })
      //   create
      .addCase(createLikeCourse.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createLikeCourse.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createLikeCourse.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateLikeCourse.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateLikeCourse.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateLikeCourse.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteLikeCourse.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteLikeCourse.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteLikeCourse.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { storeSingleLikeCourse, clearLikeCourse } =
  likeCourseSlice.actions;
export default likeCourseSlice.reducer;
