import { UserState } from "../../../utils/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUser, updateUser } from "../services/user.service";

const initialState: UserState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    user: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    userErr: null,
  },
  create: null,
  delete: null,
  update: null,
  user: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading.user = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading.user = false;
        state.user = action.payload;
        state.err.userErr = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading.user = false;
        state.err.userErr = action?.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default userSlice.reducer;
