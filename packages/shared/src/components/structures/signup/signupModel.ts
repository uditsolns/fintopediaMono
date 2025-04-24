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
  | "college"
  | "designation"
  | "state_name"
>;

export const signupField: SignupField = {
  first_name: {
    name: "first_name",
    label: "Name",
    placeHolder: "Enter your name",
    requiredErr: "Name is required",
  },
  surname_name: {
    name: "surname_name",
    label: "Surname",
    placeHolder: "Enter your surname",
    requiredErr: "Surname is required",
  },
  email: {
    name: "email",
    label: "Email",
    placeHolder: "Email your email id",
    requiredErr: "Email is required",
  },
  phone: {
    name: "phone",
    label: "Phone",
    placeHolder: "Enter your phone number",
    requiredErr: "Phone number is required",
  },
  role: {
    name: "role",
    label: "Role",
    placeHolder: "Role",
    requiredErr: "Role is required",
  },
  designation: {
    name: "designation",
    label: "Designation",
    placeHolder: "Enter your Designation",
    requiredErr: "Designation is required",
  },
  state_name: {
    name: "state_name",
    label: "State Name",
    placeHolder: "Select your state",
    requiredErr: "State is required",
  },
  password: {
    name: "password",
    label: "Password",
    placeHolder: "Enter your password",
    requiredErr: "Password is required",
  },
  password_confirmation: {
    name: "password_confirmation",
    label: "Confirm Password",
    placeHolder: "Enter your confirm password",
    requiredErr: "Confirm Password is required",
  },
  college: {
    name: "college",
    label: "College/University",
    placeHolder: "Select your college/university",
    requiredErr: "College/University is required",
  },
};

export type SignupValues = {
  [key in keyof typeof signupField as string]: string;
};

export const SIGNUP_VALUES = {
  [signupField.first_name.name]: "",
  [signupField.surname_name.name]: "",
  [signupField.email.name]: "",
  [signupField.phone.name]: "",
  [signupField.role.name]: "",
  [signupField.password.name]: "",
  [signupField.password_confirmation.name]: "",
  [signupField.college.name]: "",
  [signupField.designation.name]: "",

};

export const signupValidation = Yup.object().shape({
  [signupField.first_name.name]: Yup.string().required(
    `${signupField.first_name.requiredErr}`
  ),
  [signupField.surname_name.name]: Yup.string().required(
    `${signupField.surname_name.requiredErr}`
  ),
  // [signupField.designation.name]: Yup.string().required(
  //   `${signupField.designation.requiredErr}`
  // ),
  [signupField.email.name]: Yup.string()
    .email("Invalid email")
    .required(`${signupField.email.requiredErr}`),

  [signupField.phone.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required(`${signupField.phone.requiredErr}`),
  // [signupField.role.name]: Yup.string().required(
  //   `${signupField.role.requiredErr}`
  // ),

  [signupField.password.name]: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required(`${signupField.password.requiredErr}`),
  [signupField.password_confirmation.name]: Yup.string()
    .required(`${signupField.password_confirmation.requiredErr}`)
    .oneOf(
      [Yup.ref(`${signupField.password.name}`), ""],
      "Passwords must match"
    ),
  // [signupField.college.name]: Yup.string().required(
  //   `${signupField.college.requiredErr}`
  // ),
});
