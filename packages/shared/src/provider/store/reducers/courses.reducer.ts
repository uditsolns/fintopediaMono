import { CoursesState } from "../../../utils/types/courses";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCourses,
  getCourses,
  updateCourses,
  createCourses,
} from "../services/courses.service";

const initialState: CoursesState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    courses: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    coursesErr: null,
  },
  create: null,
  delete: null,
  update: null,
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading.courses = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading.courses = false;
        state.courses = action.payload;
        state.err.coursesErr = null;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading.courses = false;
        state.err.coursesErr = action?.payload;
      })
      //   create
      .addCase(createCourses.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCourses.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createCourses.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateCourses.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCourses.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCourses.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCourses.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCourses.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCourses.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default coursesSlice.reducer;
