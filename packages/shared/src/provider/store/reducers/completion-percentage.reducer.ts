import { createSlice } from "@reduxjs/toolkit";
import { CompletionPercentageState } from "../../../utils/types/completion-percentage";
import {
  createCompletionPercentage,
  deleteCompletionPercentage,
  getCompletionPercentage,
  getCompletionPercentageById,
  updateCompletionPercentage,
} from "../services/completion-percentage.service";
const initialState: CompletionPercentageState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    completion_percentage: false,
    single_completion_percentage: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    completion_percentage_err: null,
    single_completion_percentage_err: null,
  },
  create: null,
  delete: null,
  update: null,
  completion_percentage: [],
  single_completion_percentage: null,
};

const completionPercentageSlice = createSlice({
  name: "completion_percentage",
  initialState,
  reducers: {
    storeCompletionPercentage: (state, action) => {
      state.single_completion_percentage = action.payload;
    },
    clearCompletionPercentage: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompletionPercentage.pending, (state) => {
        state.loading.completion_percentage = true;
      })
      .addCase(getCompletionPercentage.fulfilled, (state, action) => {
        state.loading.completion_percentage = false;
        state.completion_percentage = action.payload;
        state.err.completion_percentage_err = null;
      })
      .addCase(getCompletionPercentage.rejected, (state, action) => {
        state.loading.completion_percentage = false;
        state.err.completion_percentage_err = action?.payload;
      })

      // single user course history
      .addCase(getCompletionPercentageById.pending, (state) => {
        state.loading.single_completion_percentage = true;
      })
      .addCase(getCompletionPercentageById.fulfilled, (state, action) => {
        state.loading.single_completion_percentage = false;
        state.single_completion_percentage = action.payload;
        state.err.single_completion_percentage_err = null;
      })
      .addCase(getCompletionPercentageById.rejected, (state, action) => {
        state.loading.single_completion_percentage = false;
        state.err.single_completion_percentage_err = action?.payload;
      })
      //   create
      .addCase(createCompletionPercentage.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCompletionPercentage.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createCompletionPercentage.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateCompletionPercentage.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCompletionPercentage.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCompletionPercentage.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCompletionPercentage.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCompletionPercentage.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCompletionPercentage.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { storeCompletionPercentage, clearCompletionPercentage } =
  completionPercentageSlice.actions;
export default completionPercentageSlice.reducer;
