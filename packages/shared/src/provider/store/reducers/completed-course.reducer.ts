import { createSlice } from "@reduxjs/toolkit";
import { CompletedCourseState } from "../../../utils/types/completed-course";
import {
  createCompletedCourse,
  getCompletedCourse,
  getCompletedCourseById,
  updateCompletedCourse,
} from "../services/completed-course.service";

const initialState: CompletedCourseState = {
  loading: {
    create: false,
    update: false,
    completed_courses: false,
    single_completed_courses: false,
  },
  err: {
    create_err: null,
    update_err: null,
    single_completed_courses_err: null,
    completed_courses_err: null,
  },
  create: null,
  update: null,
  completed_courses: [],
  single_completed_courses: null,
};

const completedCourseSlice = createSlice({
  name: "completedCourse",
  initialState,
  reducers: {
    storeSingleCompletedCourse: (state, action) => {
      state.single_completed_courses = action.payload;
    },
    resetCompletedCourse: (state) => {
      state.create = null;
      state.update = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompletedCourse.pending, (state) => {
        state.loading.completed_courses = true;
      })
      .addCase(getCompletedCourse.fulfilled, (state, action) => {
        state.loading.completed_courses = false;
        state.completed_courses = action.payload;
        state.err.completed_courses_err = null;
      })
      .addCase(getCompletedCourse.rejected, (state, action) => {
        state.loading.completed_courses = false;
        state.err.completed_courses_err = action?.payload;
      })

      .addCase(getCompletedCourseById.pending, (state) => {
        state.loading.single_completed_courses = true;
      })
      .addCase(getCompletedCourseById.fulfilled, (state, action) => {
        state.loading.single_completed_courses = false;
        state.single_completed_courses = action.payload;
        state.err.single_completed_courses_err = null;
      })
      .addCase(getCompletedCourseById.rejected, (state, action) => {
        state.loading.single_completed_courses = false;
        state.err.single_completed_courses_err = action?.payload;
      })
      //   create
      .addCase(createCompletedCourse.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCompletedCourse.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.create_err = null;
      })
      .addCase(createCompletedCourse.rejected, (state, action) => {
        state.loading.create = false;
        state.err.create_err = action?.payload;
      })
      //  update
      .addCase(updateCompletedCourse.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCompletedCourse.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.update_err = null;
      })
      .addCase(updateCompletedCourse.rejected, (state, action) => {
        state.loading.update = false;
        state.err.update_err = action?.payload;
      });
  },
});

export const { storeSingleCompletedCourse, resetCompletedCourse } =
  completedCourseSlice.actions;
export default completedCourseSlice.reducer;
