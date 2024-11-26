import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import {
  CONTACTSUPPORT_VALUES,
  contactSupportValidation,
} from "./contactSupportModel";
import { createContactSupport } from "../../../provider/store/services/contact.service";

export const useContactSupportHelper = () => {
  type dataType = keyof typeof CONTACTSUPPORT_VALUES;

  const dispatch = useAppDispatch();

  const contactSupportFormik = useFormik({
    initialValues: CONTACTSUPPORT_VALUES,
    validationSchema: contactSupportValidation,
    onSubmit: (values) => {
      let data = {
        first_name: values.first_name,
        last_name: values.last_name,
        phone_no: values.phone_no,
        email: values.email,
        message: values.message,
      };
      dispatch(createContactSupport(data));
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    contactSupportFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const contactSupportInputProps = (
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
    contactSupportFormik,
    contactSupportInputProps,
  };
};
