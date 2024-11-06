import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { UPDATE_PASSWORD_VALUES, updatePasswordValidation } from "./updatePasswordModel";
import { UpdatePasswordParams } from "../../../utils/types/auth";

export const useUpdatePasswordHelper = () => {
  type dataType = keyof typeof UPDATE_PASSWORD_VALUES;

  const dispatch = useAppDispatch();

  const updatePasswordFormik = useFormik({
    initialValues: UPDATE_PASSWORD_VALUES,
    validationSchema: updatePasswordValidation,
    onSubmit: (values) => {
      let data: UpdatePasswordParams = {
        old_password: values.old_password,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
      };
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } = updatePasswordFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const updatePasswordInputProps = (
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
    updatePasswordFormik,
    updatePasswordInputProps,
  };
};
