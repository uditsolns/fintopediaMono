import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@src/components/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';

export default function EventMolecule({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) {
  return (
    <View style={[commonStyle.flexStart, styles.container]}>
      <ImageAtom
        sourceRequire={require('@shared/src/assets/img/gameImage.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <TextAtom
          text={'NSB Academy PGDM'}
          preset="heading4"
          style={styles.boldText}
          numberOfLines={3}
        />
        <TextAtom
          text="Build your financial through Build your financial through project-driven skills "
          preset="small"
          style={[styles.boldText, {color: colorPresets.GRAY}]}
          numberOfLines={3}
        />
        <View style={{marginTop:mScale.xl}}>

        <ButtonAtom title="Play game" onPress={onPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    columnGap: mScale.base,
    paddingEnd: mScale.base,
    borderRightWidth: 1,
    borderBottomWidth: 0.75,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderColor: '#7A7FA2',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colorPresets.TEXT,
  },
  image: {
    width: moderateScale(139),
    height: moderateScale(156),
  },
  content: {flex: 1, paddingVertical: mScale.md},
  boldText: {
    fontWeight: '600',
  },
  button: {
    width: moderateScale(94),
    marginTop: mScale.base,
  },
});
