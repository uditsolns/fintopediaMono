import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {ActivityIndicator, View, ViewStyle} from 'react-native';

interface LoaderAtomProps {
  color?: string;
  size?: number | 'small' | 'large';
}

const LoaderAtom: React.FC<LoaderAtomProps> = ({
  color = colorPresets.CTA,
  size = 'small',
}) => {
  return (
    <View style={{paddingVertical: mScale.base, flex: 1} as ViewStyle}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

export default LoaderAtom;
