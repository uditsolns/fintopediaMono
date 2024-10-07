import { TransactionsState } from "../../../utils/types/transactions";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTransactions,
  getTransactions,
  updateTransactions,
  createTransactions,
} from "../services/transactions.service";

const initialState: TransactionsState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    transactions: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    transactionsErr: null,
  },
  create: null,
  delete: null,
  update: null,
  transactions: [],
  single_transactions: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    storeSingleTransaction:(state,action)=>{
      state.single_transactions = action.payload
    },
    resetTransaction: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading.transactions = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading.transactions = false;
        state.transactions = action.payload;
        state.err.transactionsErr = null;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading.transactions = false;
        state.err.transactionsErr = action?.payload;
      })
      //   create
      .addCase(createTransactions.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateTransactions.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateTransactions.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateTransactions.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteTransactions.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export const {storeSingleTransaction,resetTransaction} = transactionsSlice.actions;
export default transactionsSlice.reducer;
