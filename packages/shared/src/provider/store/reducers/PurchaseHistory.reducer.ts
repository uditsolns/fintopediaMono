import { PurchaseHistoryState } from "../../../utils/types/PurchaseHistory";
import { createSlice } from "@reduxjs/toolkit";
import {
  deletePurchaseHistory,
  getPurchaseHistory,
  updatePurchaseHistory,
  createPurchaseHistory,
  getPurchaseHistoryById,
} from "../services/PurchaseHistory.service";

const initialState: PurchaseHistoryState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    purchaseHistory: false,
    singlePurchaseHistory: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    purchaseHistoryErr: null,
    singlePurchaseHistoryErr: null,
  },
  create: null,
  delete: null,
  update: null,
  purchaseHistory: [],
  singlePurchaseHistory: null,
};

const purchaseHistorySlice = createSlice({
  name: "purchaseHistory",
  initialState,
  reducers: {
    storeSinglePurchaseHistory: (state, action) => {
      state.singlePurchaseHistory = action.payload;
    },
  },
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

      //single purchase history
      .addCase(getPurchaseHistoryById.pending, (state) => {
        state.loading.singlePurchaseHistory = true;
      })
      .addCase(getPurchaseHistoryById.fulfilled, (state, action) => {
        state.loading.singlePurchaseHistory = false;
        state.singlePurchaseHistory = action.payload;
        state.err.singlePurchaseHistoryErr = null;
      })
      .addCase(getPurchaseHistoryById.rejected, (state, action) => {
        state.loading.singlePurchaseHistory = false;
        state.err.singlePurchaseHistoryErr = action?.payload;
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

export const { storeSinglePurchaseHistory } = purchaseHistorySlice.actions;
export default purchaseHistorySlice.reducer;
