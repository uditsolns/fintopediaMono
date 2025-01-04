import { useFormik } from "formik";
import { ForgotPasswordParams } from "../../../utils/types/auth";
import { FORGOT_VALUES, forgotValidation } from "./forgotModel";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { forgotPassword, } from "../../../provider/store/services/auth.service";
import { InputAtomProps } from "../../atoms/Input/InputAtom";

export const useForgotHelper = () => {
  type dataType = keyof typeof FORGOT_VALUES;

  const dispatch = useAppDispatch();
  const forgotFormik = useFormik({
    initialValues: FORGOT_VALUES,
    validationSchema: forgotValidation,
    onSubmit: (values) => {
      let data: ForgotPasswordParams = {
        email: values.email,
      };
      dispatch(forgotPassword(data));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } = forgotFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const forgotInputProps = (
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
    forgotFormik,
    forgotInputProps,
  };
};
