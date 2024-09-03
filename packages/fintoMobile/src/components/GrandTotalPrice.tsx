import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import {Pressable, View} from 'react-native';
interface GrandTotalPriceProps {
  itemCount?: number | undefined | null;
  price?: number | string;
  discount_price?: number | string;
  btnTitle?: string;
  onPress?: () => void;
}
export const GrandTotalPrice: React.FunctionComponent<GrandTotalPriceProps> = ({
  itemCount,
  price,
  discount_price,
  btnTitle,
  onPress,
}) => {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {
          paddingHorizontal: mScale.base,
          paddingVertical: mScale.lg,
          borderTopWidth: 1,
          borderColor: colorPresets.GRAY3,
        },
      ]}>
      <View>
        <TextAtom
          text={`Grand total (${itemCount} items)`}
          preset="medium"
          style={{marginBottom:mScale.xxs,color:'#B5B5B5'}}
        />
        <View style={[commonStyle.flexStart, {}]}>
          <TextAtom
            text={`₹ ${price}`}
            preset="heading3"
            style={{marginEnd: mScale.md}}
          />
          <TextAtom
            text={`₹ ${discount_price}`}
            preset="medium"
            style={{textDecorationLine: 'line-through',color:'#6D6D75'}}
          />
        </View>
      </View>
      {/* <SmallButtonAtom
        btnTitle={btnTitle}
        preset={'mediumBold'}
        color={'#0C0C0C'}
        style={{width: moderateScale(150)}}
        onPress={onPress}
      /> */}
      <Pressable onPress={onPress}>
        <TextAtom text={btnTitle} />
      </Pressable>
    </View>
  );
};
