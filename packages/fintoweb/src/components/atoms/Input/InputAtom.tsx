import React from "react";
import { Input, InputGroup, Label } from "reactstrap";
import styles from "../../../app/sign-up/Signup.module.css";

interface InputAtomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  errorMessage?: string;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
}

export const InputAtom = ({
  label,
  error,
  errorMessage,
  rightIcon,
  leftIcon,
  ...rest
}: InputAtomProps) => {
  return (
    <div>
      {label ? <Label>{label}</Label> : null}
      <InputGroup>
        {leftIcon ? leftIcon : null}
        <Input className={styles.textfield} {...rest} />
        {rightIcon ? rightIcon : null}
      </InputGroup>
      {error && errorMessage && (
        <label className="text-danger">{errorMessage}</label>
      )}
    </div>
  );
};
