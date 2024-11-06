import { CoursesState } from "../../../utils/types/courses";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCourses,
  getCourses,
  updateCourses,
  createCourses,
  getCoursesById,
} from "../services/courses.service";

const initialState: CoursesState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    courses: false,
    singleCourse: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    coursesErr: null,
    singleCourseErr: null,
  },
  create: null,
  delete: null,
  update: null,
  courses: [],
  singleCourse: null,
  video_url: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    storeSingleCourse: (state, action) => {
      state.singleCourse = action.payload;
    },
    clearCourse: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
    storeVideoUrl: (state, action) => {
      state.video_url = action.payload;
    },
    clearVideoUrl: (state) => {
      state.video_url = null;
    },
  },
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
      // single  course
      .addCase(getCoursesById.pending, (state) => {
        state.loading.singleCourse = true;
      })
      .addCase(getCoursesById.fulfilled, (state, action) => {
        state.loading.singleCourse = false;
        state.singleCourse = action.payload;
        state.err.singleCourseErr = null;
      })
      .addCase(getCoursesById.rejected, (state, action) => {
        state.loading.singleCourse = false;
        state.err.singleCourseErr = action?.payload;
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
export const { storeSingleCourse, clearCourse, storeVideoUrl,clearVideoUrl } =
  coursesSlice.actions;
export default coursesSlice.reducer;
