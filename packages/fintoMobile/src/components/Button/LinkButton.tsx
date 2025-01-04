import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';
import {colorPresets} from '@shared/src/theme/color';
import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
interface LinkButtonProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
  linkColor?: string;
  preset?: TextPresetType;
  onPress?: () => void;
  loading?: boolean;
}
export const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  style,
  linkColor = colorPresets.PRIMARY,
  preset = 'title',
  loading = false,
  onPress,
  ...rest
}) => {
  return (
    <Pressable style={[style, {zIndex: 1}]} {...rest} onPress={onPress} disabled={loading}>
      <TextAtom
        text={text}
        preset={preset}
        style={{textDecorationLine: 'underline', color: linkColor}}
      />
    </Pressable>
  );
};
