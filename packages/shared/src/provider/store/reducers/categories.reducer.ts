import { CategoriesState } from "../../../utils/types/categories";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCategories,
  getCategories,
  updateCategories,
  createCategories,
} from "../services/categories.service";

const initialState: CategoriesState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    categories: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    categoriesErr: null,
  },
  create: null,
  delete: null,
  update: null,
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading.categories = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
        state.err.categoriesErr = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.err.categoriesErr = action?.payload;
      })
      //   create
      .addCase(createCategories.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createCategories.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateCategories.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCategories.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCategories.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCategories.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default categoriesSlice.reducer;
