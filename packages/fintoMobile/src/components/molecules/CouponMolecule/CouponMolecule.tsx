import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {CouponCodeResponse} from '@shared/src/utils/types/coupon-code';
import GradientBorderBox from '@src/components/Border/GradientBorderBox';
import {formatDateMonth} from '@src/components/Calculate';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

interface CouponMoleculeProps {
  item?: CouponCodeResponse;
  onPress?: () => void;
}

export default function CouponMolecule({item, onPress}: CouponMoleculeProps) {
  let formatDate = formatDateMonth(`${item?.expiry_date}`);
  return (
    <GradientBorderBox linearColor={['#121622', '#121622']}>
      <View style={[styles.container]}>
        <View style={styles.content}>
          <View style={[commonStyle.flexSpaceBetween]}>
            <Images.SVG.DiscountIcon />
            <TextAtom
              text={`Valid till ${formatDate}`}
              preset="small"
              style={{fontWeight: '400'}}
              numberOfLines={2}
            />
          </View>
          <View style={{marginTop: mScale.sm}}>
            <TextAtom
              text={`Extra ${item?.discount} Off`}
              preset="heading3"
              style={{fontWeight: '500', color: '#D5D5D9'}}
              numberOfLines={2}
            />
            <TextAtom
              text={`On all ${item?.course?.name}`}
              preset="title"
              style={{
                fontWeight: '400',
                marginTop: mScale.xs,
                color: '#A2A2A2',
              }}
              numberOfLines={2}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#282A37',
              marginTop: mScale.lg1,
              marginBottom: mScale.base,
            }}
          />

          <Pressable
            style={[
              commonStyle.flexSpaceBetween,
              {
                borderRadius: 8,
                paddingHorizontal: mScale.md2,
                paddingVertical: mScale.md,
                backgroundColor: '#222431',
              },
            ]}>
            <TextAtom
              text={item?.discount_code}
              preset="heading3"
              style={{textTransform: 'uppercase'}}
            />
            <Pressable onPress={onPress}>
              <Images.SVG.CopyIcon color='white' />
            </Pressable>
          </Pressable>
        </View>
      </View>
    </GradientBorderBox>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: mScale.lg1,
    overflow: 'hidden',
  } as ViewStyle,
  content: {flex: 1} as ViewStyle,
});
