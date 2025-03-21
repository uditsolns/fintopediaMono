import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

interface CustomCheckboxProps {
  isChecked?: boolean | string;
  onPress?: () => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  isChecked = false,
  onPress,
}) => {
  const styles = StyleSheet.create({
    container: {
      marginRight: 8,
      padding: 4,
      borderRadius: 4,
    },
    checkbox: {
      width: 25,
      height: 25,
      borderRadius: 4,
      borderWidth: isChecked ? 0 : 2,
      borderColor: colorPresets.PRIMARY,
      backgroundColor: isChecked ? colorPresets.PRIMARY : colorPresets.CTA,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.checkbox}>
        {isChecked && <Images.SVG.RightTickIcon width={15} />}
      </View>
    </TouchableOpacity>
  );
};
