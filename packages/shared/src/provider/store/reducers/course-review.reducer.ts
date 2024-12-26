import { createSlice } from "@reduxjs/toolkit";
import { CourseReviewState } from "../../../utils/types/course-review";
import { createCourseReview, deleteCourseReview, getCourseReviews, getCourseReviewsById, updateCourseReview } from "../services/course-review.service";
const initialState: CourseReviewState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    course_review: false,
    single_course_review: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    course_review_err: null,
    single_course_review_err: null,
  },
  create: null,
  delete: null,
  update: null,
  course_review: [],
  single_course_review: null,
};

const courseReviewSlice = createSlice({
  name: "courseReview",
  initialState,
  reducers: {
    storeSingleCourseReview: (state, action) => {
      state.single_course_review = action.payload;
    },
    clearCourseReview: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseReviews.pending, (state) => {
        state.loading.course_review = true;
      })
      .addCase(getCourseReviews.fulfilled, (state, action) => {
        state.loading.course_review = false;
        state.course_review = action.payload;
        state.err.course_review_err = null;
      })
      .addCase(getCourseReviews.rejected, (state, action) => {
        state.loading.course_review = false;
        state.err.course_review_err = action?.payload;
      })

      // single user course history
      .addCase(getCourseReviewsById.pending, (state) => {
        state.loading.single_course_review = true;
      })
      .addCase(getCourseReviewsById.fulfilled, (state, action) => {
        state.loading.single_course_review = false;
        state.single_course_review = action.payload;
        state.err.single_course_review_err = null;
      })
      .addCase(getCourseReviewsById.rejected, (state, action) => {
        state.loading.single_course_review = false;
        state.err.single_course_review_err = action?.payload;
      })
      //   create
      .addCase(createCourseReview.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCourseReview.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createCourseReview.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateCourseReview.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCourseReview.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCourseReview.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCourseReview.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCourseReview.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCourseReview.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { storeSingleCourseReview, clearCourseReview } =
  courseReviewSlice.actions;
export default courseReviewSlice.reducer;
