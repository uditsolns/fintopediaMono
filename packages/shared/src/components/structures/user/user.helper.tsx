import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { USER_VALUES, userValidation } from "./userModel";
import { updateUser } from "../../../provider/store/services/user.service";
import { UserUpdateParams } from "../../../utils/types/auth";

export const useUserHelper = () => {
  type dataType = keyof typeof USER_VALUES;

  const dispatch = useAppDispatch();

  const userFormik = useFormik({
    initialValues: USER_VALUES,
    validationSchema: userValidation,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('first_name', values.first_name);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('surname_name', values.surname_name);
      formData.append('bio', values.bio);
      formData.append('headline', values.headline);
      formData.append('linkedin', values.linkedin);
      formData.append('website_url', values.website_url);
      let id =  values?.id.toString()
      dispatch(updateUser({formData,id}));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } = userFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const userInputProps = (
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
    userFormik,
    userInputProps,
  };
};
