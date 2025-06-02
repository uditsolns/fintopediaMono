import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { VerifyOtp } from "../../../provider/store/services/auth.service";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { RESET_VALUES, resetValidation } from "./reset.passwordModel";
import { VerifyOtpParams } from "../../../utils/types/auth";

export const useResetPasswordHelper = () => {
  type dataType = keyof typeof RESET_VALUES;

  const dispatch = useAppDispatch();

  const resetFormik = useFormik({
    initialValues: RESET_VALUES,
    validationSchema: resetValidation,
    onSubmit: (values) => {
      let data: VerifyOtpParams = {
        phone: values.phone,
        otp: values.otp,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
      };
      dispatch(VerifyOtp(data));
      resetFormik.resetForm();
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    resetFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const resetInputProps = (
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
    resetFormik,
    resetInputProps,
  };
};
