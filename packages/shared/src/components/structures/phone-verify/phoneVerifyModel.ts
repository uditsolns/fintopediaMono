import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type PhoneVerifyField = Pick<ModelParams, "phone">;

export const phoneVerifyField: PhoneVerifyField = {
  phone: {
    name: "phone",
    label: "Phone Number",
    placeHolder: "Enter your phone number",
    requiredErr: "Phone number is required",
  }, 
};

export type PhoneVerifyValues = {
  [key in keyof typeof phoneVerifyField as string]: string;
};

export const PHONEVERIFY_VALUES = {
  [phoneVerifyField.phone.name]: "",
};

export const phoneVerifyValidation = Yup.object().shape({
  [phoneVerifyField.phone.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required(`${phoneVerifyField.phone.requiredErr}`),
});
