import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {commonStyle} from '@shared/src/commonStyle';
import {mScale} from '@shared/src/theme/metrics';
import {Images} from '@shared/src/assets';

export default function FollowUsMolecule() {
  return (
    <View style={{alignSelf: 'center'}}>
      <TextAtom
        text={'Follow us on :'}
        preset="body"
        color={colorPresets.CTA}
      />
      <View style={[commonStyle.flexCenter, {marginTop: mScale.md}]}>
        <View style={{marginRight: mScale.md}}>
          <Images.SVG.CircleFB />
        </View>
        <Images.SVG.CircleInsta />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
