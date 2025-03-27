import { useFormik } from "formik";
import { PHONEVERIFY_VALUES, phoneVerifyValidation } from "./phoneVerifyModel";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { OtpLoginParams } from "../../../utils/types/auth";
import { verifyPhoneNumber } from "../../../provider/store/services/auth.service";

export const usePhoneVerifyHelper = () => {
  type dataType = keyof typeof PHONEVERIFY_VALUES;

  const dispatch = useAppDispatch();
  const phoneVerifyFormik = useFormik({
    initialValues: PHONEVERIFY_VALUES,
    validationSchema: phoneVerifyValidation,
    onSubmit: (values) => {
      let params: OtpLoginParams = {
        phone: values.phone,
      };
      dispatch(verifyPhoneNumber(params));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    phoneVerifyFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const phoneVerifyInputProps = (
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
    phoneVerifyFormik,
    phoneVerifyInputProps,
  };
};
