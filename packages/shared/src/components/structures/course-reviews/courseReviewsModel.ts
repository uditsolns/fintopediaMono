import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type CourseReviewsField = Pick<
  ModelParams,
  "user_id" | "course_id" | "rating" | "rating_desc"
>;

export const courseReviewsField: CourseReviewsField = {
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
  rating: {
    name: "rating",
    label: "",
    placeHolder: "",
    requiredErr: "Rating is required",
  },
  rating_desc: {
    name: "rating_desc",
    label: "",
    placeHolder: "",
    requiredErr: "Rating description is required",
  },
};

export type CourseReviewsValues = {
  [key in keyof typeof courseReviewsField as string]: string;
};

export const COURSE_REVIEWS_VALUES = {
  [courseReviewsField.user_id.name]: "",
  [courseReviewsField.course_id.name]: "",
  [courseReviewsField.rating.name]: "",
  [courseReviewsField.rating_desc.name]: "",
};

export const courseReviewsValidation = Yup.object().shape({
  // [buySellField.order_qty.name]: Yup.number().required(
  //   `${buySellField.order_qty.requiredErr}`
  // ),
});
