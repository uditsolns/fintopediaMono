import { useFormik } from "formik";
import { SignupParams } from "../../../utils/types/auth";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { SIGNUP_VALUES, signupValidation } from "./signupModel";
import { signUp } from "../../../provider/store/services/auth.service";

export const useSignupHelper = () => {
  type dataType = keyof typeof SIGNUP_VALUES;

  const dispatch = useAppDispatch();

  const signupFormik = useFormik({
    initialValues: SIGNUP_VALUES,
    validationSchema: signupValidation,
    onSubmit: (values) => {
      let data: SignupParams = {
        phone: values.phone,
        password: values.password,
        college_id: values.college,
        email: values.email,
        first_name: values.first_name,
        password_confirmation: values.password_confirmation,
        role: "User",
        surname_name: values.surname_name,
        designation: values.designation,
      };
      console.log("signup data ", data);
      dispatch(signUp(data));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    signupFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const signupInputProps = (
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
    signupFormik,
    signupInputProps,
  };
};
