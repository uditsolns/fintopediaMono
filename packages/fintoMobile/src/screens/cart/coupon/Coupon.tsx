import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {fontPresets} from '@shared/src/theme/typography';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import CouponMolecule from '@src/components/molecules/CouponMolecule/CouponMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import React from 'react';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';

interface CouponProps {}

export const Coupon: React.FunctionComponent<CouponProps> = () => {
  const renderItem = ({item}) => {
    return <CouponMolecule item={item} />;
  };
  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      <HeaderLeftMolecule text={'Coupon codes'} />
      <FlatList
        data={[...Array(5)]}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <View style={[commonStyle.flexSpaceBetween]}>
              <TextInput
                placeholder="Enter promo code"
                placeholderTextColor={colorPresets.CTA}
                style={{
                  color: colorPresets.CTA,
                  height: moderateScale(43),
                  flex: 1,
                  ...fontPresets.title,
                  fontWeight: '400',
                  paddingStart: mScale.base,
                  borderWidth: 1,
                  borderColor: colorPresets.GRAY3,
                  overflow: 'hidden',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: colorPresets.CTA,
                  height: moderateScale(42.5),
                  width: moderateScale(90),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  marginStart:-5
                }}>
                <TextAtom
                  text={'Apply'}
                  color={colorPresets.BLACK}
                  preset="titleBold"
                />
              </TouchableOpacity>
            </View>
            <SeparatorAtom
              marginHorizontal={0}
              style={{marginVertical: mScale.lg2}}
              bgColor={'#404251'}
            />
          </View>
        }
        contentContainerStyle={{
          rowGap: mScale.base,
          paddingBottom: mScale.base,
        }}
        showsVerticalScrollIndicator={false}
      />
    </GradientTemplate>
  );
};
