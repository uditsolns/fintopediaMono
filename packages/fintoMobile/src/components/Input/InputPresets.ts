import { colorPresets } from "@shared/src/theme/color";
import { mScale } from "@shared/src/theme/metrics";
import { fontPresets } from "@shared/src/theme/typography";
import { TextStyle } from "react-native";

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
