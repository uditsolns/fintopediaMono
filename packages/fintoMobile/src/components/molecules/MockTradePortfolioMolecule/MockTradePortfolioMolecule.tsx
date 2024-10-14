import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';

interface MockPortfolioMoleculeProps {
  item?: any;
  onSellStcok?: () => void;
}
export default function MockPortfolioMolecule({
  item,
  onSellStcok,
}: MockPortfolioMoleculeProps) {
  return (
    <View style={[commonStyle.flexSpaceBetween, {width: '100%'}]}>
      <View
        style={[
          commonStyle.flexStart,
          {width: '30%', columnGap: 10, marginEnd: mScale.md},
        ]}>
        <ImageAtom
          imageStyle={{
            width: mScale.lg1,
            height: mScale.lg1,
            backgroundColor: colorPresets.GRAY,
          }}
        />
        <TextAtom
          text={'Bajaj Finance Stock'}
          preset="smallBold"
          style={{fontWeight: '600', width: moderateScale(86)}}
          numberOfLines={2}
        />
      </View>
      <View style={[commonStyle.flexSpaceBetween, {width: '65%'}]}>
        <TextAtom
          text={`10000`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(50)}}
          numberOfLines={1}
        />
        <TextAtom
          text={`₹ 20,000`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(70)}}
          numberOfLines={1}
        />
        <TextAtom
          text={`₹ 15,000`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(70)}}
          numberOfLines={1}
        />
        <TouchableOpacity style={styles.btn} onPress={onSellStcok}>
          <TextAtom text="Sell" preset="smallBold" />
        </TouchableOpacity>
      </View>
    </View>
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
  btn: {
    backgroundColor: colorPresets.TERTIARY,
    paddingVertical: mScale.xs,
    paddingHorizontal: mScale.sm,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
