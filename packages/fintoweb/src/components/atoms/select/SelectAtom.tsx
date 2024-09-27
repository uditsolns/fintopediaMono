import React from "react";
import { InputGroup, Label, Input } from "reactstrap";
import styles from "../Inputs.module.css";

interface SelectAtomProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  touched?: boolean;
  errorMessage?: string;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}

export const SelectAtom = ({
  label,
  error,
  errorMessage,
  rightIcon,
  leftIcon,
  options,
  placeholder,
  ...rest
}: SelectAtomProps) => {
  return (
    <div>
      {label ? <Label>{label}</Label> : null}
      <InputGroup>
        {leftIcon ? leftIcon : null}
        {/* Use `select` directly instead of `Input` to avoid type conflicts */}
        <select className={styles.textfield} {...rest}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {rightIcon ? rightIcon : null}
      </InputGroup>
      {error && errorMessage && (
        <label className="text-danger">{errorMessage}</label>
      )}
    </div>
  );
};