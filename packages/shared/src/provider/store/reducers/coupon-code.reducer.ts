import { createSlice } from "@reduxjs/toolkit";
import { CouponCodeState } from "../../../utils/types/coupon-code";
import {
  applyCouponCode,
  createCouponCode,
  deleteCouponCode,
  getCouponCode,
  getCouponCodeById,
  updateCouponCode,
} from "../services/coupon-code.service";

const initialState: CouponCodeState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    coupon_code: false,
    single_coupon_code: false,
    apply_coupon_code: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    coupon_code_err: null,
    single_coupon_code_err: null,
    apply_coupon_code_err: null,
  },
  create: null,
  delete: null,
  update: null,
  coupon_code: [],
  single_coupon_code: null,
  apply_coupon_code: null,
};

const couponCodeSlice = createSlice({
  name: "couponCode",
  initialState,
  reducers: {
    storeSingleCouponCode: (state, action) => {
      state.single_coupon_code = action.payload;
    },
    clearCouponCode: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
      state.apply_coupon_code = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCouponCode.pending, (state) => {
        state.loading.coupon_code = true;
      })
      .addCase(getCouponCode.fulfilled, (state, action) => {
        state.loading.coupon_code = false;
        state.coupon_code = action.payload;
        state.err.coupon_code_err = null;
      })
      .addCase(getCouponCode.rejected, (state, action) => {
        state.loading.coupon_code = false;
        state.err.coupon_code_err = action?.payload;
      })

      // single user course history
      .addCase(getCouponCodeById.pending, (state) => {
        state.loading.single_coupon_code = true;
      })
      .addCase(getCouponCodeById.fulfilled, (state, action) => {
        state.loading.single_coupon_code = false;
        state.single_coupon_code = action.payload;
        state.err.single_coupon_code_err = null;
      })
      .addCase(getCouponCodeById.rejected, (state, action) => {
        state.loading.single_coupon_code = false;
        state.err.single_coupon_code_err = action?.payload;
      })
      //   create
      .addCase(createCouponCode.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCouponCode.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createCouponCode.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateCouponCode.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCouponCode.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCouponCode.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCouponCode.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCouponCode.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCouponCode.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      })
      //   apply coupon code
      .addCase(applyCouponCode.pending, (state) => {
        state.loading.apply_coupon_code = true;
      })
      .addCase(applyCouponCode.fulfilled, (state, action) => {
        state.loading.apply_coupon_code = false;
        state.apply_coupon_code = action.payload;
        state.err.apply_coupon_code_err = null;
      })
      .addCase(applyCouponCode.rejected, (state, action) => {
        state.loading.apply_coupon_code = false;
        state.err.apply_coupon_code_err = action?.payload;
      });
  },
});
export const { storeSingleCouponCode, clearCouponCode } =
  couponCodeSlice.actions;
export default couponCodeSlice.reducer;
