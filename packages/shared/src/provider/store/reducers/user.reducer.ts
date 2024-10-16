import { UserState } from "../../../utils/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUser, getUserById, updateUser } from "../services/user.service";

const initialState: UserState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    user: false,
    single_user: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    userErr: null,
    single_user_err: null,
  },
  create: null,
  delete: null,
  update: null,
  user: [],
  single_user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
    storeSingleUser: (state, action) => {
      state.single_user = action.payload;
    },
  },
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
      .addCase(getUserById.pending, (state) => {
        state.loading.single_user = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading.single_user = false;
        state.single_user = action.payload;
        state.err.single_user_err = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading.single_user = false;
        state.err.single_user_err = action?.payload;
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

export const { clearUserData,storeSingleUser } = userSlice.actions;
export default userSlice.reducer;
