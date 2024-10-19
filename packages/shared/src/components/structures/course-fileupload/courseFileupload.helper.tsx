import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import {
  COURSE_UPLOADFILE_VALUES,
  courseFileuploadValidation,
} from "./courseFileuploadModel";
import {
  createCourseUploadFile,
  createCourseUploadFileFormik,
} from "../../../provider/store/services/course-upload-file.service";
import { CourseUploadFileFields } from "../../../utils/types/course-upload-file";

export const useCourseNotesHelper = () => {
  type dataType = keyof typeof COURSE_UPLOADFILE_VALUES;

  const dispatch = useAppDispatch();

  const courseNotesFormik = useFormik({
    initialValues: COURSE_UPLOADFILE_VALUES,
    // validationSchema: courseFileuploadValidation,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("user_id", values.user_id);
      formData.append("course_id", values.course_id);
      formData.append("upload_file", values.upload_file);
      console.log("course File body", JSON.stringify(formData));
      dispatch(createCourseUploadFileFormik({ formData }));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    courseNotesFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const courseNotesInputProps = (
    key: dataType
  ): Partial<Record<keyof InputAtomProps, any>> => {
    return {
      id: key,
      value: values[key],
      error: _onError(key),
      errorMessage: _onError(key),
      onBlur: () => _onBlur(key as string),
      returnKeyType: "next",
      touched: touched[key] || false,
      onChangeText: handleChange(key),
      onChange: handleChange(key),
    };
  };

  return {
    courseNotesFormik,
    courseNotesInputProps,
  };
};
