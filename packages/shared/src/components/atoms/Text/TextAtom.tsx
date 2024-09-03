import * as React from "react";
import { Text, TextProps, View,TextStyle } from "react-native";
import { TextPresetType, TextPresets } from "./TextPresets";
import { colorPresets } from "../../../theme/color";

interface TextAtomProps extends TextProps {
  text?: string;
  translation?: string;
  preset?: TextPresetType;
  className?: string;
  style?:TextStyle
}

export const TextAtom: React.FC<TextAtomProps> = ({
  text,
  preset = "body",
  style,
  ...rest
}: TextAtomProps) => {
  const textStyle = [TextPresets[preset], { color: colorPresets.CTA }, style];
  return (
    <View>
      <Text
        style={[textStyle]}
        {...rest}
        allowFontScaling={false}
        textBreakStrategy="simple"
      >
        {text}
      </Text>
    </View>
  );
};
