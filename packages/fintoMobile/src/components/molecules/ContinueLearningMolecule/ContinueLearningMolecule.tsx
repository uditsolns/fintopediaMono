import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import ImageAtom from '@src/components/Image/ImageAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {imageUrl} from '@shared/src/config/imageUrl';
import { OngoingCoursesResponse } from '@shared/src/utils/types/ongoing-course';

interface ContinueLearningMoleculeProps {
  item: OngoingCoursesResponse;
  onPress?: () => void;
}

export default function ContinueLearningMolecule({
  item,
  onPress,
}: ContinueLearningMoleculeProps) {
  return (
    <Pressable
      style={[commonStyle.flexStart, styles.container]}
      onPress={onPress}>
      <ImageAtom
        sourceRequire={
          item?.course?.course_image
            ? {uri: `${imageUrl}/uploads/course_images/${item?.course?.course_image}`}
            : require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')
        }
        style={styles.image}
        resizeMode='stretch'
      />
      <View style={styles.content}>
        <TextAtom
          text={item?.course?.name || ''}
          preset="medium"
          style={[styles.boldText, {color: colorPresets.GRAY}]}
          numberOfLines={3}
        />
        <TextAtom
          text={item?.courses_section?.section_heading || ''}
          preset="titleBold"
          numberOfLines={3}
          style={{marginTop: mScale.md}}
        />
        {item?.courses_section?.section_time ? 
        <View style={[commonStyle.flexStart, {marginTop: mScale.lg}]}>
          <TextAtom
            text={'Lecture'}
            preset="medium"
            style={[styles.boldText, {color: colorPresets.GRAY}]}
          />
          <TextAtom
            text={'\u2B24'}
            preset="titleBold"
            style={[
              styles.boldText,
              {marginStart: mScale.md, color: colorPresets.GRAY},
            ]}
          />
          <TextAtom
            text={item?.courses_section?.section_time || ""}
            preset="medium"
            style={[
              styles.boldText,
              {marginStart: mScale.md, color: colorPresets.GRAY},
            ]}
          />
        </View> : null }
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
