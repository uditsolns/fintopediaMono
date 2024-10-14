import { StyleSheet, Text, View, ViewStyle, ImageStyle } from 'react-native';
import React from 'react';
import { commonStyle } from '@shared/src/commonStyle';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';

interface WinnerListAtomProps {
  profilePhoto: any; // Consider refining this type, e.g., ImageSourcePropType
  rank: string | number;
  name: string;
  winnerAmount: string | number;
  style?: ViewStyle;
}

export default function WinnerListAtom({
  profilePhoto,
  rank,
  name,
  winnerAmount,
  style,
}: WinnerListAtomProps) {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        { width: '100%', marginBottom: mScale.base },
      ]}
    >
      <View style={[commonStyle.flexSpaceBetween, { width: '45%' }]}>
        <TextAtom text={`${rank}`} preset="heading4" style={{ fontWeight: '600' }} />
        <View
          style={{
            width: moderateScale(36),
            height: moderateScale(36),
            borderRadius: moderateScale(36 / 2),
            borderColor: colorPresets.CTA,
            borderWidth: 1,
          }}
        >
          <ImageAtom
            sourceRequire={profilePhoto}
            imageStyle={{
              width: moderateScale(36),
              height: moderateScale(36),
              borderRadius: moderateScale(36 / 2),
            }}
          />
        </View>
        <TextAtom text={name} preset="titleBold" style={{ fontWeight: '600' }} />
      </View>
      <View>
        <TextAtom
          text={`₹ ${winnerAmount}`}
          style={{ textAlign: 'center', fontWeight: '600',color:colorPresets.SECONDARY }}
          preset="titleBold"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
