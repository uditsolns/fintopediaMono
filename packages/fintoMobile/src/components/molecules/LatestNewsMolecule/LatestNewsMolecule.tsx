import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import * as React from 'react';
import { mScale, WINDOW_WIDTH } from '@shared/src/theme/metrics';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
interface LatestNewsMoleculeProps {
  item: any; 
  itemWidth?: boolean | string; 
}

export default function LatestNewsMolecule({ item, itemWidth }: LatestNewsMoleculeProps) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: itemWidth ? WINDOW_WIDTH * 0.5 : undefined,
        },
      ]}
    >
      <View style={styles.content}>
        <TextAtom
          text={'BSE Sensex recently hit a record high of 79,856'}
          preset="titleBold"
          style={styles.boldText}
        />
        <TextAtom
          text="Build your financial through project-driven skills"
          preset="medium"
          style={[styles.boldText, { color: colorPresets.GRAY }]}
          numberOfLines={3}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    columnGap: mScale.base,
    borderRightWidth: 1,
    borderBottomWidth: 0.75,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderColor: colorPresets.GRAY3,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colorPresets.TEXT,
    padding: mScale.base,
  },

  content: { flex: 1, paddingVertical: mScale.md },
  boldText: {
    fontWeight: '600',
  },
});
