import { CoursesRatingReviewsState } from "../../../utils/types/CoursesRatingReviews";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCoursesRatingReviews,
  getCoursesRatingReviews,
  updateCoursesRatingReviews,
  createCoursesRatingReviews,
} from "../services/CoursesRatingReviews.service";

const initialState: CoursesRatingReviewsState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    coursesRatingReviews: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    coursesRatingReviewsErr: null,
  },
  create: null,
  delete: null,
  update: null,
  coursesRatingReviews: [],
};

const coursesRatingReviewsSlice = createSlice({
  name: "coursesRatingReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesRatingReviews.pending, (state) => {
        state.loading.coursesRatingReviews = true;
      })
      .addCase(getCoursesRatingReviews.fulfilled, (state, action) => {
        state.loading.coursesRatingReviews = false;
        state.coursesRatingReviews = action.payload;
        state.err.coursesRatingReviewsErr = null;
      })
      .addCase(getCoursesRatingReviews.rejected, (state, action) => {
        state.loading.coursesRatingReviews = false;
        state.err.coursesRatingReviewsErr = action?.payload;
      })
      //   create
      .addCase(createCoursesRatingReviews.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCoursesRatingReviews.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createCoursesRatingReviews.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateCoursesRatingReviews.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCoursesRatingReviews.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCoursesRatingReviews.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCoursesRatingReviews.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCoursesRatingReviews.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCoursesRatingReviews.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default coursesRatingReviewsSlice.reducer;
