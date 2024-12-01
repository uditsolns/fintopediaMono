import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type UpdatePasswordField = Pick<
  ModelParams,
  "user_id" | "new_password" | "new_password_confirmation"
>;

export const updatePasswordField: UpdatePasswordField = {
  // old_password: {
  //   name: "old_password",
  //   label: "Old Password",
  //   placeHolder: "Enter your old password",
  //   requiredErr: "Old password is required",
  // },
  user_id: {
    name: "user_id",
    label: "User ID",
    placeHolder: "Enter User ID",
    requiredErr: "User",
  },
  new_password: {
    name: "new_password",
    label: "New Password",
    placeHolder: "Enter your new password",
    requiredErr: "New Password is required",
  },
  new_password_confirmation: {
    name: "new_password_confirmation",
    label: "Confirm New Password",
    placeHolder: "Enter your confirm new password",
    requiredErr: "Confirm New Password is required",
  },
};

export type UpdatePasswordValues = {
  [key in keyof typeof updatePasswordField as string]: string;
};

export const UPDATE_PASSWORD_VALUES = {
  // [updatePasswordField.old_password.name]: "",
  [updatePasswordField.new_password.name]: "",
  [updatePasswordField.new_password_confirmation.name]: "",
};

export const updatePasswordValidation = Yup.object().shape({
  // [updatePasswordField.old_password.name]: Yup.string().required(
  //   `${updatePasswordField.old_password.requiredErr}`
  // ),
  [updatePasswordField.new_password.name]: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required(`${updatePasswordField.new_password.requiredErr}`),
  [updatePasswordField.new_password_confirmation.name]: Yup.string()
    .required(`${updatePasswordField.new_password_confirmation.requiredErr}`)
    .oneOf(
      [Yup.ref(`${updatePasswordField.new_password_confirmation.name}`), ""],
      "Passwords must match"
    ),
 
});
 