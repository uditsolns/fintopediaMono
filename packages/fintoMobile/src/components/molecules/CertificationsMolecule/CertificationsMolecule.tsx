import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {imageUrl} from '@shared/src/config/imageUrl';
import { UserCertificateResponse } from '@shared/src/utils/types/UserCertificate';

interface CertificationsMoleculeProps {
  item: UserCertificateResponse;
  onPress?: () => void;
}

const CertificationsMolecule: React.FC<CertificationsMoleculeProps> = ({
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
          item?.course?.course_image
            ? {uri: `${imageUrl}/uploads/course_images/${item?.course?.course_image}`}
            : require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')
        }
        imageStyle={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <TextAtom
          text={item?.course?.name}
          preset="heading4"
          style={styles.boldText}
          numberOfLines={2}
        />
        <ButtonAtom
          title={'stockmarketexpert/certificate 13655'}
          preset={'tertiary'}
        />
        <View style={{marginTop: -mScale.sm}}>
          <ButtonAtom title={'Download certificate'} preset={'primary'} onPress={onPress} />
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
    height: moderateScale(133),
  },
  content: {flex: 1},
  boldText: {
    fontWeight: '600',
    marginBottom: mScale.xs,
  },
});

export default CertificationsMolecule;
