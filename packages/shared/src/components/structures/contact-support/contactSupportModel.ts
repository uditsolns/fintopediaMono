import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type ContactSupportField = Pick<
  ModelParams,
  "first_name" | "last_name" | "phone_no" | "email_id" | "message"
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
  email_id: {
    name: "email_id",
    label: "Email",
    placeHolder: "Email email id",
    requiredErr: "Email is required",
  },
  phone_no: {
    name: "phone_no",
    label: "Phone Number",
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
  [contactSupportField.email_id.name]: "",
  [contactSupportField.phone_no.name]: "",
  [contactSupportField.message.name]: "",
};

export const contactSupportValidation = Yup.object().shape({
  [contactSupportField.first_name.name]: Yup.string().required(
    `${contactSupportField.first_name.requiredErr}`
  ),
  [contactSupportField.last_name.name]: Yup.string().required(
    `${contactSupportField.last_name.requiredErr}`
  ),
  [contactSupportField.email_id.name]: Yup.string()
    .email("Invalid email")
    .required(`${contactSupportField.email_id.requiredErr}`),

  [contactSupportField.phone_no.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required(`${contactSupportField.phone_no.requiredErr}`),

  [contactSupportField.message.name]: Yup.string().required(
    `${contactSupportField.message.requiredErr}`
  ),
});
