import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
interface StocksMoleculeProps {
  item?: any;
  selectedStockId?: string | number;
  onPress: (id: string) => void;
}
export default function StocksMolecule({
  item,
  selectedStockId,
  onPress,
}: StocksMoleculeProps) {
  const isSelected = selectedStockId === item?.id;
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
        text={'Information Technology'}
        preset="bodyBold"
        style={styles.boldText}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(50),
  },
  boldText: {
    fontWeight: '600',
  },
});
