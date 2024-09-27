import { PurchaseHistoryState } from "../../../utils/types/PurchaseHistory";
import { createSlice } from "@reduxjs/toolkit";
import {
  deletePurchaseHistory,
  getPurchaseHistory,
  updatePurchaseHistory,
  createPurchaseHistory,
} from "../services/PurchaseHistory.service";

const initialState: PurchaseHistoryState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    purchaseHistory: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    purchaseHistoryErr: null,
  },
  create: null,
  delete: null,
  update: null,
  purchaseHistory: [],
};

const purchaseHistorySlice = createSlice({
  name: "purchaseHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseHistory.pending, (state) => {
        state.loading.purchaseHistory = true;
      })
      .addCase(getPurchaseHistory.fulfilled, (state, action) => {
        state.loading.purchaseHistory = false;
        state.purchaseHistory = action.payload;
        state.err.purchaseHistoryErr = null;
      })
      .addCase(getPurchaseHistory.rejected, (state, action) => {
        state.loading.purchaseHistory = false;
        state.err.purchaseHistoryErr = action?.payload;
      })
      //   create
      .addCase(createPurchaseHistory.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createPurchaseHistory.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createPurchaseHistory.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updatePurchaseHistory.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updatePurchaseHistory.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updatePurchaseHistory.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deletePurchaseHistory.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deletePurchaseHistory.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deletePurchaseHistory.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default purchaseHistorySlice.reducer;
