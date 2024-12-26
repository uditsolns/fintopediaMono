import {StyleSheet, Text, View, ViewStyle, ImageStyle} from 'react-native';
import React from 'react';
import {colorPresets} from '@shared/src/theme/color';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';

interface WinnerIconProps {
  profilePhoto: any;
  rank: string | number;
  name: string;
  winnerAmount: string | number;
  style?: ViewStyle;
  style2?: ImageStyle;
}

export default function WinnerIcon({
  profilePhoto,
  rank,
  name,
  winnerAmount,
  style,
  style2,
}: WinnerIconProps) {
  return (
    <View
      style={[
        style,
        {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        },
      ]}>
      <View
        style={[
          style2,
          {
            borderColor: colorPresets.CTA,
            borderWidth: 1,
          },
        ]}>
        <ImageAtom
          sourceRequire={
            profilePhoto
              ? {uri: profilePhoto}
              : require('@shared/src/assets/img/gameWinnerLoading.png')
          }
          imageStyle={style2}
        />
      </View>
      <View
        style={{
          backgroundColor: colorPresets.CTA,
          width: moderateScale(21),
          height: moderateScale(21),
          borderRadius: moderateScale(21 / 2),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextAtom
          text={`${rank}`}
          style={{
            textAlign: 'center',
            fontWeight: '600',
            color: colorPresets.BLACK,
          }}
          preset="smallBold"
        />
      </View>
      <TextAtom
        text={name}
        style={{textAlign: 'center', fontWeight: '600', marginTop: mScale.sm}}
        preset="titleBold"
      />
      <TextAtom
        text={`₹ ${winnerAmount}`}
        style={{
          textAlign: 'center',
          fontWeight: '600',
          color: colorPresets.SECONDARY,
        }}
        preset="smallBold"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
