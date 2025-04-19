import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type SendOtpField = Pick<ModelParams, "phone">;

export const sendOtpField: SendOtpField = {
  phone: {
    name: "phone",
    label: "Phone Number",
    placeHolder: "Enter your phone number",
    requiredErr: "Phone number is required",
  }, 
};

export type SendOtpValues = {
  [key in keyof typeof sendOtpField as string]: string;
};

export const SENDOTP_VALUES = {
  [sendOtpField.phone.name]: "",
};

export const sendOtpValidation = Yup.object().shape({
  [sendOtpField.phone.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required(`${sendOtpField.phone.requiredErr}`),
});
