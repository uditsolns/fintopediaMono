import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {imageUrl} from '@shared/src/config/imageUrl';
import {UserCertificateResponse} from '@shared/src/utils/types/UserCertificate';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import GradientBorderBox from '@src/components/Border/GradientBorderBox';

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
          text={item?.course?.name}
          preset="heading4"
          style={styles.boldText}
          numberOfLines={2}
        />
        <View style={{marginTop: mScale.lg1}}>
          <GradientBorderBox
            borderRadium={4}
            linearColor2={['#7A7FA2', '#7A7FA2']}
            linearColor={['#222431', '#222431']}>
            <Pressable
              style={[
                commonStyle.flexSpaceBetween,
                {paddingVertical: mScale.sm, paddingHorizontal: mScale.md2},
              ]}>
              <TextAtom
                text="stockmarketexpert/certificate 13655"
                preset="small"
                numberOfLines={1}
                style={{width: moderateScale(150), fontWeight: '400'}}
              />
              <Images.SVG.CopyIcon color="white" />
            </Pressable>
          </GradientBorderBox>
        </View>

        <View style={{marginTop: mScale.md}}>
          <ButtonAtom
            title={'Download certificate'}
            preset={'primary'}
            onPress={onPress}
            textPreset="smallBold"
            iconLeft={<Images.SVG.DownloadIcon color="#000" />}
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
    borderRadius: 4,
    overflow: 'hidden',
  },
  content: {flex: 1},
  boldText: {
    fontWeight: '600',
    marginBottom: mScale.xs,
  },
  button: {
    width: moderateScale(200),
    borderRadius: 4,
    paddingVertical: mScale.md,
    paddingHorizontal: mScale.lg1,
  },
});

export default CertificationsMolecule;
