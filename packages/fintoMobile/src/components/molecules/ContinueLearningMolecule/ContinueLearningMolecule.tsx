import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import ImageAtom from '@src/components/Image/ImageAtom';
import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { moderateScale, mScale, WINDOW_WIDTH } from '@shared/src/theme/metrics';

interface ContinueLearningMoleculeProps {
  item: {
    id: number | string;
    title: string;
    description: string;
  };
  onPress: () => void;
}

export default function ContinueLearningMolecule({
  item,
  onPress,
}: ContinueLearningMoleculeProps) {
  return (
    <Pressable style={[commonStyle.flexStart, styles.container]} onPress={onPress}>
      <ImageAtom
        sourceRequire={require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <TextAtom
          text={'Introduction to Option Trading'}
          preset="medium"
          color={colorPresets.GRAY}
          style={styles.boldText}
          numberOfLines={3}
        />
        <TextAtom
          text="Module 01. Understanding Future & Options"
          preset="titleBold"
          color={colorPresets.CTA}
          numberOfLines={3}
          style={{ marginTop: mScale.md }}
        />
        <View style={[commonStyle.flexStart, { marginTop: mScale.lg }]}>
          <TextAtom
            text={'Lecture'}
            preset="medium"
            color={colorPresets.GRAY}
            style={styles.boldText}
          />
          <TextAtom
            text={'\u2B24'}
            preset="titleBold"
            color={colorPresets.GRAY}
            style={[styles.boldText, { marginStart: mScale.md }]}
          />
          <TextAtom
            text={'12 Minutes'}
            preset="medium"
            color={colorPresets.GRAY}
            style={[styles.boldText, { marginStart: mScale.md }]}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    width: WINDOW_WIDTH * 0.92,
    alignSelf: 'center',
  } as ViewStyle,
  image: {
    width: moderateScale(139),
    height: moderateScale(141),
    marginLeft: -5,
  } as ImageStyle,
  content: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: mScale.md,
    paddingTop: mScale.base,
  } as ViewStyle,
  boldText: {
    fontWeight: '400',
  } as TextStyle,
});
