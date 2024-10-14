import { Dimensions, PixelRatio, Platform } from "react-native";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

const isWeb = Platform.OS === "web";
const guidelineBaseWidth = isWeb ? 896 : 414;
const guidelineBaseHeight = isWeb ? 414 : 896;

export const horizontalSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const verticalSize = (size: number) =>
  (WINDOW_HEIGHT / guidelineBaseHeight) * size;

export const horizontalScale = (size: number, factor: number = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (horizontalSize(size) - size) * factor);

export const verticalScale = (size: number, factor: number = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (verticalSize(size) - size) * factor);

export const moderateScale = (size: number, factor: number = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (horizontalSize(size) - size) * factor);

export const mScale = {
  xxs: moderateScale(2),
  xs: moderateScale(5),
  sm: moderateScale(8),
  md: moderateScale(10),
  md2: moderateScale(12),
  md3: moderateScale(14),
  base: moderateScale(16),
  lg: moderateScale(18),
  lg1: moderateScale(20),
  lg2: moderateScale(24),
  lg3: moderateScale(25),
  xl: moderateScale(30),
  xxl: moderateScale(40),
  xxl1: moderateScale(45),
  xxl2: moderateScale(48),
  xxxl: moderateScale(60),
};
