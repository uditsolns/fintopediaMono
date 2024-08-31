import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface SortbyAtomInterface {
  sortByTitle?: string;
  title?: string;
  iconName: 'filter' | 'chevron';
  onPress?:()=>void
}
const SortbyAtom: React.FC<SortbyAtomInterface> = ({
  sortByTitle,
  title,
  iconName,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[commonStyle.flexSpaceBetween, styles.container]}
      {...rest}
      onPress={onPress}
      >
      <View>
        <TextAtom
          text={sortByTitle}
          color={'#D1D1D5'}
          preset="medium"
          style={{fontWeight: '400'}}
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
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#7A7FA2',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 42,
    },
    shadowOpacity: 0.2,
    shadowRadius: 25.1,
    elevation: 8,
    marginVertical: mScale.xs,
    backgroundColor: '#121622',
    padding: mScale.md,
    width: moderateScale(140),
    height: moderateScale(58),
  },
});

export default SortbyAtom;
