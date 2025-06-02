import { useFormik } from "formik";
import { SENDOTP_VALUES, sendOtpValidation } from "./sendOtpModal";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { OtpLoginParams } from "../../../utils/types/auth";
import { sendOtpLogin } from "../../../provider/store/services/auth.service";

export const useSendOtpHelper = () => {
  type dataType = keyof typeof SENDOTP_VALUES;

  const dispatch = useAppDispatch();
  const sendOtpFormik = useFormik({
    initialValues: SENDOTP_VALUES,
    validationSchema: sendOtpValidation,
    onSubmit: (values) => {
      let params: OtpLoginParams = {
        phone: values.phone,
      };
      dispatch(sendOtpLogin(params));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    sendOtpFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const sendOtpInputProps = (
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
    sendOtpFormik,
    sendOtpInputProps,
  };
};
