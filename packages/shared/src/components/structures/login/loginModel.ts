import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type AuthField = Pick<ModelParams, "phone" | "password" | "device_id" | "device_id_web">;

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
  device_id: {
    name: "device_id",
    label: "device_id",
    placeHolder: "",
    requiredErr: "",
  },
  device_id_web: {
    name: "device_id_web",
    label: "device_id_web",
    placeHolder: "",
    requiredErr: "",
  },
};

export type LoginValues = {
  [key in keyof typeof authField as string]: string;
};

export const LOGIN_VALUES = {
  [authField.phone.name]: "",
  [authField.password.name]: "",
  [authField.device_id.name]: "",
  [authField.device_id_web.name]: "",
};

export const loginValidation = Yup.object().shape({
  [authField.phone.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required(`${authField.phone.requiredErr}`),
  [authField.password.name]: Yup.string().required(
    `${authField.password.requiredErr}`
  ),
});
