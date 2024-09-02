import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale } from '@shared/src/theme/metrics';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface GroupRadioButtonProps {
  options?: Array<{ label: string, value: string }>;
  onSelect?: (value: string) => void;
  selectedValue?: string;
}

export const GroupRadioButton: React.FunctionComponent<GroupRadioButtonProps> = ({ 
  options, 
  onSelect, 
  selectedValue 
}) => {
  const [selected, setSelected] = useState(selectedValue || '');

  const handlePress = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <View style={[commonStyle.flexStart]}>
      <TextAtom text={'I am '} preset='titleBold' style={{ marginEnd: mScale.md }} />
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[commonStyle.flexStart, styles.optionContainer]}
          onPress={() => handlePress(option.value)}
        >
          <View style={styles.radioButton}>
            {selected === option.value && <View style={styles.radioButtonSelected} />}
          </View>
          <TextAtom style={styles.label} text={option.label} preset="titleBold" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    marginEnd: mScale.md,
    alignItems: 'center',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: colorPresets.CTA,
    width: mScale.md2,
    height: mScale.md2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colorPresets.CTA,
  },
  label: {
    marginHorizontal: mScale.sm,
  },
});

export default GroupRadioButton;
