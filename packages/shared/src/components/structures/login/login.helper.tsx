import { useFormik } from "formik";
import { AuthParams } from "../../../utils/types/auth";
import { LOGIN_VALUES, loginValidation } from "./loginModel";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { signIn } from "../../../provider/store/services/auth.service";
import { InputAtomProps } from "../../atoms/Input/InputAtom";

export const useAuthHelper = () => {
  type dataType = keyof typeof LOGIN_VALUES;

  const dispatch = useAppDispatch();

  const authFormik = useFormik({
    initialValues: LOGIN_VALUES,
    validationSchema: loginValidation,
    onSubmit: (values) => {
      let data: AuthParams = {
        phone: values.phone,
        password: values.password,
        device_id: values.device_id || "",
        device_id_web: values.device_id_web || "",
      };
      dispatch(signIn(data));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } = authFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const authInputProps = (
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
    authFormik,
    authInputProps,
  };
};
