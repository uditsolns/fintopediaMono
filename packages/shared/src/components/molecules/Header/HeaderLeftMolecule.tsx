import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { commonStyle } from '../../../commonStyle';
import { mScale } from '../../../theme/metrics';
import { Images } from '../../../assets';
import { TextAtom } from '../../atoms/Text/TextAtom';
import { colorPresets } from '../../../theme/color';

interface HeaderLeftMoleculeProps {
  text?: string;
}

export default function HeaderLeftMolecule({ text }: HeaderLeftMoleculeProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={[
        commonStyle.flexStart,
        { gap: mScale.lg1, marginVertical: mScale.lg },
      ]}
    >
      <Images.SVG.ChevronLeft width={24} />
      <TextAtom
        text={text}
        color={colorPresets.CTA}
        preset="title"
        style={{ flex: 1 }}
      />
    </View>
  );
}
