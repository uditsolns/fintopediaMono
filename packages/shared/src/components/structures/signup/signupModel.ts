import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type SignupField = Pick<
  ModelParams,
  | "first_name"
  | "surname_name"
  | "phone"
  | "role"
  | "password"
  | "password_confirmation"
  | "email"
>;

export const signupField: SignupField = {
  first_name: {
    name: "first_name",
    label: "first_name",
    placeHolder: "first_name",
    requiredErr: "first_name is required",
  },
  surname_name: {
    name: "surname_name",
    label: "surname_name",
    placeHolder: "surname_name",
    requiredErr: "surname_name is required",
  },
  phone: {
    name: "phone",
    label: "phone",
    placeHolder: "phone",
    requiredErr: "phone is required",
  },
  password: {
    name: "password",
    label: "password",
    placeHolder: "password",
    requiredErr: "password is required",
  },
  role: {
    name: "role",
    label: "role",
    placeHolder: "role",
    requiredErr: "role is required",
  },
  password_confirmation: {
    name: "password_confirmation",
    label: "password_confirmation",
    placeHolder: "password_confirmation",
    requiredErr: "password_confirmation is required",
  },
  email: {
    name: "email",
    label: "email",
    placeHolder: "email",
    requiredErr: "email is required",
  },
};

export type SignupValues = {
  [key in keyof typeof signupField as string]: string;
};

export const SIGNUP_VALUES = {
  [signupField.first_name.name]: "",
  [signupField.surname_name.name]: "",
  [signupField.phone.name]: "",
  [signupField.role.name]: "",
  [signupField.password.name]: "",
  [signupField.password_confirmation.name]: "",
  [signupField.email.name]: "",
};

export const signupValidation = Yup.object().shape({
  [signupField.first_name.name]: Yup.string().required(
    `${signupField.first_name.requiredErr}`
  ),
  [signupField.surname_name.name]: Yup.string().required(
    `${signupField.surname_name.requiredErr}`
  ),
  [signupField.phone.name]: Yup.number()
    .min(10, "Cannot be less than 10 digits")
    .max(10, "Cannot be more than 10 digits")
    .required(`${signupField.phone.requiredErr}`),
  [signupField.role.name]: Yup.string().required(
    `${signupField.role.requiredErr}`
  ),
  [signupField.password.name]: Yup.string().required(
    `${signupField.password.requiredErr}`
  ),
  [signupField.password_confirmation.name]: Yup.string()
    .required(`${signupField.password_confirmation.requiredErr}`)
    .oneOf(
      [Yup.ref(`${signupField.password.name}`), ""],
      "Passwords must match"
    ),
  [signupField.email.name]: Yup.string()
    .email("Invalid email")
    .required(`${signupField.email.requiredErr}`),
});
