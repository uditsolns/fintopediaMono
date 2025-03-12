import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {imageUrl} from '@shared/src/config/imageUrl';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {isInCart} from '@src/components/Calculate';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import {StyleSheet, View, ViewStyle, ImageStyle} from 'react-native';

interface CourseMoleculeProps {
  item?: CoursesResponse;
  onPress?: () => void;
}

export default function CourseMolecule({item, onPress}: CourseMoleculeProps) {
  const {courseCart} = useAppSelector(state => state.courseCart);
  return (
    <View style={[commonStyle.flexStart, styles.container]}>
      <ImageAtom
        sourceRequire={
          item?.course_image
            ? {uri: `${imageUrl}/uploads/course_images/${item?.course_image}`}
            : require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')
        }
        imageStyle={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <TextAtom
          text={item?.name  || ''}
          preset="titleBold"
          numberOfLines={3}
          style={{marginTop: mScale.md,fontWeight:'600'}}
        />
        <View style={{marginVertical:mScale.md2}}>
          <ProgressBar
            level={item?.course_type?.toLowerCase() || 'intermediate'}
            hours={item?.duration_time?.replace(/\D+/g, "") || ''}
            mv={mScale.md}
            textPreset="smallBold"
            imageStyle={{
              width: mScale.md,
              height: mScale.md,
            }}
          />
        </View>
        {item?.rating ? (
          <RatingReview
            rating={item?.rating || ''}
            review={item?.reviews || ''}
          />
        ) : null}

        <View style={[commonStyle.flexSpaceBetween]}>
          <View style={[commonStyle.flexSpaceBetween]}>
            <TextAtom text={`₹ ${item?.sale_price || 0}`} preset="titleBold" />
            <TextAtom
              style={{
                paddingStart: mScale.xs,
                textDecorationLine: 'line-through',
                color: colorPresets.GRAY2,
              }}
              text={`₹ ${item?.actual_price || 0}`}
              preset="smallBold"
            />
          </View>
          <ButtonAtom
            title={
              isInCart(courseCart, item?.id!) ? 'Go to cart' : 'Add to cart'
            }
            textPreset="xSmallBold"
            onPress={onPress}
            style={{
              backgroundColor: colorPresets.CTA,
              width: moderateScale(115),
              borderRadius: 4,
              paddingVertical: mScale.md,
              paddingHorizontal: mScale.lg1,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#111521',
    padding:mScale.md2
  } as ViewStyle,
  image: {
    width: moderateScale(115),
    height: moderateScale(123),
    borderRadius:4,
    overflow:'hidden'
  } as ImageStyle,
  content: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'flex-start',
    paddingStart: mScale.base,
    paddingEnd: mScale.xs,
  } as ViewStyle,
  boldText: {
    fontWeight: '400',
  } as ViewStyle,
});
