import { StyleSheet, View } from 'react-native';
import React from 'react';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { ButtonAtom } from '@shared/src/components/atoms/Button/ButtonAtom';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import HorizontalProgressBar from '@src/components/HorizontalProgressBar';
import { CoursesResponse } from '@shared/src/utils/types/courses';
import { imageUrl } from '@shared/src/config/imageUrl';

interface OngoingMoleculeProps {
  item: CoursesResponse;
  onPress?: () => void;
}

const OngoingMolecule: React.FC<OngoingMoleculeProps> = ({ item, onPress }) => {
  return (
    <View style={[commonStyle.flexStart, styles.container, { alignItems: 'flex-start' }]}>
      <ImageAtom
        sourceRequire={ item?.course_image
          ? {uri: `${imageUrl}/uploads/course_images/${item?.course_image}`}
          : require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')}
        imageStyle={styles.image}
        resizeMode='stretch'
      />
      <View style={styles.content}>
        <TextAtom
          text={item?.name}
          preset="heading4"
          style={styles.boldText}
          numberOfLines={2}
        />
        <HorizontalProgressBar progress={75} />
        <ButtonAtom title={'Continue learning'} preset='primary' />
       
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
    height: moderateScale(133),
  },
  content: { flex: 1 },
  boldText: {
    fontWeight: '600',
    marginBottom: mScale.base,
  },
});

export default OngoingMolecule;
