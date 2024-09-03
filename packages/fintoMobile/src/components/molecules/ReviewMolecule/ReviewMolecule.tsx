import {Pressable, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';

export default function ReviewMolecule({
  item,
  itemWidth,
}: {
  item?: any;
  itemWidth?: string | number;
}) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: itemWidth ? WINDOW_WIDTH * 0.7 : undefined,
        },
      ]}>
      <View style={styles.content}>
        <TextAtom
          text={'Access to Quality Education'}
          preset="titleBold"
          style={styles.boldText}
        />
        <TextAtom
          text="Online learning has completely transformed my educational experience. The flexibility to attend classes and complete assignments on my own schedule has been a game-changer for me. It's allowed me to balance my job and family commitments while pursuing my degree. I'm so grateful for the opportunity to learn this way!"
          preset="medium"
          style={[styles.boldText,{color:colorPresets.GRAY}]}
        />
        <View style={[commonStyle.flexStart, {marginVertical: mScale.md}]}>
          <View
            style={{
              width: moderateScale(52),
              height: moderateScale(52),
              borderRadius: 50,
              backgroundColor: colorPresets.CTA,
            }}>
            <ImageAtom
              sourceRequire={item?.sourceRequire}
              imageStyle={{width: moderateScale(52), height: moderateScale(52)}}
            />
          </View>
          <View style={{marginStart: mScale.base, flex: 1}}>
            <TextAtom text={'Priyam Sharma'} preset="smallBold" />
            <TextAtom
              text={'Product Advisor'}
              preset="medium"
              style={{color:'#D5D5D9'}}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    columnGap: mScale.base,
    borderRightWidth: 1,
    borderBottomWidth: 0.75,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderColor: '#7A7FA2',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colorPresets.TEXT,
    padding: mScale.base,
  },

  content: {flex: 1, paddingVertical: mScale.md, flexGrow: 1},
  boldText: {
    fontWeight: '600',
  },
});
