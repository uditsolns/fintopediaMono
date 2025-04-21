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
  sendOtpLogin,
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
    send_otp: false,
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
    send_otp_err: null,
  },
  auth: null,
  signup: null,
  forgot: null,
  confirm: null,
  current_user: null,
  verifyOtp: null,
  verify_mobile: null,
  otp_login: null,
  send_otp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      console.log("logout will be called in reducer");
      return initialState;
    },
    storeCurrentUser: (state, action) => {
      state.current_user = action.payload;
    },
    clearConfirmPassword: (state) => {
      state.confirm = null;
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
        state.current_user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading.login = false;
        state.err.loginErr = action?.payload;
      })
      // otp login
      .addCase(phoneNumberOtpLogin.pending, (state) => {
        state.loading.login = true;
        state.err.loginErr = null;
      })
      .addCase(phoneNumberOtpLogin.fulfilled, (state, action) => {
        state.loading.login = false;
        state.auth = action.payload;
        state.err.loginErr = null;
        state.current_user = action.payload.user;
      })
      .addCase(phoneNumberOtpLogin.rejected, (state, action) => {
        state.loading.login = false;
        state.err.loginErr = action?.payload;
      })
      // google sign in
      .addCase(googleSignIn.pending, (state) => {
        state.loading.google_login = true;
        state.err.google_login_err = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.loading.google_login = false;
        state.auth = action.payload;
        state.err.google_login_err = null;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading.google_login = false;
        state.err.google_login_err = action?.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading.signup = true;
        state.err.signupErr = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading.signup = false;
        state.signup = action.payload;
        state.err.signupErr = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading.signup = false;
        state.err.signupErr = action?.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading.forgot = true;
        state.err.forgotErr = null;
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
        state.err.confirmErr = null;
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
        state.err.verifyOtpErr = null;
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
        state.err.verify_mobile_err = null;
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

      // send Otp
      .addCase(sendOtpLogin.pending, (state) => {
        state.loading.send_otp = true;
        state.err.send_otp_err = null;
      })
      .addCase(sendOtpLogin.fulfilled, (state, action) => {
        state.loading.send_otp = false;
        state.send_otp = action.payload;
        state.err.send_otp_err = null;
      })
      .addCase(sendOtpLogin.rejected, (state, action) => {
        state.loading.send_otp = false;
        state.err.send_otp_err = action?.payload;
      });
  },
});

export const { logout, storeCurrentUser, clearConfirmPassword } =
  authSlice.actions;
export default authSlice.reducer;
