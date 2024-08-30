import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { mScale } from "@shared/src/theme/metrics";
import { commonStyle } from "@shared/src/commonStyle";
import { Images } from "@shared/src/assets";
import { colorPresets } from "@shared/src/theme/color";
import { TextAtom } from "@shared/src/components/atoms/Text/TextAtom";

interface HeaderProps {
  text?: string;
  visible?: boolean;
  textVisible?: boolean;
  cartVisible?: boolean;
  ph?: number;
}

export default function Header({
  text,
  visible = true,
  textVisible = true,
  cartVisible = true,
  ph = mScale.base,
}: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {
          gap: mScale.lg1,
          marginVertical: mScale.lg,
          paddingHorizontal: ph,
        },
      ]}
    >
      <View style={[commonStyle.flexStart, { gap: mScale.lg1, flex: 1 }]}>
        {visible ? <Images.SVG.ChevronLeft width={24} /> : null}
        {textVisible ? (
          <TextAtom text={text} color={colorPresets.CTA} preset="heading2" />
        ) : null}
      </View>
      <View style={[commonStyle.flexSpaceBetween]}>
        <Images.SVG.ChevronLeft width={24} />
        <Images.SVG.ChevronLeft width={24} />
        {cartVisible ? <Images.SVG.ChevronLeft width={24} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
