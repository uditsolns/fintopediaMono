import {TextPresets} from '@shared/src/components/atoms/Text/TextPresets';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {View, TextInput, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import GradientBorderBox from '../Border/GradientBorderBox';

interface TextInputBoxProps {
  style?: ViewStyle;
  textInputStyle?: TextStyle;
  maxLength?: number;
  onChange?: (values: string[]) => void;
  otp?:string | any;
}

const TextInputBox: React.FC<TextInputBoxProps> = ({
  style,
  textInputStyle,
  maxLength = 1,
  otp,
  onChange,
}) => {
  const [values, setValues] = React.useState<string[]>(Array(6).fill(''));
  const inputRefs = React.useRef<(TextInput | null)[]>([]);
  React.useEffect(() => {
    try {
      if (otp) {
        const otpArray = otp?.split('');
        setValues(otpArray);
        if (onChange) {
          onChange(otpArray);
        }
      }
    } catch (error) {}
  }, [otp]);

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
    if (value.length === maxLength && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      const newValues = [...values];
      if (values[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
        newValues[index - 1] = ''; // Clear the previous input value
      }
      setValues(newValues);
      if (onChange) {
        onChange(newValues);
      }
    }
  };

  const renderTextInput = (index: number) => (
    <GradientBorderBox width={moderateScale(43)} borderRadium={6} >
      <TextInput
        key={index}
        ref={ref => (inputRefs.current[index] = ref)}
        maxLength={maxLength}
        keyboardType="numeric"
        placeholderTextColor={colorPresets.CTA}
        style={[styles.textInput, textInputStyle]}
        value={values[index]}
        onChangeText={value => handleInputChange(index, value)}
        onKeyPress={event => handleKeyPress(index, event)}
        selectTextOnFocus={true}
      />
    </GradientBorderBox>
  );

  return (
    <View style={[styles.container, style]}>
      {Array.from({length: 3}).map((_, i) => renderTextInput(i))}
      <View style={styles.divider} />
      {Array.from({length: 3}).map((_, i) => renderTextInput(i + 3))}
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
    borderRadius: 6,
    // borderColor: colorPresets.GRAY3,
    // borderWidth: 1,
    color: colorPresets.CTA,
  },
  divider: {
    height: 2,
    width: 5,
    backgroundColor: colorPresets.CTA,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mScale.md,
  },
});

export default TextInputBox;
