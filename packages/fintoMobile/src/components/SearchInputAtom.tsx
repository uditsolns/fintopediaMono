import {
  Platform,
  Pressable,
  View,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import * as React from 'react';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';

interface SearchInputAtomProps extends TextInputProps {
  placeholderTitle?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isRefreshIconVisible?: boolean;
  onPress?: () => void;
}

export default function SearchInputAtom({
  placeholderTitle = 'Search...',
  value,
  onChangeText,
  isRefreshIconVisible = false,
  onPress,
  ...rest
}: SearchInputAtomProps) {
  return (
    <View style={[commonStyle.flexSpaceBetween]}>
      <View style={[{width: isRefreshIconVisible ? '90%' : '100%'}]}>
        <InputAtom
          shape="square"
          placeholder={placeholderTitle}
          value={value}
          onChangeText={onChangeText}
          rightIcon={<Images.SVG.Search width={24} />}
        />
      </View>
      {isRefreshIconVisible && (
        <Pressable onPress={onPress}>
          <Images.SVG.Refresh width={24} />
        </Pressable>
      )}
    </View>
  );
}
