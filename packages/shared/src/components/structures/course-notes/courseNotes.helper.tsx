import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { COURSE_NOTES_VALUES, courseNotesValidation } from "./courseNotesModel";
import { CourseNotesParams } from "../../../utils/types/course-notes";

export const useCourseNotesHelper = () => {
  type dataType = keyof typeof COURSE_NOTES_VALUES;

  const dispatch = useAppDispatch();

  const courseNotesFormik = useFormik({
    initialValues: COURSE_NOTES_VALUES,
    validationSchema: courseNotesValidation,
    onSubmit: (values) => {
      let data: CourseNotesParams = {
        user_id: +values.user_id,
        course_id: +values.course_id,
        note_desc: values.note_desc,
      };
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
