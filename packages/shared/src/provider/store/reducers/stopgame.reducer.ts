import { StopGameState } from "../../../utils/types/stopgame";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteStopGame,
  getStopGame,
  updateStopGame,
  createStopGame,
} from "../services/stopgame.service";

const initialState: StopGameState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    stopGame: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    stopGameErr: null,
  },
  create: null,
  delete: null,
  update: null,
  stopGame: [],
};

const stopGameSlice = createSlice({
  name: "stopGame",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStopGame.pending, (state) => {
        state.loading.stopGame = true;
      })
      .addCase(getStopGame.fulfilled, (state, action) => {
        state.loading.stopGame = false;
        state.stopGame = action.payload;
        state.err.stopGameErr = null;
      })
      .addCase(getStopGame.rejected, (state, action) => {
        state.loading.stopGame = false;
        state.err.stopGameErr = action?.payload;
      })
      //   create
      .addCase(createStopGame.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createStopGame.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createStopGame.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateStopGame.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateStopGame.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateStopGame.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteStopGame.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteStopGame.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteStopGame.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default stopGameSlice.reducer;
