import { createSlice } from "@reduxjs/toolkit";
import {
  confirmPassword,
  forgotPassword,
  googleSignIn,
  phoneNumberOtpLogin,
  signIn,
  signUp,
  VerifyOtp,
  verifyPhoneNumber,
} from "../services/auth.service";
import { AuthState } from "../../../utils/types/auth";

const initialState: AuthState = {
  loading: {
    login: false,
    signup: false,
    signout: false,
    forgot: false,
    confirm: false,
    google_login: false,
    verifyOtp: false,
    verify_mobile: false,
    otp_login: false,
  },
  err: {
    loginErr: null,
    signupErr: null,
    signoutErr: null,
    forgotErr: null,
    confirmErr: null,
    google_login_err: null,
    verifyOtpErr: null,
    verify_mobile_err: null,
    otp_login_err: null,
  },
  auth: null,
  signup: null,
  forgot: null,
  confirm: null,
  current_user: null,
  verifyOtp: null,
  verify_mobile: null,
  otp_login: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      console.log("logout will be called in reducer")
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
        state.err.loginErr = null;
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
      .addCase(googleSignIn.pending, (state) => {
        state.loading.google_login = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.loading.google_login = false;
        state.auth = action.payload;
        state.err.google_login_err = null;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading.forgot = false;
        state.err.google_login_err = action?.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading.signup = true;
        state.err.loginErr = null;
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
      })
      .addCase(VerifyOtp.pending, (state) => {
        state.loading.verifyOtp = true;
      })
      .addCase(VerifyOtp.fulfilled, (state, action) => {
        state.loading.verifyOtp = false;
        state.verifyOtp = action.payload;
        state.err.verifyOtpErr = null;
      })
      .addCase(VerifyOtp.rejected, (state, action) => {
        state.loading.verifyOtp = false;
        state.err.verifyOtpErr = action?.payload;
      })
      .addCase(verifyPhoneNumber.pending, (state) => {
        state.loading.verify_mobile = true;
      })
      .addCase(verifyPhoneNumber.fulfilled, (state, action) => {
        state.loading.verify_mobile = false;
        state.verify_mobile = action.payload;
        state.err.verify_mobile_err = null;
      })
      .addCase(verifyPhoneNumber.rejected, (state, action) => {
        state.loading.verify_mobile = false;
        state.err.verify_mobile_err = action?.payload;
      })
      .addCase(phoneNumberOtpLogin.pending, (state) => {
        state.loading.otp_login = true;
      })
      .addCase(phoneNumberOtpLogin.fulfilled, (state, action) => {
        state.loading.otp_login = false;
        state.otp_login = action.payload;
        state.err.otp_login_err = null;
      })
      .addCase(phoneNumberOtpLogin.rejected, (state, action) => {
        state.loading.otp_login = false;
        state.err.otp_login_err = action?.payload;
      });
  },
});

export const { logout, storeCurrentUser } = authSlice.actions;
export default authSlice.reducer;
