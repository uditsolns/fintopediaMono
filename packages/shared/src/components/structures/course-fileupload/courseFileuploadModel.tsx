import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type CourseFileuploadField = Pick<
  ModelParams,
  "user_id" | "course_id" | "upload_file"
>;

export const courseFileuploadField: CourseFileuploadField = {
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
  upload_file: {
    name: "upload_file",
    label: "",
    placeHolder: "",
    requiredErr: "Course File Upload is required",
  },
};

export type CourseFileuploadValues = {
  [key in keyof typeof courseFileuploadField as string]: string;
};

export const COURSE_UPLOADFILE_VALUES = {
  [courseFileuploadField.user_id.name]: "",
  [courseFileuploadField.course_id.name]: "",
  [courseFileuploadField.upload_file.name]: "",
};

export const courseFileuploadValidation = Yup.object().shape({
  [courseFileuploadField.upload_file.name]: Yup.string().required(
    `${courseFileuploadField.upload_file.requiredErr}`
  ),
});
