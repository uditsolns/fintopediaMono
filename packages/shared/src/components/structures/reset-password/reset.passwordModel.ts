import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type ResetField = Pick<
  ModelParams,
  "phone" | "otp" | "new_password" | "new_password_confirmation"
>;

export const resetField: ResetField = {
  phone: {
    name: "phone",
    label: "Phone",
    placeHolder: "Enter your phone",
    requiredErr: "Phone is required",
  },
  otp: {
    name: "otp",
    label: "Enter OTP",
    placeHolder: "Enter your otp",
    requiredErr: "OTP is required",
  },
  new_password: {
    name: "new_password",
    label: "New Password",
    placeHolder: "Enter your new password",
    requiredErr: "New Password is required",
  },
  new_password_confirmation: {
    name: "new_password_confirmation",
    label: "Confirm New Password",
    placeHolder: "Enter your confirm password",
    requiredErr: "Confirm Password is required",
  },
};

export type ResetValues = {
  [key in keyof typeof resetField as string]: string;
};

export const RESET_VALUES = {
  [resetField.phone.name]: "",
  [resetField.otp.name]: "",
  [resetField.new_password.name]: "",
  [resetField.new_password_confirmation.name]: "",
};

export const resetValidation = Yup.object().shape({
  [resetField.new_password.name]: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required(`${resetField.new_password.requiredErr}`),
  [resetField.new_password_confirmation.name]: Yup.string()
    .required(`${resetField.new_password_confirmation.requiredErr}`)
    .oneOf(
      [Yup.ref(`${resetField.new_password.name}`), ""],
      "Passwords must match"
    ),
});
