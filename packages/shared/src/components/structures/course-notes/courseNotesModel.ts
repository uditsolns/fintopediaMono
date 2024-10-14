import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type CourseNotesField = Pick<ModelParams, "user_id" | "course_id" | "course_notes">;

export const courseNotesField: CourseNotesField = {
  user_id: {
    name: "user_id",
    label: "User id",
    placeHolder: "",
    requiredErr: "User id is required",
  },
  course_id: {
    name: "course_id",
    label: "",
    placeHolder: "",
    requiredErr: "",
  },
  course_notes: {
    name: "course_notes",
    label: "",
    placeHolder: "",
    requiredErr: "Course notes is required",
  },
 
};

export type CourseNotesValues = {
  [key in keyof typeof courseNotesField as string]: string;
};

export const COURSE_NOTES_VALUES = {
  [courseNotesField.user_id.name]: "",
  [courseNotesField.course_id.name]: "",
  [courseNotesField.course_notes.name]: "",
};

export const courseNotesValidation = Yup.object().shape({
  // [buySellField.order_qty.name]: Yup.number().required(
  //   `${buySellField.order_qty.requiredErr}`
  // ),
});
