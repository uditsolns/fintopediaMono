import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';

export default function PreviousRoundMolecule({item}: {item: any}) {
  return (
    <View style={[commonStyle.flexSpaceBetween, {width: '100%'}]}>
      <View
        style={[commonStyle.flexStart, {columnGap: 10, marginEnd: mScale.md}]}>
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
          style={{fontWeight: '600'}}
          numberOfLines={2}
        />
      </View>
      <View style={[commonStyle.flexSpaceBetween]}>
        <TextAtom
          text={`₹ 20,000`}
          preset="smallBold"
          style={{fontWeight: '500'}}
          numberOfLines={1}
        />
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
});
