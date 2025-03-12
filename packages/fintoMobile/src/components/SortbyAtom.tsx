import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import GradientBorderBox from './Border/GradientBorderBox';

interface SortbyAtomInterface {
  sortByTitle?: string;
  title?: string;
  iconName: 'filter' | 'chevron';
  onPress?: () => void;
}
const SortbyAtom: React.FC<SortbyAtomInterface> = ({
  sortByTitle,
  title,
  iconName,
  onPress,
  ...rest
}) => {
  return (
    <View style={{marginTop: mScale.xs}}>
      <GradientBorderBox linearColor={['#121622', '#121622']} borderRadium={4}>
        <TouchableOpacity
          style={[commonStyle.flexSpaceBetween, styles.container]}
          {...rest}
          onPress={onPress}>
          <View>
            <TextAtom
              text={sortByTitle}
              preset="medium"
              style={{fontWeight: '400', color: '#D1D1D5'}}
            />
            <TextAtom
              numberOfLines={1}
              text={title}
              preset="titleBold"
              style={{width: moderateScale(85)}}
            />
          </View>
          <View style={{marginStart: mScale.md}}>
            {iconName == 'filter' ? (
              <Images.SVG.Filter />
            ) : (
              <Images.SVG.ChevronDown width={22} />
            )}
          </View>
        </TouchableOpacity>
      </GradientBorderBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: '#121622',
    padding: mScale.md,
    width: moderateScale(140),
    height: moderateScale(58),
  },
});

export default SortbyAtom;
