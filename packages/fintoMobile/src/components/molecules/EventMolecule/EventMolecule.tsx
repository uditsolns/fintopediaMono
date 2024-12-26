import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@src/components/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {GamesResponse} from '@shared/src/utils/types/games';
import {imageUrl} from 'shared/src/config/imageUrl';

export default function EventMolecule({
  item,
  onPress,
}: {
  item: GamesResponse;
  onPress: () => void;
}) {
  return (
    <View style={[commonStyle.flexStart, styles.container]}>
      <ImageAtom
        sourceRequire={
          item?.image
            ? {uri: `${imageUrl}/GameImages/${item.image}`}
            : require('@shared/src/assets/img/gameImage.png')
        }
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <TextAtom
          text={item?.name}
          preset="heading4"
          style={styles.boldText}
          numberOfLines={2}
        />
        <TextAtom
          text={item?.game_desc ? item?.game_desc : ''}
          preset="small"
          style={[styles.boldText, {color: colorPresets.GRAY}]}
          numberOfLines={3}
        />
        <View style={{marginTop: mScale.xl}}>
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
    overflow: 'hidden',
  },
  content: {flex: 1, paddingVertical: mScale.md},
  boldText: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  button: {
    width: moderateScale(94),
    marginTop: mScale.base,
  },
});
