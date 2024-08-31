import { commonStyle } from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import { StyleSheet, View, ViewStyle, ImageStyle } from 'react-native';


interface OngoingMoleculeProps {
  item?: any;
  onPress?: () => void;
}

export default function CourseMolecule({ item, onPress }: OngoingMoleculeProps) {
  return (
    <View style={[commonStyle.flexStart, styles.container]}>
      <ImageAtom
        sourceRequire={require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')}
        imageStyle={styles.image}
      />
      <View style={styles.content}>
        <TextAtom
          text="Swing Trading Basics"
          preset="titleBold"
          color={colorPresets.CTA}
          numberOfLines={3}
          style={{ marginTop: mScale.md }}
        />
        <ProgressBar
          level="intermediate"
          hours={'20'}
          mv={mScale.md}
          textPreset="xSmall"
          imageStyle={{
            width: mScale.md,
            height: mScale.md,
          }}
        />
        <RatingReview rating={'4.6'} review={'1,000'} />
        <View style={[commonStyle.flexSpaceBetween]}>
          <TextAtom text={`₹ 2,555`} preset="titleBold" />
          {/* <SmallButtonAtom
            btnTitle={'Add to cart'}
            preset={'smallBoldTitle12'}
            style={{
              paddingHorizontal: mScale.base,
              paddingVertical: mScale.sm,
            }}
          /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#111521',
  } as ViewStyle,
  image: {
    width: moderateScale(115),
    height: moderateScale(123),
  } as ImageStyle,
  content: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'flex-start',
    padding: mScale.base,
  } as ViewStyle,
  boldText: {
    fontWeight: '400',
  } as ViewStyle,
});
