import { commonStyle } from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import React from 'react';
import {ImageStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
interface NotificationsMoleculeInterface {}

export const NotificationsMolecule: React.FC<
  NotificationsMoleculeInterface
> = () => {
  return (
    <View
      style={[
        commonStyle.flexStart,
        {
          flex: 1,
          backgroundColor: '#111521',
          height: moderateScale(73),
          borderWidth: 1,
          borderColor: colorPresets.GRAY3,
          borderRadius: 8,
          overflow: 'hidden',
        },
      ]}>
      <View
        style={[
          commonStyle.flexCenter,
          {
            padding: mScale.base,
            backgroundColor: colorPresets.BG,
            width: moderateScale(80),
            height: moderateScale(73),
          },
        ]}>
        <ImageAtom
          sourceRequire={{
            uri: 'https://cdn-icons-png.flaticon.com/128/646/646094.png',
          }}
          imageStyle={{width: mScale.lg2, height: mScale.lg2} as ImageStyle}
          tintColor={colorPresets.CTA}
        />
      </View>
      <View
        style={[commonStyle.flexSpaceBetween, {flex: 1, padding: mScale.base}]}>
        <View style={{flex: 1,alignSelf:'flex-start'}}>
          <TextAtom text={'Flash Sale upto 30% Off'} preset="medium" />
          <TextAtom
            text={'Create screens directly in Method.'}
            preset="xSmall"
            color={'#C8C8CC'}
            numberOfLines={2}
          />
        </View>
        <TouchableOpacity style={{marginLeft:10}}>
          <TextAtom
            text={'Start Course'}
            style={[commonStyle.underline, {}]}
            preset="small"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
