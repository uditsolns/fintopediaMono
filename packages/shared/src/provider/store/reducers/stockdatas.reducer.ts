import { StockDataState } from "../../../utils/types/stockDatas";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteStockData,
  getStockData,
  updateStockData,
  createStockData,
} from "../services/stockdatas.service";

const initialState: StockDataState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    stockData: false,
    singleStockData:false
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    stockDataErr: null,
    singleStockDataErr:null
  },
  create: null,
  delete: null,
  update: null,
  stockData: [],
  singleStockData:null
};

const stockDataSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {
    storeSingleStockData:(state,action)=>{
      state.singleStockData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockData.pending, (state) => {
        state.loading.stockData = true;
      })
      .addCase(getStockData.fulfilled, (state, action) => {
        state.loading.stockData = false;
        state.stockData = action.payload;
        state.err.stockDataErr = null;
      })
      .addCase(getStockData.rejected, (state, action) => {
        state.loading.stockData = false;
        state.err.stockDataErr = action?.payload;
      })
      //   create
      .addCase(createStockData.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createStockData.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createStockData.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateStockData.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateStockData.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateStockData.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteStockData.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteStockData.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteStockData.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default stockDataSlice.reducer;
