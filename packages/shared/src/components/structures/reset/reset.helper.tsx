import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { confirmPassword } from "../../../provider/store/services/auth.service";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { RESET_VALUES, resetValidation } from "./resetModel";
import { UpdatePasswordParams } from "../../../utils/types/auth";

export const useResetHelper = () => {
  type dataType = keyof typeof RESET_VALUES;

  const dispatch = useAppDispatch();

  const resetFormik = useFormik({
    initialValues: RESET_VALUES,
    validationSchema: resetValidation,
    onSubmit: (values) => {
      let data: UpdatePasswordParams = {
        token: values.token,
        password: values.password,
        confirmation_password: values.confirmation_password,
      };
      dispatch(confirmPassword(data));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } = resetFormik;

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
