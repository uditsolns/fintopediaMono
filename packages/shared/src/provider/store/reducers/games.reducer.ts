import { GamesState } from "../../../utils/types/games";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteGames,
  getGames,
  updateGames,
  createGames,
} from "../services/games.service";

const initialState: GamesState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    games: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    gamesErr: null,
  },
  create: null,
  delete: null,
  update: null,
  games: [],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.loading.games = true;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.loading.games = false;
        state.games = action.payload;
        state.err.gamesErr = null;
      })
      .addCase(getGames.rejected, (state, action) => {
        state.loading.games = false;
        state.err.gamesErr = action?.payload;
      })
      //   create
      .addCase(createGames.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createGames.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createGames.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateGames.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateGames.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateGames.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteGames.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteGames.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteGames.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default gamesSlice.reducer;
