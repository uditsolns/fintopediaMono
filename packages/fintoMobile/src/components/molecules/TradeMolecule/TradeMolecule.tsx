import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import { StockDatasResponse } from '@shared/src/utils/types/stockDatas';

interface TradeMoleculeProps {
  item?: StockDatasResponse;
  onBuyStcok?: () => void;
}
export default function TradeMolecule({item, onBuyStcok}: TradeMoleculeProps) {
  return (
    <View style={[commonStyle.flexSpaceBetween, {width: '100%'}]}>
      <View style={[commonStyle.flexStart, {width: '45%', columnGap: 10}]}>
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
          style={{fontWeight: '600'}}
        />
      </View>
      <View style={[commonStyle.flexSpaceBetween, {width: '40%'}]}>
        <TextAtom
          text={`₹ ${item?.stock_current_price}`}
          preset="smallBold"
          style={{fontWeight: '500'}}
        />

        <TouchableOpacity style={styles.btn} onPress={onBuyStcok}>
          <TextAtom text="Buy" preset="smallBold" />
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
    backgroundColor: colorPresets.SECONDARY,
    paddingVertical: mScale.xs,
    paddingHorizontal: mScale.sm,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
