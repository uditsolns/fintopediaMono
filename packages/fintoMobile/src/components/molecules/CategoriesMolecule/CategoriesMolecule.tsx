import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {CategoriesResponse} from '@shared/src/utils/types/categories';
import React from 'react';
import {Pressable, StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface CategoriesMoleculeProps {
  item: CategoriesResponse;
  categoriesSelectedId: number | string;
  onPress: (id: number) => void;
}

export default function CategoriesMolecule({
  item,
  categoriesSelectedId,
  onPress,
}: CategoriesMoleculeProps) {
  const isSelected = categoriesSelectedId === item?.id;

  return (
    <Pressable
      style={[
        styles.content,
        isSelected && {
          backgroundColor: '#545664',
          borderRadius: 4,
          borderTopWidth: 0.5,
          borderLeftWidth: 0.35,
          borderRightWidth: 1,
          borderBottomWidth: 0.4,
          borderColor: '#B8BCCB',
          paddingHorizontal: mScale.base,
        },
      ]}
      onPress={() => onPress(Number(item?.id))}>
      <TextAtom
        text={item?.category_name}
        preset="smallBold"
        style={[
          styles.boldText,
          {
            fontWeight: isSelected ? '600' : '500',
            letterSpacing: -0.12,
            color: isSelected ? colorPresets.CTA : colorPresets.GRAY,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    
  } as ViewStyle,
  boldText: {
    fontWeight: '600',
  } as TextStyle,
});
