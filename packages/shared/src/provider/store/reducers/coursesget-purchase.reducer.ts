import { createSlice } from "@reduxjs/toolkit";
import { CoursesgetPurchaseState } from "../../../utils/types/coursesget-purchase";
import { getCoursesgetPurchase } from "../services/coursesget-purchase.service";

const initialState: CoursesgetPurchaseState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    courseget_purchase: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    courseget_purchase_err: null,
  },
  create: null,
  delete: null,
  update: null,
  courseget_purchase: [],
};

const coursegetPurchaseSlice = createSlice({
  name: "coursegetPurchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesgetPurchase.pending, (state) => {
        state.loading.courseget_purchase = true;
      })
      .addCase(getCoursesgetPurchase.fulfilled, (state, action) => {
        state.loading.courseget_purchase = false;
        state.courseget_purchase = action.payload;
        state.err.courseget_purchase_err = null;
      })
      .addCase(getCoursesgetPurchase.rejected, (state, action) => {
        state.loading.courseget_purchase = false;
        state.err.courseget_purchase_err = action?.payload;
      });
  },
});
export default coursegetPurchaseSlice.reducer;
