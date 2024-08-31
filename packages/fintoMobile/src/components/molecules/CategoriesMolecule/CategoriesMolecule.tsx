import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
interface CategoryItem {
  id: number | string;
  name: string;
}

interface CategoriesMoleculeProps {
  item: CategoryItem;
  categoriesSelectedId: number | string;
  onPress: (id: number | string) => void;
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
          borderWidth: 1,
          borderColor: '#B8BCCB',
          paddingHorizontal: mScale.base,
        },
      ]}
      onPress={() => onPress(item?.id)}>
      <TextAtom
        text={item?.name}
        preset="titleBold"
        color={colorPresets.CTA}
        style={styles.boldText}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mScale.base,
    paddingVertical: mScale.md,
  } as ViewStyle,
  boldText: {
    fontWeight: '600',
  } as TextStyle,
});
