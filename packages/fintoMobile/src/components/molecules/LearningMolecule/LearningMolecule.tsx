import {Pressable, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {commonStyle} from '@shared/src/commonStyle';
import {colorPresets} from '@shared/src/theme/color';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {Images} from '@shared/src/assets';

interface LearningMoleculeProps {
  item?: any;
  itemWidth?: string | boolean;
}

export default function LearningMolecule({
  item,
  itemWidth,
}: LearningMoleculeProps) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: itemWidth ? WINDOW_WIDTH * 0.7 : undefined,
        },
      ]}>
      <View style={styles.content}>
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
            <TextAtom text={'Priyam Sharma'} preset="titleBold" />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {[...Array(5)].map((_, index) => (
                <View>
                  <Images.SVG.Star1 />
                </View>
              ))}
            </View>
          </View>
        </View>
        <TextAtom
          text="Online learning has completely transformed my educational experience."
          preset="medium"
          style={[styles.boldText,{color:colorPresets.GRAY}]}
        />
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
  content: {
    flex: 1,
    paddingVertical: mScale.md,
    flexGrow: 1,
  },
  boldText: {
    fontWeight: '600',
  },
});
