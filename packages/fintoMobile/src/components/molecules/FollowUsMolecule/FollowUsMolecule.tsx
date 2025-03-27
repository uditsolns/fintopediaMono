import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {commonStyle} from '@shared/src/commonStyle';
import {mScale} from '@shared/src/theme/metrics';
import {Images} from '@shared/src/assets';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';

export default function FollowUsMolecule() {
  return (
    <View style={{alignSelf: 'center'}}>
      <TextAtom text={'Follow us on :'} preset="body" />
      <View style={[commonStyle.flexCenter, {marginTop: mScale.md}]}>
        <PressableAtom style={{marginRight: mScale.md}} onPress={() => Linking.openURL('https://www.facebook.com/people/Fintopedia/61551172396495/')}>
          <Images.SVG.CircleFB />
        </PressableAtom>
        <PressableAtom onPress={() => Linking.openURL('https://www.instagram.com/fintopedia_official/')}>
          <Images.SVG.CircleInsta />
        </PressableAtom>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
