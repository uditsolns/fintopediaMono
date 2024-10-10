
import { createSlice } from "@reduxjs/toolkit";
import { CoursesSaveLaterState } from "../../../utils/types/courses-save-later";
import { createCoursesSaveLater, deleteCoursesSaveLater, getCoursesSaveLater, getCoursesSaveLaterById, updateCoursesSaveLater } from "../services/coursesavelater.service";



const initialState: CoursesSaveLaterState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    courses_save_later: false,
    single_courses_save_later: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    courses_save_later_err: null,
    single_courses_save_later_err: null,
  },
  create: null,
  delete: null,
  update: null,
  courses_save_later: [],
  single_courses_save_later: null,
};

const coursesSaveLaterSlice = createSlice({
  name: "coursesSaveLater",
  initialState,
  reducers: {
    storeSingleCoursesSaveLater: (state, action) => {
      state.single_courses_save_later = action.payload;
    },
    clearCoursesSaveLater: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesSaveLater.pending, (state) => {
        state.loading.courses_save_later = true;
      })
      .addCase(getCoursesSaveLater.fulfilled, (state, action) => {
        state.loading.courses_save_later = false;
        state.courses_save_later = action.payload;
        state.err.courses_save_later_err = null;
      })
      .addCase(getCoursesSaveLater.rejected, (state, action) => {
        state.loading.courses_save_later = false;
        state.err.courses_save_later_err = action?.payload;
      })

      // single user course history
      .addCase(getCoursesSaveLaterById.pending, (state) => {
        state.loading.single_courses_save_later = true;
      })
      .addCase(getCoursesSaveLaterById.fulfilled, (state, action) => {
        state.loading.single_courses_save_later = false;
        state.single_courses_save_later = action.payload;
        state.err.single_courses_save_later_err = null;
      })
      .addCase(getCoursesSaveLaterById.rejected, (state, action) => {
        state.loading.single_courses_save_later = false;
        state.err.single_courses_save_later_err = action?.payload;
      })
      //   create
      .addCase(createCoursesSaveLater.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCoursesSaveLater.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createCoursesSaveLater.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateCoursesSaveLater.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCoursesSaveLater.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCoursesSaveLater.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCoursesSaveLater.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCoursesSaveLater.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCoursesSaveLater.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { storeSingleCoursesSaveLater, clearCoursesSaveLater } =
  coursesSaveLaterSlice.actions;
export default coursesSaveLaterSlice.reducer;
