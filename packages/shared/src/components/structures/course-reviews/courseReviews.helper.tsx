import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import {
  COURSE_REVIEWS_VALUES,
  courseReviewsValidation,
} from "./courseReviewsModel";
import { CourseReviewParams } from "../../../utils/types/course-review";

export const useCourseReviewssHelper = () => {
  type dataType = keyof typeof COURSE_REVIEWS_VALUES;

  const dispatch = useAppDispatch();

  const courseReviewsFormik = useFormik({
    initialValues: COURSE_REVIEWS_VALUES,
    validationSchema: courseReviewsValidation,
    onSubmit: (values) => {
      let data: CourseReviewParams = {
        user_id: +values.user_id,
        course_id: +values.course_id,
        rating: values.rating,
        rating_desc: values.rating_desc,
      };
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    courseReviewsFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const courseReviewsInputProps = (
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
    courseReviewsFormik,
    courseReviewsInputProps,
  };
};
