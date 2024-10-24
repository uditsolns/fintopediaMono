import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {imageUrl} from '@shared/src/config/imageUrl';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import { CoursesResponse } from '@shared/src/utils/types/courses';
import { UserCourseHistoryResponse } from '@shared/src/utils/types/UserCourseHistory';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import {StyleSheet, View, ViewStyle, ImageStyle} from 'react-native';

interface MyCourseMoleculeProps {
  item?: CoursesResponse | null;
  onPress?: () => void;
}

export default function MyCourseMolecule({
  item,
  onPress,
}: MyCourseMoleculeProps) {
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
          text={item?.name || ''}
          preset="titleBold"
          numberOfLines={3}
          style={{marginTop: mScale.md}}
        />
        <ProgressBar
          level={item?.course_type?.toLowerCase() || 'intermediate'}
          hours={item?.duration_time || ''}
          mv={mScale.md}
          textPreset="xSmall"
          imageStyle={{
            width: mScale.md,
            height: mScale.md,
          }}
        />
        {item?.rating ? (
          <RatingReview
            rating={item?.rating || ''}
            review={item?.reviews || ''}
          />
        ) : null}

        <ButtonAtom
          title={'Start course'}
          preset="primary"
          onPress={onPress}
        />
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
