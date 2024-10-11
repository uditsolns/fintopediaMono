import { ButtonAtom } from '@shared/src/components/atoms/Button/ButtonAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { imageUrl } from '@shared/src/config/imageUrl';
import { colorPresets } from '@shared/src/theme/color';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import { CoursesResponse } from '@shared/src/utils/types/courses';
import CoursePrice from '@src/components/CoursePrice';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle, ImageStyle} from 'react-native';

interface PopularCourseMoleculeProps {
  item: CoursesResponse;
  onPress?: () => void;
}

export default function PopularCourseMolecule({
  item,
  onPress,
}: PopularCourseMoleculeProps) {
  return (
    <Pressable style={styles.activePlanDetails} onPress={onPress}>
      <View>
        <ImageAtom
          sourceRequire={
            item?.course_image
              ? {uri: `${imageUrl}/uploads/course_images/${item?.course_image}`}
              : require('@shared/src/assets/img/coursePlaceHolder.png')}
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
        <TextAtom text={item?.name} preset="heading2" />
        <ProgressBar level={'intermediate'} hours={36} />
        <RatingReview rating={4.6} review={1000} />
        <CoursePrice price={item?.sale_price} discount_price={item?.actual_price} />
        <ButtonAtom title='Add to cart' />
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
