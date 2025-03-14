import {StyleSheet, View} from 'react-native';
import React from 'react';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import HorizontalProgressBar from '@src/components/HorizontalProgressBar';
import {imageUrl} from '@shared/src/config/imageUrl';
import {OngoingCoursesResponse} from '@shared/src/utils/types/ongoing-course';
import { Images } from '@shared/src/assets';

interface OngoingMoleculeProps {
  item: OngoingCoursesResponse;
  onPress?: () => void;
  completionPercentage?: string | null;
}

const OngoingMolecule: React.FC<OngoingMoleculeProps> = ({
  item,
  onPress,
  completionPercentage,
}) => {
  return (
    <View
      style={[
        commonStyle.flexStart,
        styles.container,
        {alignItems: 'flex-start'},
      ]}>
      <ImageAtom
        sourceRequire={
          item?.course?.course_image
            ? {
                uri: `${imageUrl}/uploads/course_images/${item?.course?.course_image}`,
              }
            : require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')
        }
        imageStyle={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <TextAtom
          text={item?.course?.name || ''}
          preset="heading4"
          style={[styles.boldText,{fontWeight:'600',marginTop:mScale.sm}]}
          numberOfLines={2}
        />
        <HorizontalProgressBar progress={Number(completionPercentage)} />
        <View style={{marginTop:mScale.xs}}>

        <ButtonAtom
          title={'Continue learning'}
          preset="primary"
          onPress={onPress}
          iconRight={<Images.SVG.RightArrow />}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    columnGap: mScale.base,
    paddingEnd: mScale.base,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    width: moderateScale(115),
    height: moderateScale(145),
    borderRadius:4,
    overflow:'hidden'
  },
  content: {flex: 1},
  boldText: {
    fontWeight: '600',
    marginBottom: mScale.base,
  },
});

export default OngoingMolecule;
