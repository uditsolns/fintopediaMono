import {View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {commonStyle} from '@shared/src/commonStyle';
import {mScale} from '@shared/src/theme/metrics';
import {Images} from '@shared/src/assets';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';

interface HeaderLeftMoleculeProps {
  text?: string;
}

export default function HeaderLeftMolecule({text}: HeaderLeftMoleculeProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={[
        commonStyle.flexStart,
        {gap: mScale.lg1, marginVertical: mScale.lg},
      ]}>
      <Images.SVG.ChevronLeft width={24} color={colorPresets.CTA} />
      <TextAtom
        text={text}
        color={colorPresets.CTA}
        preset="heading2"
        style={{flex: 1}}
      />
    </View>
  );
}
