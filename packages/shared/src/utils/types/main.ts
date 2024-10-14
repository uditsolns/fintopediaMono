export interface ISVGProps {
  color?: string;
  width?: number;
  height?: number;
  stroke?: number;
}

export interface FormModel {
  name: string;
  label: string;
  placeHolder: string;
  requiredErr: string;
}

export interface ImageType {
  name: string;
  type: string;
  uri?: string;
}

export type Paramkeys =
  | "phone"
  | "password"
  | "first_name"
  | "surname_name"
  | "phone"
  | "role"
  | "password"
  | "password_confirmation"
  | "email"
  | "college"
  | "token"
  | "password"
  | "password_confirmation";

export type ModelParams = Record<Paramkeys, FormModel>;
