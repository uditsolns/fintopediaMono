import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {imageUrl} from '@shared/src/config/imageUrl';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import ProgressBar from '@src/components/ProgressBar';
import {RatingAtom} from '@src/components/RatingAtom';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle, ImageStyle} from 'react-native';

interface CartMoleculeProps {
  item?: CoursesResponse | null;
  onPress?: () => void;
  onSaveLater?: () => void;
  onRemove?: () => void;
  saveForLaterBoolean?: boolean;
}

export default function CartMolecule({
  item,
  onPress,
  onSaveLater,
  onRemove,
  saveForLaterBoolean = true,
}: CartMoleculeProps) {
  const {courses_save_later} = useAppSelector(state => state.coursesSaveLater);

  return (
    <Pressable
      style={[commonStyle.flexStart, styles.container]}
      onPress={onPress}>
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
        <View style={[commonStyle.flexSpaceBetween]}>
          <TextAtom
            text={item?.name}
            preset="titleBold"
            style={styles.boldText}
            numberOfLines={3}
          />
          <View style={[commonStyle.flexSpaceBetween]}>
            <TextAtom text={`₹ ${item?.sale_price || 0}`} preset="titleBold" />
            {/* <TextAtom
              style={{
                paddingStart: mScale.xs,
                textDecorationLine: 'line-through',
                color: colorPresets.GRAY2,
              }}
              text={`₹ ${item?.actual_price || 0}`}
              preset="xSmallBold"
            /> */}
          </View>
        </View>

        <ProgressBar
          level={item?.course_type?.toLowerCase() || 'intermediate'}
          hours={item?.duration_time ? item?.duration_time?.replace(/\D+/g, '') : '0'}
          mv={mScale.md3}
          textPreset="smallBold"
          imageStyle={{
            width: mScale.md2,
            height: mScale.md2,
          }}
        />

        {item?.rating ? (
          <View style={{marginTop: mScale.md}}>
            <RatingAtom
              ratingTitle={item?.rating ? `${item?.rating}` : ''}
              direction={true}
            />
          </View>
        ) : null}
        <View style={[commonStyle.flexStart, {marginTop: mScale.base}]}>
          {saveForLaterBoolean ? (
            courses_save_later?.some(el => el?.course_id == item?.id) ? null : (
              <Pressable style={{marginEnd: mScale.base}} onPress={onSaveLater}>
                <TextAtom
                  text={'Save for later'}
                  preset="smallBold"
                  style={[commonStyle.underline, {color: colorPresets.PRIMARY}]}
                />
              </Pressable>
            )
          ) : null}
          <Pressable onPress={onRemove}>
            <TextAtom
              text={'Remove'}
              preset="smallBold"
              style={[commonStyle.underline, {color: colorPresets.TERTIARY}]}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
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
    padding: mScale.md,
  } as ViewStyle,
  image: {
    width: moderateScale(115),
    height: moderateScale(123),
    borderRadius: 5,
    overflow: 'hidden',
  } as ImageStyle,
  content: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'flex-start',
    paddingStart: mScale.base,
    paddingVertical: mScale.base,
    paddingRight: mScale.sm,
  } as ViewStyle,
  boldText: {
    fontWeight: '400',
  },
});
