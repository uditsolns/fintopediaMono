import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import { ButtonAtom } from '@shared/src/components/atoms/Button/ButtonAtom';
import { colorPresets } from '@shared/src/theme/color';

interface PurchaseHistoryMoleculeProps {
  item?: {
    title: string;
    price: string;
    purchaseDate: string;
  };
  onPress?: () => void;
}

const PurchaseHistoryMolecule: React.FC<PurchaseHistoryMoleculeProps> = ({ item, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={commonStyle.flexSpaceBetween}>
          <TextAtom
            text={'Pro-Investor Membership'}
            preset="heading3"
            style={[styles.boldText, { width: moderateScale(220) }]}
            numberOfLines={2}
          />
          <TextAtom
            text={`₹ 21999`}
            preset="heading3"
            style={{ fontWeight: '500' }}
            numberOfLines={2}
          />
        </View>
        <View style={{ marginBottom: mScale.lg2 }}>
          <TextAtom
            text={`Purchased on 11 dec 2022`}
            preset="medium"
            style={{ fontWeight: '400',color:'#D5D5D9' }}
            numberOfLines={2}
          />
        </View>
        <ButtonAtom
          title={'Receipt'}
          textPreset={'titleBold'}
          onPress={onPress}
          preset='tertiary'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: mScale.lg2,
    overflow: 'hidden',
    backgroundColor: '#121622',
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
  } as ViewStyle,
  content: { flex: 1 } as ViewStyle,
  boldText: {
    fontWeight: '500',
  },
});

export default PurchaseHistoryMolecule;
