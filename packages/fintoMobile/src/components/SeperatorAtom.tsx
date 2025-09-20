import { colorPresets } from '@shared/src/theme/color';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SeparatorAtomProps {
  height?: number;
  marginHorizontal?: number;
  style?: ViewStyle;
  bgColor?: string;
}

const SeparatorAtom: React.FC<SeparatorAtomProps> = ({
  height = 1,
  marginHorizontal = mScale.base,
  style,
  bgColor = colorPresets.GRAY,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: bgColor ? bgColor : colorPresets.GRAY,
          height: height,
          marginHorizontal: marginHorizontal,
        } as ViewStyle,
        style,
      ]}
    />
  );
};

export default SeparatorAtom;
