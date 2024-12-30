import { createSlice } from "@reduxjs/toolkit";
import { OngoingCourseStatusState } from "../../../utils/types/ongoing-courses-status";
import {
  createOngoingCourseStatus,
  getOngoingCourseStatus,
  getOngoingCourseStatusById,
  updateOngoingCourseStatus,
} from "../services/ongoing-courses-status.service";

const initialState: OngoingCourseStatusState = {
  loading: {
    create: false,
    update: false,
    ongoing_courses_status: false,
    single_ongoing_courses_status: false,
  },
  err: {
    create_err: null,
    update_err: null,
    single_ongoing_courses_status_err: null,
    ongoing_courses_status_err: null,
  },
  create: null,
  update: null,
  ongoing_courses_status: [],
  single_ongoing_courses_status: null,
};

const ongoingCourseStatusSlice = createSlice({
  name: "ongoingCourseStatus",
  initialState,
  reducers: {
    storeSingleOngoingCourse: (state, action) => {
      state.single_ongoing_courses_status = action.payload;
    },
    resetOngoingCourse: (state) => {
      state.create = null;
      state.update = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOngoingCourseStatus.pending, (state) => {
        state.loading.ongoing_courses_status = true;
      })
      .addCase(getOngoingCourseStatus.fulfilled, (state, action) => {
        state.loading.ongoing_courses_status = false;
        state.ongoing_courses_status = action.payload;
        state.err.ongoing_courses_status_err = null;
      })
      .addCase(getOngoingCourseStatus.rejected, (state, action) => {
        state.loading.ongoing_courses_status = false;
        state.err.ongoing_courses_status_err = action?.payload;
      })

      .addCase(getOngoingCourseStatusById.pending, (state) => {
        state.loading.single_ongoing_courses_status = true;
      })
      .addCase(getOngoingCourseStatusById.fulfilled, (state, action) => {
        state.loading.single_ongoing_courses_status = false;
        state.single_ongoing_courses_status = action.payload;
        state.err.single_ongoing_courses_status_err = null;
      })
      .addCase(getOngoingCourseStatusById.rejected, (state, action) => {
        state.loading.single_ongoing_courses_status = false;
        state.err.single_ongoing_courses_status_err = action?.payload;
      })
      //   create
      .addCase(createOngoingCourseStatus.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createOngoingCourseStatus.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.create_err = null;
      })
      .addCase(createOngoingCourseStatus.rejected, (state, action) => {
        state.loading.create = false;
        state.err.create_err = action?.payload;
      })
      //  update
      .addCase(updateOngoingCourseStatus.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateOngoingCourseStatus.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.update_err = null;
      })
      .addCase(updateOngoingCourseStatus.rejected, (state, action) => {
        state.loading.update = false;
        state.err.update_err = action?.payload;
      });
  },
});

export const { storeSingleOngoingCourse, resetOngoingCourse } =
  ongoingCourseStatusSlice.actions;
export default ongoingCourseStatusSlice.reducer;
