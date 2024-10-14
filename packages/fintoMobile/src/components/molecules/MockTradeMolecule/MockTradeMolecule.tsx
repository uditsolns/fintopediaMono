import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';

interface MockTradeMoleculeProps {
  item?: any;
  onBuyStcok?: () => void;
}
export default function MockTradeMolecule({item, onBuyStcok}: MockTradeMoleculeProps) {
  return (
    <Pressable style={[commonStyle.flexSpaceBetween, {width: '100%',flex: 1}]} onPress={onBuyStcok}>
      <View style={[commonStyle.flexStart, {width: '60%', columnGap: 10}]}>
        <ImageAtom
          imageStyle={{
            width: mScale.lg1,
            height: mScale.lg1,
            backgroundColor: colorPresets.GRAY,
          }}
        />
        <TextAtom
          text={'Bajaj Finance Stock'}
          preset="smallBold"
          style={{fontWeight: '600'}}
        />
      </View>
      <View style={[commonStyle.flexSpaceBetween]}>
        <TextAtom
          text={`₹ 10000`}
          preset="smallBold"
          style={{fontWeight: '500'}}
        />
      </View>
    </Pressable>
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
