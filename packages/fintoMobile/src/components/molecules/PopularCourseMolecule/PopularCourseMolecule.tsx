import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import CoursePrice from '@src/components/CoursePrice';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle, ImageStyle} from 'react-native';

interface PopularCourseMoleculeProps {
  item?:any;
  onPress?: () => void;
}

export default function PopularCourseMolecule({
  onPress,
}: PopularCourseMoleculeProps) {
  return (
    <Pressable style={styles.activePlanDetails} onPress={onPress}>
      <View>
        <ImageAtom
          sourceRequire={require('@shared/src/assets/img/coursePlaceHolder.png')}
          imageStyle={styles.image}
          resizeMode="contain"
        />
        {/* <ButtonImageLeftAtom
          sourceRequire={require('../../../assets/images/languages.png')}
          preset={'smallBoldTitle'}
          btnTitle={'ENGLISH'}
          color={'#40474F'}
          fontWeight={'600'}
          style={{position: 'absolute', bottom: mScale.base, right: mScale.lg}}
        /> */}
      </View>
      <View style={styles.content}>
        <TextAtom text={'Basics of Stock Market'} preset="heading2" />
        <ProgressBar level={'intermediate'} hours={36} />
        <RatingReview rating={4.6} review={1000} />
        <CoursePrice price={'2,999'} discount_price={'1,888'} />
        {/* <SmallButtonAtom
          btnTitle={'Add to cart'}
          color={'#0C0C0C'}
          preset={'smallBold'}
        /> */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activePlanDetails: {
    borderRadius: 10,
    marginTop: mScale.base,
    backgroundColor: '#121622',
    width: moderateScale(251),
    overflow: 'hidden',
  } as ViewStyle,
  image: {
    width: moderateScale(251),
    height: moderateScale(151),
  } as ImageStyle,
  content: {
    paddingHorizontal: mScale.md3,
    paddingVertical: mScale.lg,
    backgroundColor: '#0D0F1C',
    flex: 1,
  } as ViewStyle,
  underLine: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  } as ViewStyle,
});
