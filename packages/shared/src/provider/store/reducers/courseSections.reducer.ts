import { CoursesSectionState } from "../../../utils/types/coursesSections";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCoursesSections,
  getCoursesSections,
  updateCoursesSections,
  createCoursesSections,
} from "../services/courseSections.service";

const initialState: CoursesSectionState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    coursesSection: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    coursesSectionErr: null,
  },
  create: null,
  delete: null,
  update: null,
  coursesSection: [],
};

const coursesSectionSlice = createSlice({
  name: "coursesSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesSections.pending, (state) => {
        state.loading.coursesSection = true;
      })
      .addCase(getCoursesSections.fulfilled, (state, action) => {
        state.loading.coursesSection = false;
        state.coursesSection = action.payload;
        state.err.coursesSectionErr = null;
      })
      .addCase(getCoursesSections.rejected, (state, action) => {
        state.loading.coursesSection = false;
        state.err.coursesSectionErr = action?.payload;
      })
      //   create
      .addCase(createCoursesSections.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCoursesSections.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createCoursesSections.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateCoursesSections.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCoursesSections.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCoursesSections.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCoursesSections.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCoursesSections.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCoursesSections.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default coursesSectionSlice.reducer;
