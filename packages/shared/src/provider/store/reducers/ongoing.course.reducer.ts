import { createSlice } from "@reduxjs/toolkit";
import { OngoingCourseState } from "../../../utils/types/ongoing-course";
import {
  createOngoingCourse,
  getOngoingCourse,
  getOngoingCourseById,
  updateOngoingCourse,
} from "../services/ongoing-course.service";

const initialState: OngoingCourseState = {
  loading: {
    create: false,
    update: false,
    ongoing_courses: false,
    single_ongoing_courses: false,
  },
  err: {
    create_err: null,
    update_err: null,
    single_ongoing_courses_err: null,
    ongoing_courses_err: null,
  },
  create: null,
  update: null,
  ongoing_courses: [],
  single_ongoing_courses: null,
};

const ongoingCourseSlice = createSlice({
  name: "ongoingCourse",
  initialState,
  reducers: {
    storeSingleOngoingCourse: (state, action) => {
      state.single_ongoing_courses = action.payload;
    },
    resetOngoingCourse: (state) => {
      state.create = null;
      state.update = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOngoingCourse.pending, (state) => {
        state.loading.ongoing_courses = true;
      })
      .addCase(getOngoingCourse.fulfilled, (state, action) => {
        state.loading.ongoing_courses = false;
        state.ongoing_courses = action.payload;
        state.err.ongoing_courses_err = null;
      })
      .addCase(getOngoingCourse.rejected, (state, action) => {
        state.loading.ongoing_courses = false;
        state.err.ongoing_courses_err = action?.payload;
      })

      .addCase(getOngoingCourseById.pending, (state) => {
        state.loading.single_ongoing_courses = true;
      })
      .addCase(getOngoingCourseById.fulfilled, (state, action) => {
        state.loading.single_ongoing_courses = false;
        state.single_ongoing_courses = action.payload;
        state.err.single_ongoing_courses_err = null;
      })
      .addCase(getOngoingCourseById.rejected, (state, action) => {
        state.loading.single_ongoing_courses = false;
        state.err.single_ongoing_courses_err = action?.payload;
      })
      //   create
      .addCase(createOngoingCourse.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createOngoingCourse.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.create_err = null;
      })
      .addCase(createOngoingCourse.rejected, (state, action) => {
        state.loading.create = false;
        state.err.create_err = action?.payload;
      })
      //  update
      .addCase(updateOngoingCourse.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateOngoingCourse.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.update_err = null;
      })
      .addCase(updateOngoingCourse.rejected, (state, action) => {
        state.loading.update = false;
        state.err.update_err = action?.payload;
      });
  },
});

export const { storeSingleOngoingCourse, resetOngoingCourse } =
  ongoingCourseSlice.actions;
export default ongoingCourseSlice.reducer;
