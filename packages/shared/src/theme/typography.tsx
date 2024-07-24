import { TextStyle } from "react-native";
import { moderateScale } from "./metrics";

export const FONT_BOLD = "InterTight-Bold";
export const FONT_SEMIBOLD = "InterTight-SemiBold";
export const FONT_MEDIUM = "InterTight-Medium";
export const FONT_REGULAR = "InterTight-Regular";

export const bold = {
  fontFamily: FONT_BOLD,
};

export const semiBold = {
  fontFamily: FONT_SEMIBOLD,
};

export const medium = {
  fontFamily: FONT_MEDIUM,
};

export const regular = {
  fontFamily: FONT_REGULAR,
};

export const scaleFont = (size: number, height: number = 1.2) => {
  const result = moderateScale(size);
  return {
    fontSize: result,
    lineHeight: moderateScale(result * height),
  };
};

export const fontPresets: Record<string, TextStyle> = {
  banner: {
    ...bold,
    ...scaleFont(28),
    letterSpacing: 0,
  },
  heading1: {
    ...bold,
    ...scaleFont(24),
    letterSpacing: 0,
  },
  heading2: {
    ...bold,
    ...scaleFont(20),
    letterSpacing: 0,
  },
  heading3: {
    ...bold,
    ...scaleFont(18),
    letterSpacing: 0,
  },
  heading4: {
    ...bold,
    ...scaleFont(16),
    letterSpacing: 0,
  },
  xLarge: {
    ...regular,
    ...scaleFont(18),
    letterSpacing: 0,
  },
  large: {
    ...regular,
    ...scaleFont(16),
    letterSpacing: 0,
  },
  medium: {
    ...regular,
    ...scaleFont(14),
    letterSpacing: 0,
  },
  small: {
    ...regular,
    ...scaleFont(12),
    letterSpacing: 0,
  },
  xSmall: {
    ...regular,
    ...scaleFont(11),
    letterSpacing: 0,
  },
  title: {
    ...semiBold,
    ...scaleFont(14),
    letterSpacing: 0,
  },
};
