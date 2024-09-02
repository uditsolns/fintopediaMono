import { fontPresets } from "../../../theme/typography";

export const TextPresets = {
  banner: { ...fontPresets.banner },
  heading1: { ...fontPresets.heading1 },
  heading2: { ...fontPresets.heading2 },
  heading3: { ...fontPresets.heading3 },
  heading4: { ...fontPresets.heading4 },
  xLarge: { ...fontPresets.xLarge },
  large: { ...fontPresets.large },
  body: { ...fontPresets.body },
  medium: { ...fontPresets.medium },
  title: { ...fontPresets.title },
  titleBold: { ...fontPresets.titleBold },
  small: { ...fontPresets.small },
  smallBold: { ...fontPresets.smallBold },
  smallSemiBold: { ...fontPresets.smallSemiBold },
  xSmall: { ...fontPresets.xSmall },
  xSmallBold: { ...fontPresets.xSmallBold },
  xSmallSemiBold: { ...fontPresets.xSmallSemiBold },
};

export type TextPresetType = keyof typeof TextPresets;
