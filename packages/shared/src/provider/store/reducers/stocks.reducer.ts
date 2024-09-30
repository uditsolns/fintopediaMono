import { StocksState } from "../../../utils/types/stocks";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteStocks,
  getStocks,
  updateStocks,
  createStocks,
} from "../services/stocks.service";

const initialState: StocksState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    stocks: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    stocksErr: null,
  },
  create: null,
  delete: null,
  update: null,
  stocks: [],
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStocks.pending, (state) => {
        state.loading.stocks = true;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.loading.stocks = false;
        state.stocks = action.payload;
        state.err.stocksErr = null;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.loading.stocks = false;
        state.err.stocksErr = action?.payload;
      })
      //   create
      .addCase(createStocks.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createStocks.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createStocks.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateStocks.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateStocks.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateStocks.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteStocks.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteStocks.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteStocks.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default stocksSlice.reducer;
