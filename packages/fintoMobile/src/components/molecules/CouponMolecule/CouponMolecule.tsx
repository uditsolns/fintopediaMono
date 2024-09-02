import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

interface CouponMoleculeProps {
  item?: any;
  onPress?: () => void;
}

export default function CouponMolecule({item, onPress}: CouponMoleculeProps) {
  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <View style={[commonStyle.flexSpaceBetween]}>
          <Images.SVG.DiscountIcon />
          <TextAtom
            text={`Valid till 30th July`}
            preset="title"
            style={{fontWeight: '400'}}
            numberOfLines={2}
          />
        </View>
        <View style={{marginTop: mScale.base}}>
          <TextAtom
            text={'Extra 10% Off'}
            preset="heading3"
            color={'#D5D5D9'}
            style={{fontWeight: '500'}}
            numberOfLines={2}
          />
          <TextAtom
            text={'On all finance courses'}
            preset="small"
            color={'#A2A2A2'}
            style={{fontWeight: '400', marginTop: mScale.xs}}
            numberOfLines={2}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#282A37',
            marginVertical: mScale.base,
          }}
        />

        <Pressable
          style={[
            commonStyle.flexSpaceBetween,
            {
              borderRadius: 8,
              padding: mScale.md,
              backgroundColor: '#222431',
            },
          ]}>
          <TextAtom text="FIRST10" preset="heading3" />
          <Images.SVG.CopyIcon />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: mScale.lg2,
    overflow: 'hidden',
    backgroundColor: '#121622',
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
  } as ViewStyle,
  content: {flex: 1} as ViewStyle,
});
