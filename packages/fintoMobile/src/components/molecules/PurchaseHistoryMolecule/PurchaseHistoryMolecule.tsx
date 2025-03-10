import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {colorPresets} from '@shared/src/theme/color';
import {UserCourseHistoryResponse} from '@shared/src/utils/types/UserCourseHistory';
import GradientBorderBox from '@src/components/Border/GradientBorderBox';

interface PurchaseHistoryMoleculeProps {
  item?: UserCourseHistoryResponse;
  onPress?: () => void;
}

const PurchaseHistoryMolecule: React.FC<PurchaseHistoryMoleculeProps> = ({
  item,
  onPress,
}) => {
  return (
    <GradientBorderBox
      linearColor={['#121622', '#121622']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={commonStyle.flexSpaceBetween}>
            <TextAtom
              text={item?.course?.name || ''}
              preset="heading3"
              style={[styles.boldText, {width: moderateScale(220)}]}
              numberOfLines={2}
            />
            <TextAtom
              text={`₹ ${item?.course?.sale_price || 0}`}
              preset="heading4"
              style={{fontWeight: '500'}}
              numberOfLines={2}
            />
          </View>
          <View style={{marginBottom: mScale.lg2,marginTop:mScale.xs}}>
            <TextAtom
              text={`Purchased on ${item?.purchase_date}`}
              preset="medium"
              style={{fontWeight: '400', color: '#D5D5D9'}}
              numberOfLines={2}
            />
          </View>
          {/* <Pressable>
            <GradientBorderBox linearColor={[colorPresets.GRAY,colorPresets.TRANSPARENT]} borderRadium={4}>
              <TextAtom text='Receipt' style={{paddingVertical:mScale.md2,paddingHorizontal:mScale.lg}} />
            </GradientBorderBox>
          </Pressable> */}
          <ButtonAtom
            title={'Receipt'}
            textPreset={'titleBold'}
            onPress={onPress}
            preset="tertiary"
          />
        </View>
      </View>
    </GradientBorderBox>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: mScale.lg2,
    overflow: 'hidden',
  } as ViewStyle,
  content: {flex: 1} as ViewStyle,
  boldText: {
    fontWeight: '600',
  },
});

export default PurchaseHistoryMolecule;
