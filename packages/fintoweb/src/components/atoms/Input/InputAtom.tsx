import React from "react";
import { Input, InputGroup, Label, InputProps } from "reactstrap";
import styles from "../Inputs.module.css";

interface InputAtomProps extends Omit<InputProps, "type"> {
  label: string;
  error?: string;
  touched?: boolean;
  errorMessage?: string;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  type?: InputProps["type"];
}

export const InputAtom = ({
  label,
  error,
  errorMessage,
  rightIcon,
  leftIcon,
  type = "text",
  ...rest
}: InputAtomProps) => {
  return (
    <div>
      {label ? <Label>{label}</Label> : null}
      <InputGroup>
        {leftIcon ? leftIcon : null}
        <Input
          // className={styles.textfield}
          className={`${styles.textfield} ${type === 'textarea' ? styles.textarea : ''}`}
          type={type}
          {...rest}
        />
        {rightIcon ? rightIcon : null}
      </InputGroup>
      {error && errorMessage && (
        <label className="text-danger">{errorMessage}</label>
      )}
    </div>
  );
};
