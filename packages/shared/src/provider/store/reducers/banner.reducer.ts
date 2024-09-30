import { BannerState } from "../../../utils/types/banner";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBanner,
  getBanner,
  updateBanner,
  createBanner,
} from "../services/banner.service";

const initialState: BannerState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    banner: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    bannerErr: null,
  },
  create: null,
  delete: null,
  update: null,
  banner: [],
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.loading.banner = true;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.loading.banner = false;
        state.banner = action.payload;
        state.err.bannerErr = null;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading.banner = false;
        state.err.bannerErr = action?.payload;
      })
      //   create
      .addCase(createBanner.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateBanner.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default bannerSlice.reducer;
