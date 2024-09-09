import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';

export default function GameHeaderMolecule({...params}) {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {
          marginTop: mScale.base,
          borderBottomWidth: 0.5,
          borderColor: colorPresets.GRAY,
          paddingBottom: mScale.md,
          marginBottom: mScale.md,
          width: '100%',
        },
      ]}>
      <View style={{width: '30%'}}>
        <TextAtom
          text={params?.p1}
          preset="medium"
          style={{
            fontWeight: '500',
            width: moderateScale(86),
            color: colorPresets.GRAY,
          }}
          numberOfLines={1}
        />
      </View>
      <View style={[commonStyle.flexSpaceBetween, {width: '65%'}]}>
        <TextAtom
          text={params?.p2}
          preset="medium"
          style={{
            fontWeight: '500',
            width: moderateScale(50),
            color: colorPresets.GRAY,
          }}
        />
        <TextAtom
          text={params?.p3}
          preset="medium"
          style={{
            fontWeight: '500',
            width: moderateScale(70),
            color: colorPresets.GRAY,
          }}
        />
        <TextAtom
          text={params?.p4}
          preset="medium"
          style={{
            fontWeight: '500',
            width: moderateScale(70),
            color: colorPresets.GRAY,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
