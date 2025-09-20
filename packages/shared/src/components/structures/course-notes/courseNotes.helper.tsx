import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { COURSE_NOTES_VALUES, courseNotesValidation } from "./courseNotesModel";
import { CourseNotesFields} from "../../../utils/types/course-notes";
import { createCourseNotes } from "../../../provider/store/services/course-note.service";

export const useCourseNotesHelper = () => {
  type dataType = keyof typeof COURSE_NOTES_VALUES;

  const dispatch = useAppDispatch();

  const courseNotesFormik = useFormik({
    initialValues: COURSE_NOTES_VALUES,
    validationSchema: courseNotesValidation,
    onSubmit: (values) => {
      let params:CourseNotesFields = {
        user_id: +values.user_id,
        course_id: +values.course_id,
        notes: values.course_notes,
      };
      console.log("course note body",params)
      dispatch(createCourseNotes({params}))
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
