import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TransactionsResponse} from '@shared/src/utils/types/transactions';

export default function HistoryMolecule({item}: {item: TransactionsResponse}) {
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
          text={item?.stock?.name}
          preset="smallBold"
          style={{fontWeight: '600', width: moderateScale(86)}}
          numberOfLines={2}
        />
      </View>
      <View style={[commonStyle.flexSpaceBetween, {width: '65%'}]}>
        <TextAtom
          text={`${item?.order_qty ? item?.order_qty : 0}`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(50)}}
          numberOfLines={1}
        />
        <TextAtom
          text={`₹ ${item?.total_price ? item?.total_price : 0}`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(70)}}
          numberOfLines={1}
        />
        <View>
          <View
            style={[
              styles.btn,
              {
                backgroundColor:
                  item?.order_type?.toLowerCase() == 'buy'
                    ? '#76D6514D'
                    : '#FF4D004D',
              },
            ]}>
            <TextAtom
              text={item?.order_type}
              preset="smallBold"
              style={{
                color:
                  item?.order_type?.toLowerCase() == 'buy'
                    ? '#76D651'
                    : '#FF4D00',
              }}
            />
          </View>
        </View>
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
    paddingVertical: mScale.md,
    paddingHorizontal: mScale.md,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
