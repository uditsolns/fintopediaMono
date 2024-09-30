import { createSlice } from "@reduxjs/toolkit";
import {
  confirmPassword,
  forgotPassword,
  signIn,
  signUp,
} from "../services/auth.service";
import { AuthState } from "../../../utils/types/auth";

const initialState: AuthState = {
  loading: {
    login: false,
    signup: false,
    signout: false,
    forgot: false,
    confirm: false,
  },
  err: {
    loginErr: null,
    signupErr: null,
    signoutErr: null,
    forgotErr: null,
    confirmErr: null,
  },
  auth: null,
  signup: null,
  forgot: null,
  confirm: null,
  current_user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    storeCurrentUser: (state, action) => {
      state.current_user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading.login = false;
        state.auth = action.payload;
        state.err.loginErr = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading.login = false;
        state.err.loginErr = action?.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading.signup = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading.signup = false;
        state.signup = action.payload;
        state.err.loginErr = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading.signup = false;
        state.err.signupErr = action?.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading.forgot = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading.forgot = false;
        state.forgot = action.payload;
        state.err.forgotErr = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading.forgot = false;
        state.err.forgotErr = action?.payload;
      })
      .addCase(confirmPassword.pending, (state) => {
        state.loading.confirm = true;
      })
      .addCase(confirmPassword.fulfilled, (state, action) => {
        state.loading.confirm = false;
        state.confirm = action.payload;
        state.err.confirmErr = null;
      })
      .addCase(confirmPassword.rejected, (state, action) => {
        state.loading.confirm = false;
        state.err.confirmErr = action?.payload;
      });
  },
});

export const { logout, storeCurrentUser } = authSlice.actions;
export default authSlice.reducer;
