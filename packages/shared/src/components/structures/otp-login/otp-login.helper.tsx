import { useFormik } from "formik";
import { OTPLOGIN_VALUES, otpLoginValidation } from "./otpLoginModel";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { OtpLoginParams2 } from "../../../utils/types/auth";
import { phoneNumberOtpLogin } from "../../../provider/store/services/auth.service";

export const useOtpLoginHelper = () => {
  type dataType = keyof typeof OTPLOGIN_VALUES;

  const dispatch = useAppDispatch();
  const otpLoginFormik = useFormik({
    initialValues: OTPLOGIN_VALUES,
    validationSchema: otpLoginValidation,
    onSubmit: (values) => {
      let params: OtpLoginParams2 = {
        phone: values.phone,
        device_id: values.device_id,
        otp: values?.otp,
      };
      dispatch(phoneNumberOtpLogin(params));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    otpLoginFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const otpLoginInputProps = (
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
    otpLoginFormik,
    otpLoginInputProps,
  };
};
