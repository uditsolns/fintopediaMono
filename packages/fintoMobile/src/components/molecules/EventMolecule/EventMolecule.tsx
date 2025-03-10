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
        resizeMode="cover"
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
          style={[
            styles.boldText,
            {color: colorPresets.GRAY, fontWeight: '400',marginTop:mScale.xxs},
          ]}
          numberOfLines={3}
        />
        <View style={{}}>
          <ButtonAtom
            title="Play game"
            onPress={onPress}
            textPreset="smallSemiBold"
            style={styles.button}
          />
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
    borderBottomWidth: 0.45,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.25,
    borderColor: colorPresets.GRAY3,
    borderRadius: mScale.sm,
    overflow: 'hidden',
    backgroundColor: '#0C0C0C',
  },
  image: {
    width: moderateScale(139),
    height: moderateScale(160),
    overflow: 'hidden',
    resizeMode:'cover'
  },
  content: {flexGrow: 1,flex:1, paddingVertical: mScale.base,alignItems:'flex-start'},
  boldText: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: colorPresets.CTA,
    width: moderateScale(115),
    borderRadius: 4,
    paddingVertical: mScale.md,
    paddingHorizontal: mScale.lg1,
    marginTop: mScale.xxl,
  }
});
