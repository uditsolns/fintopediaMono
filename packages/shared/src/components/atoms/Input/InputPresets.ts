import { TextStyle } from "react-native";
import { colorPresets } from "../../../theme/color";
import { mScale } from "../../../theme/metrics";
import { fontPresets } from "../../../theme/typography";

const APP_BASE: TextStyle = {
  ...fontPresets.medium,
  padding: mScale.md,
  paddingHorizontal: mScale.lg,
  borderColor: "transparent",
};

const APP_SMALL: TextStyle = {
  ...fontPresets.small,
  padding: mScale.sm,
  borderRadius: mScale.sm,
  borderColor: "transparent",
};

export const AppInput = {
  primary: {
    ...APP_BASE,
    color: colorPresets.CTA,
  } as TextStyle,
  small: {
    ...APP_SMALL,
    color: colorPresets.CTA,
  },
};

export type InputPresets = keyof typeof AppInput;
