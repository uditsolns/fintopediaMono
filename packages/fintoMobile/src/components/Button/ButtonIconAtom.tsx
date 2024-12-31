import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';
import React from 'react';
import {View, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

interface ButtonIconAtomProps {
  btnTitle: string;
  color?: string;
  preset?: TextPresetType;
  ml?: number;
  style?: ViewStyle;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  textStyle?:TextStyle
}

const ButtonIconAtom: React.FC<ButtonIconAtomProps> = ({
  btnTitle,
  color,
  preset,
  ml,
  style,
  leftIcon,
  rightIcon,
  textStyle,
}) => {
  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center', marginLeft: ml},
        style,
      ]}>
      {leftIcon && (
        <TouchableOpacity>
          <View>{leftIcon}</View>
        </TouchableOpacity>
      )}
      <TextAtom text={btnTitle || ''} preset={preset} style={[{color: color},textStyle]} />
      {rightIcon && (
        <TouchableOpacity>
          <View>{rightIcon}</View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ButtonIconAtom;
