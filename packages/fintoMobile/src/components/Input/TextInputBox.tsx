import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {TextPresets} from '@shared/src/components/atoms/Text/TextPresets';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';

interface TextInputBoxProps {
  style?: ViewStyle;
  textInputStyle?: TextStyle;
  maxLength?: number;
}

const TextInputBox: React.FC<TextInputBoxProps> = ({
  style,
  textInputStyle,
  maxLength = 1,
}) => {
  const renderTextInput = () => (
    <TextInput
      maxLength={maxLength}
      keyboardType="numeric"
      placeholderTextColor={colorPresets.CTA}
      style={[styles.textInput, textInputStyle]}
    />
  );

  return (
    <View style={[styles.container, style]}>
      {renderTextInput()}
      {renderTextInput()}
      {renderTextInput()}
      <View style={styles.divider} />
      {renderTextInput()}
      {renderTextInput()}
      {renderTextInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textInput: {
    width: moderateScale(43),
    height: moderateScale(50),
    textAlign: 'center',
    flex: 0,
    fontWeight: '600',
    ...TextPresets.banner,
    padding: 0,
    zIndex: 1,
    borderRadius:6,
    borderColor: colorPresets.GRAY3,
    borderWidth: 1,
    color:colorPresets.CTA
  },
  divider: {
    height: 2,
    width: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mScale.md,
  },
});

export default TextInputBox;
