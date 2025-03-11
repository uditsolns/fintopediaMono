import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {imageUrl} from '@shared/src/config/imageUrl';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import ButtonIconAtom from '@src/components/Button/ButtonIconAtom';
import {isInCart} from '@src/components/Calculate';
import CoursePrice from '@src/components/CoursePrice';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle, ImageStyle} from 'react-native';

interface PopularCourseMoleculeProps {
  item: CoursesResponse;
  onView?: () => void;
  onPress?: () => void;
}

export default function PopularCourseMolecule({
  item,
  onView = () => {},
  onPress = () => {},
  ...rest
}: PopularCourseMoleculeProps) {
  const {courseCart} = useAppSelector(state => state.courseCart);
  return (
    <Pressable style={styles.activePlanDetails} {...rest} onPress={onView}>
      <View>
        <ImageAtom
          sourceRequire={
            item?.course_image
              ? {uri: `${imageUrl}/uploads/course_images/${item?.course_image}`}
              : require('@shared/src/assets/img/coursePlaceHolder.png')
          }
          imageStyle={styles.image}
          resizeMode="cover"
        />
        <ButtonIconAtom
          btnTitle={`ENGLISH`}
          preset="xSmallBold"
          color={colorPresets.BLACK}
          style={{
            position: 'absolute',
            bottom: mScale.base,
            right: mScale.lg,
            backgroundColor: colorPresets.CTA,
            padding: mScale.md,
            borderRadius: mScale.xs,
          }}
          ml={mScale.xs}
          leftIcon={<Images.SVG.WorldIcon />}
          textStyle={{paddingLeft: mScale.xs}}
        />
      </View>
      <View style={styles.content}>
        <TextAtom text={item?.name} preset="heading3" style={{fontWeight:'600',lineHeight:21}} />
        <View>
          <ProgressBar
            level={
              item?.course_type
                ? item?.course_type?.toLowerCase()
                : 'intermediate'
            }
            hours={36}
            textPreset='titleBold'
          />
          {item?.rating ? (
            <View style={{marginTop:moderateScale(26)}}>
              <RatingReview
                rating={item?.rating || ''}
                review={item?.reviews || ''}
                textStyle={{paddingTop:mScale.xs}}
              />
              </View>
          ) : null}
        </View>
        <CoursePrice
          price={item?.sale_price}
          discount_price={item?.actual_price}
        />
        <ButtonAtom
          title={isInCart(courseCart, item?.id) ? 'Go to cart' : 'Add to cart'}
          onPress={onPress}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activePlanDetails: {
    borderRadius: mScale.md,
    marginTop: moderateScale(27),
    backgroundColor: '#0D0F1C',
    // width: moderateScale(251),
    overflow: 'hidden',
  } as ViewStyle,
  image: {
    width: moderateScale(251),
    height: moderateScale(151),
  } as ImageStyle,
  content: {
    paddingTop: mScale.lg1,
    paddingHorizontal:mScale.lg2,
    paddingBottom: moderateScale(32),
    backgroundColor: '#0D0F1C',
    flex: 1,
  } as ViewStyle,
  underLine: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  } as ViewStyle,
});
