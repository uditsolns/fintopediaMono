import { createSlice } from "@reduxjs/toolkit";
import {} from "../services/transactions.service";
import { UserTransactionsState } from "../../../utils/types/user-transactions";
import {
  createUserTransactions,
  deleteUserTransactions,
  getUserTransactions,
  updateUserTransactions,
} from "../services/usertransactions.service";

const initialState: UserTransactionsState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    user_transactions: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    user_transactionsErr: null,
  },
  create: null,
  delete: null,
  update: null,
  user_transactions: [],
  single_user_transactions: null,
};

const userTransactionsSlice = createSlice({
  name: "userTansactions",
  initialState,
  reducers: {
    storeSingleUserTransaction:(state,action)=>{
      state.single_user_transactions = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTransactions.pending, (state) => {
        state.loading.user_transactions = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.loading.user_transactions = false;
        state.user_transactions = action.payload;
        state.err.user_transactionsErr = null;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.loading.user_transactions = false;
        state.err.user_transactionsErr = action?.payload;
      })
      //   create
      .addCase(createUserTransactions.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createUserTransactions.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createUserTransactions.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateUserTransactions.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateUserTransactions.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateUserTransactions.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteUserTransactions.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteUserTransactions.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteUserTransactions.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export const {storeSingleUserTransaction} = userTransactionsSlice.actions;
export default userTransactionsSlice.reducer;
