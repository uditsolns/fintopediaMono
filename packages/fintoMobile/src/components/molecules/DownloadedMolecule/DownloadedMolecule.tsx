import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { commonStyle } from '@shared/src/commonStyle';
import { ButtonAtom } from '@shared/src/components/atoms/Button/ButtonAtom';
import { LinkButton } from '@src/components/Button/LinkButton';
import { moderateScale, mScale } from '@shared/src/theme/metrics';

interface DownloadedMoleculeProps {
  item: any;
  onPress?: () => void;
}

const DownloadedMolecule: React.FC<DownloadedMoleculeProps> = ({ item, onPress }) => {
  return (
    <View style={[commonStyle.flexStart, styles.container, { alignItems: 'flex-start' }]}>
     <ImageAtom
        sourceRequire={require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')}
        imageStyle={styles.image}
      />
      <View style={styles.content}>
        <TextAtom
          text={'Trading Basics'}
          preset="heading4"
          style={styles.boldText}
          numberOfLines={2}
        />
        <ButtonAtom  title={'3 downloaded from 32 (256 MB)'}  preset='secondary' />
        <LinkButton text='Delete download' style={{marginTop:mScale.base}}  />
       
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

export default DownloadedMolecule;
