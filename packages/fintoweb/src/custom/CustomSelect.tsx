import React from "react";
import { Input, InputProps } from "reactstrap";
import { FieldProps } from "formik";

type CustomSelectProps = FieldProps & InputProps;

const CustomSelect: React.FC<CustomSelectProps> = ({
  field,
  form: { touched, errors },
  ...props
}) => <Input type="select" {...field} {...props} />;

export default CustomSelect;
