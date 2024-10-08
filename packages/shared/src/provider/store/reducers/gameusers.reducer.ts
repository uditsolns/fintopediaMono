import { GameUsersState } from "../../../utils/types/gameUsers";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteGameUsers,
  getGameUsers,
  updateGameUsers,
  createGameUsers,
  getGameUserByLoginIDGameID,
} from "../services/gameusers.service";

const initialState: GameUsersState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    gameUsers: false,
    gameUserByLoginIDGameID: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    gameUsersErr: null,
    gameUserByLoginIDGameIDErr: null,
  },
  create: null,
  delete: null,
  update: null,
  gameUsers: [],
  gameUserByLoginIDGameID: null,
  user_game_amount: 0,
};

const gameUsersSlice = createSlice({
  name: "gameUsers",
  initialState,
  reducers: {
    storeUserGameAmount:(state,action)=>{
      state.user_game_amount = action.payload
    },
    clearGameUsers: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // get game user by login id and game id
      .addCase(getGameUserByLoginIDGameID.pending, (state) => {
        state.loading.gameUserByLoginIDGameID = true;
      })
      .addCase(getGameUserByLoginIDGameID.fulfilled, (state, action) => {
        state.loading.gameUserByLoginIDGameID = false;
        state.gameUserByLoginIDGameID = action.payload;
        state.err.gameUserByLoginIDGameIDErr = null;
      })
      .addCase(getGameUserByLoginIDGameID.rejected, (state, action) => {
        state.loading.gameUserByLoginIDGameID = false;
        state.err.gameUserByLoginIDGameIDErr = action?.payload;
      })
      .addCase(getGameUsers.pending, (state) => {
        state.loading.gameUsers = true;
      })
      .addCase(getGameUsers.fulfilled, (state, action) => {
        state.loading.gameUsers = false;
        state.gameUsers = action.payload;
        state.err.gameUsersErr = null;
      })
      .addCase(getGameUsers.rejected, (state, action) => {
        state.loading.gameUsers = false;
        state.err.gameUsersErr = action?.payload;
      })
      //   create
      .addCase(createGameUsers.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createGameUsers.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createGameUsers.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateGameUsers.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateGameUsers.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateGameUsers.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteGameUsers.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteGameUsers.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteGameUsers.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export const {storeUserGameAmount,clearGameUsers} = gameUsersSlice.actions;
export default gameUsersSlice.reducer;
