import { RoundLevelState } from "../../../utils/types/roundLevel";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteRoundLevel,
  getRoundLevel,
  updateRoundLevel,
  createRoundLevel,
  getRoundLevelById
} from "../services/roundlevelgames.service";

const initialState: RoundLevelState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    roundLevel: false,
    singleRoundLevel: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    roundLevelErr: null,
    singleRoundLevelErr: null,
  },
  create: null,
  delete: null,
  update: null,
  roundLevel: [],
  filterRoundLevelData: null,
  singleRoundLevel: null,
};

const roundLevelSlice = createSlice({
  name: "roundLevel",
  initialState,
  reducers: {
    storeFilterRoundLevelData: (state, action) => {
      state.filterRoundLevelData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoundLevelById.pending, (state) => {
        state.loading.singleRoundLevel = true;
      })
      .addCase(getRoundLevelById.fulfilled, (state, action) => {
        state.loading.singleRoundLevel = false;
        state.singleRoundLevel = action.payload;
        state.err.singleRoundLevelErr = null;
      })
      .addCase(getRoundLevelById.rejected, (state, action) => {
        state.loading.singleRoundLevel = false;
        state.err.singleRoundLevelErr = action?.payload;
      })
      // single
      .addCase(getRoundLevel.pending, (state) => {
        state.loading.roundLevel = true;
      })
      .addCase(getRoundLevel.fulfilled, (state, action) => {
        state.loading.roundLevel = false;
        state.roundLevel = action.payload;
        state.err.roundLevelErr = null;
      })
      .addCase(getRoundLevel.rejected, (state, action) => {
        state.loading.roundLevel = false;
        state.err.roundLevelErr = action?.payload;
      })
      //   create
      .addCase(createRoundLevel.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createRoundLevel.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createRoundLevel.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateRoundLevel.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateRoundLevel.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateRoundLevel.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteRoundLevel.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteRoundLevel.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteRoundLevel.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { storeFilterRoundLevelData } = roundLevelSlice.actions;
export default roundLevelSlice.reducer;
