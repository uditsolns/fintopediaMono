import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type OtpLoginField = Pick<ModelParams, "phone" | "device_id" | "otp">;

export const otpLoginField: OtpLoginField = {
  phone: {
    name: "phone",
    label: "Phone Number",
    placeHolder: "Enter your phone number",
    requiredErr: "Phone number is required",
  },
  device_id: {
    name: "device_id",
    label: "otp",
    placeHolder: "otp",
    requiredErr: "otp",
  },
  otp: {
    name: "otp",
    label: "otp",
    placeHolder: "otp",
    requiredErr: "otp",
  },
};

export type OtpLoginValues = {
  [key in keyof typeof otpLoginField as string]: string;
};

export const OTPLOGIN_VALUES = {
  [otpLoginField.phone.name]: "",
  [otpLoginField.device_id.name]: "",
};

export const otpLoginValidation = Yup.object().shape({
  [otpLoginField.phone.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required(`${otpLoginField.phone.requiredErr}`),
});
