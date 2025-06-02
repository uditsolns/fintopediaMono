import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type ForgotField = Pick<ModelParams, "phone">;

export const forgotField: ForgotField = {
  phone: {
    name: "phone",
    label: "Enter your phone number",
    placeHolder: "Enter your phone number",
    requiredErr: "Phone number is required",
  },
};

export type ForgotValues = {
  [key in keyof typeof forgotField as string]: string;
};

export const FORGOT_VALUES = {
  [forgotField.phone.name]: "",
};

export const forgotValidation = Yup.object().shape({
  [forgotField.phone.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required(`${forgotField.phone.requiredErr}`),
});
