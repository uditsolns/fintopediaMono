import React from "react";
import { Input, InputProps } from "reactstrap";
import { FieldProps } from "formik";

type CustomInputProps = FieldProps & InputProps;

const CustomInput: React.FC<CustomInputProps> = ({
  field,
  form: { touched, errors },
  ...props
}) => <Input {...field} {...props} />;

export default CustomInput;
