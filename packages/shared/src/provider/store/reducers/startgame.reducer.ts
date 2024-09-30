import { StartGameState } from "../../../utils/types/startgame";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteStartGame,
  getStartGame,
  updateStartGame,
  createStartGame,
} from "../services/startgame.service";

const initialState: StartGameState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    startGame: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    startGameErr: null,
  },
  create: null,
  delete: null,
  update: null,
  startGame: [],
};

const startGameSlice = createSlice({
  name: "startGame",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStartGame.pending, (state) => {
        state.loading.startGame = true;
      })
      .addCase(getStartGame.fulfilled, (state, action) => {
        state.loading.startGame = false;
        state.startGame = action.payload;
        state.err.startGameErr = null;
      })
      .addCase(getStartGame.rejected, (state, action) => {
        state.loading.startGame = false;
        state.err.startGameErr = action?.payload;
      })
      //   create
      .addCase(createStartGame.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createStartGame.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createStartGame.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateStartGame.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateStartGame.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateStartGame.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteStartGame.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteStartGame.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteStartGame.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default startGameSlice.reducer;
