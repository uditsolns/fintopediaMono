import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TransactionsResponse} from '@shared/src/utils/types/transactions';
import {RoundLevelResponse} from '@shared/src/utils/types/roundLevel';

interface PortfolioMoleculeProps {
  item?: TransactionsResponse;
  onSellStcok?: () => void;
  filterRoundLevel?: RoundLevelResponse | null;
}
export default function PortfolioMolecule({
  item,
  onSellStcok,
  filterRoundLevel,
}: PortfolioMoleculeProps) {
  const filterOrderQty = item?.user?.user_transactions?.find(
    el => el?.stock_id == item?.stock_id,
  );
  const stock_filter_amount = item?.stock?.stock_datas!.find(e3 => {
    return (
      e3?.game_id == filterRoundLevel?.game_id &&
      e3?.round_level == filterRoundLevel?.round_level
    );
  });
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
          numberOfLines={1}
        />
      </View>
      <View style={[commonStyle.flexSpaceBetween, {width: '65%'}]}>
        <TextAtom
          text={`${filterOrderQty?.order_qty}`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(50)}}
          numberOfLines={1}
        />
        <TextAtom
          text={`₹ ${
            item?.stock_current_price ? item?.stock_current_price : 0
          }`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(70)}}
          numberOfLines={1}
        />
        <TextAtom
          text={`₹ ${
            stock_filter_amount ? stock_filter_amount?.stock_current_price : 0
          }`}
          preset="smallBold"
          style={{fontWeight: '500', width: moderateScale(70)}}
          numberOfLines={1}
        />
        <TouchableOpacity style={styles.btn} onPress={onSellStcok}>
          <TextAtom text="Sell" preset="smallBold" />
        </TouchableOpacity>
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
    backgroundColor: colorPresets.TERTIARY,
    paddingVertical: mScale.xs,
    paddingHorizontal: mScale.sm,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
