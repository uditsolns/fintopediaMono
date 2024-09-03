import { TextStyle, ViewStyle } from "react-native";
import { colorPresets } from "../../../theme/color";
import { mScale, moderateScale } from "../../../theme/metrics";
import { fontPresets } from "../../../theme/typography";

const BASE_VIEW: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: mScale.base,
  paddingVertical: mScale.md3,
  marginVertical: mScale.md,
  borderRadius: mScale.sm,
};

const BASE_TEXT: TextStyle = {
  ...fontPresets.bodyBold,
};

export const Presets = {
  primary: { ...BASE_VIEW, backgroundColor: colorPresets.CTA } as ViewStyle,
  secondary: {
    ...BASE_VIEW,
    backgroundColor: colorPresets.BG,
  } as ViewStyle,
  tertiary: {
    ...BASE_VIEW,
    backgroundColor: colorPresets.BG,
    marginVertical: moderateScale(1.5),
    marginHorizontal: moderateScale(1.5),
  } as ViewStyle,
  disabled: {
    ...BASE_VIEW,
    backgroundColor: colorPresets.GRAY3,
  } as ViewStyle,
};

export const ButtonText = {
  primary: { ...BASE_TEXT, color: colorPresets.OFFBLACK } as TextStyle,
  secondary: { ...BASE_TEXT } as TextStyle,
  tertiary: { ...BASE_TEXT } as TextStyle,
  disabled: { ...BASE_TEXT } as TextStyle,
};

export type ButtonPresets = keyof typeof Presets;
