import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type ResetField = Pick<
  ModelParams,
  "token" | "password" | "password_confirmation"
>;

export const resetField: ResetField = {
  token: {
    name: "token",
    label: "Token",
    placeHolder: "Enter your token",
    requiredErr: "Token is required",
  },
  password: { 
    name: "password",
    label: "New Password",
    placeHolder: "Enter your new password",
    requiredErr: "New Password is required",
  },
  password_confirmation: {
    name: "password_confirmation",
    label: "Confirm Password",
    placeHolder: "Enter your confirm password",
    requiredErr: "Confirm Password is required",
  },
};

export type ResetValues = {
  [key in keyof typeof resetField as string]: string;
};

export const RESET_VALUES = {
  [resetField.token.name]: "",
  [resetField.password.name]: "",
  [resetField.password_confirmation.name]: "",
};

export const resetValidation = Yup.object().shape({
  [resetField.token.name]: Yup.string().required(
    `${resetField.token.requiredErr}`
  ),
  [resetField.password.name]: Yup.string().required(
    `${resetField.password.requiredErr}`
  ),
  [resetField.password_confirmation.name]: Yup.string()
    .required(`${resetField.password_confirmation.requiredErr}`)
    .oneOf(
      [Yup.ref(`${resetField.password.name}`), ""],
      "Passwords must match"
    ),
});
