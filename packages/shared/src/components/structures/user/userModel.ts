import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type UserField = Pick<
  ModelParams,
  | "id"
  | "first_name"
  | "email"
  | "phone"
  | "father_name"
  | "surname_name"
  | "dob"
  | "qualification"
  | "degree"
  | "10th_result"
  | "10th_school_name"
  | "12th_result"
  | "12th_college_name"
  | "grad_result"
  | "grad_school"
  | "postgrad_result"
  | "postgrad_school"
  | "extra_courses"
  | "job_preference"
  | "location"
  | "adhaar_num"
  | "pan_num"
  | "adhaar_file_upload"
  | "work_experience"
  | "age"
  | "gender"
  | "cv"
  | "feedback"
  | "headline"
  | "bio"
  | "linkedin"
  | "website_url"
  | "photo"
>;

export const userField: UserField = {
  id: {
    name: "id",
    label: "",
    placeHolder: "",
    requiredErr: "",
  },
  first_name: {
    name: "first_name",
    label: "Name",
    placeHolder: "Enter your name",
    requiredErr: "Name is required",
  },
  surname_name: {
    name: "surname_name",
    label: "Surname",
    placeHolder: "Enter your surname",
    requiredErr: "Surname is required",
  },
  email: {
    name: "email",
    label: "Email",
    placeHolder: "Email your email id",
    requiredErr: "Email is required",
  },
  phone: {
    name: "phone",
    label: "Phone",
    placeHolder: "Enter your phone number",
    requiredErr: "Phone number is required",
  },
  age: {
    name: "age",
    label: "Age",
    placeHolder: "Age",
    requiredErr: "Age is required",
  },
  gender: {
    name: "gender",
    label: "Gender",
    placeHolder: "Select your gender",
    requiredErr: "Gender is required",
  },
  dob: {
    name: "dob",
    label: "Date of birth",
    placeHolder: "Select your dob",
    requiredErr: "Dob is required",
  },
  father_name: {
    name: "father_name",
    label: "Father Name",
    placeHolder: "Enter your father name",
    requiredErr: "",
  },
  qualification: {
    name: "qualification",
    label: "Qualification",
    placeHolder: "Enter your Qualification",
    requiredErr: "",
  },
  degree: {
    name: "degree",
    label: "Degree",
    placeHolder: "Enter your degree name",
    requiredErr: "",
  },

  "10th_result": {
    name: "10th_result",
    label: "10th Result",
    placeHolder: "10th Result",
    requiredErr: "",
  },
  "12th_result": {
    name: "12th_result",
    label: "12th Result",
    placeHolder: "12th Result",
    requiredErr: "",
  },
  "10th_school_name": {
    name: "10th_school_name",
    label: "10th School Name",
    placeHolder: "10th School Name",
    requiredErr: "",
  },
  "12th_college_name": {
    name: "12th_college_name",
    label: "12th College Name",
    placeHolder: "12th College Name",
    requiredErr: "",
  },
  grad_result: {
    name: "grad_result",
    label: "Gradualtion Result",
    placeHolder: "Gradualtion Result",
    requiredErr: "",
  },
  grad_school: {
    name: "grad_school",
    label: "Gradualtion College Name",
    placeHolder: "Gradualtion College Name",
    requiredErr: "",
  },
  postgrad_result: {
    name: "postgrad_result",
    label: "Post Gradualtion Result",
    placeHolder: "Post Gradualtion Result",
    requiredErr: "",
  },
  postgrad_school: {
    name: "postgrad_school",
    label: "Post Gradualtion College Name",
    placeHolder: "Post Gradualtion College Name",
    requiredErr: "",
  },
  extra_courses: {
    name: "extra_courses",
    label: "Extra Courses",
    placeHolder: "Extra Courses",
    requiredErr: "",
  },
  job_preference: {
    name: "job_preference",
    label: "Job Preference",
    placeHolder: "Job Preference",
    requiredErr: "",
  },

  location: {
    name: "location",
    label: "Enter your location",
    placeHolder: "Enter your location",
    requiredErr: "",
  },
  adhaar_num: {
    name: "adhaar_num",
    label: "Enter your adhaar numner",
    placeHolder: "Enter your adhaar numner",
    requiredErr: "",
  },
  photo: {
    name: "photo",
    label: "",
    placeHolder: "",
    requiredErr: "Photo is required",
  },
  pan_num: {
    name: "pan_num",
    label: "Enter your pan numner",
    placeHolder: "Enter your pan numner",
    requiredErr: "",
  },
  adhaar_file_upload: {
    name: "adhaar_file_upload",
    label: "Upload your adhaar card",
    placeHolder: "Upload your adhaar card",
    requiredErr: "",
  },
  cv: {
    name: "cv",
    label: "Upload your cv",
    placeHolder: "Upload your cv",
    requiredErr: "",
  },
  work_experience: {
    name: "work_experience",
    label: "Add your work_experience",
    placeHolder: "Add your work_experience",
    requiredErr: "",
  },
  feedback: {
    name: "feedback",
    label: "Add your feedback",
    placeHolder: "Add your feedback",
    requiredErr: "",
  },
  headline: {
    name: "headline",
    label: "Headline",
    placeHolder: "Enter your headline",
    requiredErr: "",
  },
  bio: {
    name: "bio",
    label: "Bio",
    placeHolder: "Enter your bio",
    requiredErr: "",
  },
  linkedin: {
    name: "linkedin",
    label: "Linkedin",
    placeHolder: "Enter your linkedin url",
    requiredErr: "",
  },
  website_url: {
    name: "website_url",
    label: "Website URL",
    placeHolder: "Enter your website url",
    requiredErr: "",
  },
};

