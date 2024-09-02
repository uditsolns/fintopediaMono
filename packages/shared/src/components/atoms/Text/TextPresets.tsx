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
  bodyBold: { ...fontPresets.bodyBold },
  medium: { ...fontPresets.medium },
  small: { ...fontPresets.small },
  xSmall: { ...fontPresets.xSmall },
  title: { ...fontPresets.title },
};

export type TextPresetType = keyof typeof TextPresets;
