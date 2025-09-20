import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {Pressable, View} from 'react-native';
import GradientBorderBox from './Border/GradientBorderBox';
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
    <>
      <GradientBorderBox />
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {
            paddingHorizontal: mScale.base,
            paddingVertical: mScale.lg,
          },
        ]}>
        <View>
          <TextAtom
            text={`Grand total (${itemCount ?? ''} items)`}
            preset="medium"
            style={{marginBottom: mScale.xxs, color: '#B5B5B5'}}
          />
          <View style={[commonStyle.flexStart, {}]}>
            <TextAtom
              text={`₹ ${price ?? ''}`}
              preset="heading3"
              style={{marginEnd: mScale.md}}
            />
            <TextAtom
              text={`₹ ${discount_price ?? ''}`}
              preset="medium"
              style={{textDecorationLine: 'line-through', color: '#6D6D75'}}
            />
          </View>
        </View>
        <View style={{width: moderateScale(150)}}>
          <ButtonAtom title={`${btnTitle}`} onPress={onPress} />
        </View>
      </View>
    </>
  );
};
