import { NewsState } from "../../../utils/types/news";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteNews,
  getNews,
  updateNews,
  createNews,
} from "../services/news.service";

const initialState: NewsState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    news: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    newsErr: null,
  },
  create: null,
  delete: null,
  update: null,
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading.news = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading.news = false;
        state.news = action.payload;
        state.err.newsErr = null;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading.news = false;
        state.err.newsErr = action?.payload;
      })
      //   create
      .addCase(createNews.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateNews.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default newsSlice.reducer;
