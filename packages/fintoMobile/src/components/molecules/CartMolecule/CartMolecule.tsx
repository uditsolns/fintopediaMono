import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import ProgressBar from '@src/components/ProgressBar';
import { RatingAtom } from '@src/components/RatingAtom';
import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle, ImageStyle} from 'react-native';

interface CartMoleculeProps {
  item?: any;
  onPress?: () => void;
  saveForLaterBoolean?: boolean;
}

export default function CartMolecule({
  item,
  onPress,
  saveForLaterBoolean = true,
}: CartMoleculeProps) {
  return (
    <View style={[commonStyle.flexStart, styles.container]}>
      <ImageAtom
        sourceRequire={require('@shared/src/assets/img/purchaseHistoryPlaceHolder.png')}
        imageStyle={styles.image}
      />
      <View style={styles.content}>
        <View style={[commonStyle.flexSpaceBetween]}>
          <TextAtom
            text="Swing Trading Basics"
            preset="titleBold"
            style={styles.boldText}
            numberOfLines={3}
          />
          <TextAtom text={`₹ 2,5555`} preset="titleBold" />
        </View>
        <ProgressBar
          level="intermediate"
          hours={'20'}
          mv={mScale.md}
          textPreset="xSmall"
          imageStyle={{
            width: mScale.md2,
            height: mScale.md2,
          }}
        />
        {/* <ButtonIconRightAtom
          btnColor="transparent"
          btnTitle={`4.6/5`}
          color={colorPresets.WHITE}
          preset="smallBold"
          iconName="star"
          iconColor="#FFA11A"
          style={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            alignSelf: 'flex-start',
          }}
        /> */}
        <RatingAtom ratingTitle={`4.6/5`} />
        <View style={[commonStyle.flexStart, {marginTop: mScale.base}]}>
          {saveForLaterBoolean ? (
            <Pressable style={{marginEnd: mScale.base}}>
              <TextAtom
                text={'Save for later'}
                preset="smallBold"
                style={[commonStyle.underline,{color:colorPresets.PRIMARY}]}
              />
            </Pressable>
          ) : null}
          <Pressable>
            <TextAtom
              text={'Remove'}
              preset="smallBold"
              style={[commonStyle.underline,{color:colorPresets.TERTIARY}]}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#111521',
  } as ViewStyle,
  image: {
    width: moderateScale(115),
    height: moderateScale(123),
  } as ImageStyle,
  content: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'flex-start',
    padding: mScale.base,
  } as ViewStyle,
  boldText: {
    fontWeight: '400',
  },
});