export type UserValues = {
  [key in keyof typeof userField as string]: string;
};

export const USER_VALUES = {
  [userField.id.name]: "",
  [userField.first_name.name]: "",
  [userField.surname_name.name]: "",
  [userField.email.name]: "",
  [userField.phone.name]: "",
  [userField.age.name]: "",
  [userField.gender.name]: "",
  [userField.dob.name]: "",
  [userField.father_name.name]: "",
  [userField.qualification.name]: "",
  [userField.degree.name]: "",
  [userField["10th_result"].name]: "",
  [userField["12th_result"].name]: "",
  [userField["10th_school_name"].name]: "",
  [userField["12th_college_name"].name]: "",
  [userField.grad_result.name]: "",
  [userField.grad_school.name]: "",
  [userField.postgrad_result.name]: "",
  [userField.postgrad_school.name]: "",
  [userField.extra_courses.name]: "",
  [userField.job_preference.name]: "",
  [userField.location.name]: "",
  [userField.adhaar_num.name]: "",
  [userField.pan_num.name]: "",
  [userField.adhaar_file_upload.name]: "",
  [userField.cv.name]: "",
  [userField.work_experience.name]: "",
  [userField.feedback.name]: "",
  [userField.bio.name]: "",
  [userField.headline.name]: "",
  [userField.linkedin.name]: "",
  [userField.website_url.name]: "",
  [userField.photo.name]: "",
};

export const userValidation = Yup.object().shape({
  [userField.first_name.name]: Yup.string().required(
    `${userField.first_name.requiredErr}`
  ),
  [userField.surname_name.name]: Yup.string().required(
    `${userField.surname_name.requiredErr}`
  ),
  [userField.email.name]: Yup.string()
    .email("Invalid email")
    .required(`${userField.email.requiredErr}`),
  [userField.phone.name]: Yup.number().required(
    `${userField.phone.requiredErr}`
  ),
  // [userField.age.name]: Yup.string().required(`${userField.age.requiredErr}`),
  // [userField.gender.name]: Yup.string().required(
  //   `${userField.gender.requiredErr}`
  // ),
  // [userField.dob.name]: Yup.string().required(`${userField.dob.requiredErr}`),
});
