import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type ForgotField = Pick<ModelParams, "email">;

export const forgotField: ForgotField = {
  email: {
    name: "email",
    label: "Email your email",
    placeHolder: "Enter your email",
    requiredErr: "Email is required",
  }
};

export type ForgotValues = {
  [key in keyof typeof forgotField as string]: string;
};

export const FORGOT_VALUES = {
  [forgotField.email.name]: "",
};

export const forgotValidation = Yup.object().shape({
  [forgotField.email.name]: Yup.string()
  .email("Invalid email")
  .required(`${forgotField.email.requiredErr}`),
});
