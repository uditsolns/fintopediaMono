import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import { commonStyle } from '@shared/src/commonStyle';
import { Images } from '@shared/src/assets';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';

export default function PdfMolecule({item, onPress}:{item?:any,onPress?:()=>void}) {
  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <View style={[commonStyle.flexSpaceBetween]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <ImageButtonAtom2
              tintColor={colorPresets.WHITE}
              sourceRequire={require('../../../assets/images/fe_document.png')}
              style={{width: moderateScale(25), height: moderateScale(25)}}
            /> */}
            <View>
              <Images.SVG.Certificate />
            </View>
            <Pressable
              style={{
                backgroundColor: '#76D651',
                alignSelf: 'flex-start',
                padding: mScale.xs,
                borderRadius: 7.5,
                marginStart: mScale.md,
              }}>
              <TextAtom text={'Checked'} preset="xSmallBold" />
            </Pressable>
          </View>
          <Pressable>
            <Images.SVG.DotHorizontal />
          </Pressable>
        </View>
        <TextAtom
          text={'Money Market.pdf'}
          preset="heading4"
          color={colorPresets.CTA}
          style={[styles.boldText, {marginTop: mScale.base}]}
          numberOfLines={2}
        />
        <TextAtom
          text={`Sat, Apr 20  \u2B24  7.5 MB`}
          preset="medium"
          color={colorPresets.GRAY}
          style={{fontWeight: '400', marginVertical: mScale.md}}
          numberOfLines={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: mScale.lg2,
    overflow: 'hidden',
    backgroundColor: '#222431',
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
  },
  image: {
    width: moderateScale(115),
    height: moderateScale(133),
  },
  content: {flex: 1},
  boldText: {
    fontWeight: '500',
  },
});
