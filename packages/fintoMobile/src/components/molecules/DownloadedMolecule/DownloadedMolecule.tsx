import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {LinkButton} from '@src/components/Button/LinkButton';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {imageUrl} from '@shared/src/config/imageUrl';
import {CoursesResponse} from '@shared/src/utils/types/courses';

interface DownloadedMoleculeProps {
  item: CoursesResponse;
  onPress?: () => void;
}

const DownloadedMolecule: React.FC<DownloadedMoleculeProps> = ({
  item,
  onPress,
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
          item?.course_image
            ? {uri: `${imageUrl}/uploads/course_images/${item.course_image}`}
            : require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')
        }
        imageStyle={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <TextAtom
          text={item?.name}
          preset="titleBold"
          numberOfLines={3}
          style={{marginTop: mScale.md}}
        />
        <ButtonAtom
          title={'3 downloaded from 32 (256 MB)'}
          preset="secondary"
        />
        <LinkButton text="Delete download" style={{marginTop: mScale.base}} />
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
  content: {flex: 1},
  boldText: {
    fontWeight: '600',
    marginBottom: mScale.base,
  },
});

export default DownloadedMolecule;
