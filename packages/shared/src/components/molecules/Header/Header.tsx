import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { mScale } from "../../../theme/metrics";
import { commonStyle } from "../../../commonStyle";
import { Images } from "../../../assets";
import { TextAtom } from "../../atoms/Text/TextAtom";
import { colorPresets } from "../../../theme/color";

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
          <TextAtom text={`${text}`} preset="banner" style={{color:colorPresets.CTA}} />
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
