import { createSlice } from "@reduxjs/toolkit";
import { PreviousViewCoursesState } from "../../../utils/types/previous-view-courses";
import {
  createPreviousViewCourses,
  getPreviousViewCourses,
  getPreviousViewCoursesById,
  updatePreviousViewCourses,
} from "../services/previous-view-course.service";

const initialState: PreviousViewCoursesState = {
  loading: {
    create: false,
    update: false,
    previous_view_courses: false,
    single_previous_view_courses: false,
  },
  err: {
    create_err: null,
    update_err: null,
    previous_view_courses_err: null,
    single_previous_view_courses_err: null,
  },
  create: null,
  update: null,
  previous_view_courses: [],
  single_previous_view_courses: null,
};

const previousViewCourseSlice = createSlice({
  name: "previousViewCourse",
  initialState,
  reducers: {
    storeSinglePreviousViewCourse: (state, action) => {
      state.single_previous_view_courses = action.payload;
    },
    resetPreviousViewCourse: (state) => {
      state.create = null;
      state.update = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPreviousViewCourses.pending, (state) => {
        state.loading.previous_view_courses = true;
      })
      .addCase(getPreviousViewCourses.fulfilled, (state, action) => {
        state.loading.previous_view_courses = false;
        state.previous_view_courses = action.payload;
        state.err.previous_view_courses_err = null;
      })
      .addCase(getPreviousViewCourses.rejected, (state, action) => {
        state.loading.previous_view_courses = false;
        state.err.previous_view_courses_err = action?.payload;
      })

      .addCase(getPreviousViewCoursesById.pending, (state) => {
        state.loading.single_previous_view_courses = true;
      })
      .addCase(getPreviousViewCoursesById.fulfilled, (state, action) => {
        state.loading.single_previous_view_courses = false;
        state.single_previous_view_courses = action.payload;
        state.err.single_previous_view_courses_err = null;
      })
      .addCase(getPreviousViewCoursesById.rejected, (state, action) => {
        state.loading.single_previous_view_courses = false;
        state.err.single_previous_view_courses_err = action?.payload;
      })
      //   create
      .addCase(createPreviousViewCourses.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createPreviousViewCourses.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.create_err = null;
      })
      .addCase(createPreviousViewCourses.rejected, (state, action) => {
        state.loading.create = false;
        state.err.create_err = action?.payload;
      })
      //  update
      .addCase(updatePreviousViewCourses.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updatePreviousViewCourses.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.update_err = null;
      })
      .addCase(updatePreviousViewCourses.rejected, (state, action) => {
        state.loading.update = false;
        state.err.update_err = action?.payload;
      });
  },
});

export const { storeSinglePreviousViewCourse, resetPreviousViewCourse } =
  previousViewCourseSlice.actions;
export default previousViewCourseSlice.reducer;
