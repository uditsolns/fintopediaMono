import { CourseCartState } from "../../../utils/types/CourseCart";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCourseCart,
  getCourseCart,
  updateCourseCart,
  createCourseCart,
} from "../services/CourseCart.service";

const initialState: CourseCartState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    courseCart: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    courseCartErr: null,
  },
  create: null,
  delete: null,
  update: null,
  courseCart: [],
};

const courseCartSlice = createSlice({
  name: "courseCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseCart.pending, (state) => {
        state.loading.courseCart = true;
      })
      .addCase(getCourseCart.fulfilled, (state, action) => {
        state.loading.courseCart = false;
        state.courseCart = action.payload;
        state.err.courseCartErr = null;
      })
      .addCase(getCourseCart.rejected, (state, action) => {
        state.loading.courseCart = false;
        state.err.courseCartErr = action?.payload;
      })
      //   create
      .addCase(createCourseCart.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCourseCart.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createCourseCart.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateCourseCart.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCourseCart.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCourseCart.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCourseCart.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCourseCart.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCourseCart.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default courseCartSlice.reducer;
