import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type AuthField = Pick<ModelParams, "phone" | "password">;

export const authField: AuthField = {
  phone: {
    name: "phone",
    label: "Phone number",
    placeHolder: "Enter your phone number",
    requiredErr: "Phone is required",
  },
  password: {
    name: "password",
    label: "Password",
    placeHolder: "Enter your password",
    requiredErr: "Password is required",
  },
};

export type LoginValues = {
  [key in keyof typeof authField as string]: string;
};

export const LOGIN_VALUES = {
  [authField.phone.name]: "",
  [authField.password.name]: "",
};

export const loginValidation = Yup.object().shape({
  [authField.phone.name]: Yup.number()
    .min(10, "Cannot be less than 10 digits")
    .max(10, "Cannot be more than 10 digits")
    .required(`${authField.phone.requiredErr}`),
  [authField.password.name]: Yup.string().required(
    `${authField.password.requiredErr}`
  ),
});
