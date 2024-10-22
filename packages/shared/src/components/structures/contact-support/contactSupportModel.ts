import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type ContactSupportField = Pick<
  ModelParams,
  "first_name" | "last_name" | "phone" | "email" | "message"
>;

export const contactSupportField: ContactSupportField = {
  first_name: {
    name: "first_name",
    label: "First Name",
    placeHolder: "Enter first name",
    requiredErr: "First name is required",
  },
  last_name: {
    name: "last_name",
    label: "Last Name",
    placeHolder: "Enter last name",
    requiredErr: "Last name is required",
  },
  email: {
    name: "email",
    label: "Email",
    placeHolder: "Email email id",
    requiredErr: "Email is required",
  },
  phone: {
    name: "phone",
    label: "Phone",
    placeHolder: "Enter phone number",
    requiredErr: "Phone number is required",
  },
  message: {
    name: "message",
    label: "Messgage",
    placeHolder: "Enter your message",
    requiredErr: "Message is required",
  },
};

export type ContactSupportFieldValues = {
  [key in keyof typeof contactSupportField as string]: string;
};

export const CONTACTSUPPORT_VALUES = {
  [contactSupportField.first_name.name]: "",
  [contactSupportField.last_name.name]: "",
  [contactSupportField.email.name]: "",
  [contactSupportField.phone.name]: "",
  [contactSupportField.message.name]: "",
};

export const contactSupportValidation = Yup.object().shape({
  [contactSupportField.first_name.name]: Yup.string().required(
    `${contactSupportField.first_name.requiredErr}`
  ),
  [contactSupportField.last_name.name]: Yup.string().required(
    `${contactSupportField.last_name.requiredErr}`
  ),
  [contactSupportField.email.name]: Yup.string()
    .email("Invalid email")
    .required(`${contactSupportField.email.requiredErr}`),
  [contactSupportField.phone.name]: Yup.number().required(
    `${contactSupportField.phone.requiredErr}`
  ),
  [contactSupportField.message.name]: Yup.string().required(
    `${contactSupportField.message.requiredErr}`
  ),
});
