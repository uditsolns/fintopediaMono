import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import { colorPresets } from "../../../theme/color";
import { WINDOW_WIDTH, mScale } from "../../../theme/metrics";
import { LinearGradientMolecule } from "../../molecules/Gradient/LinearGradientMolecule";
import { TextAtom } from "../Text/TextAtom";
import { ButtonPresets, Presets, ButtonText } from "./ButtonPresets";
import { TextPresetType } from "../Text/TextPresets";

interface ButtonAtomProps extends PressableProps {
  title: string;
  preset?: ButtonPresets;
  loading?: boolean;
  textPreset?:TextPresetType,
}

export const ButtonAtom = ({
  title,
  preset = "primary",
  textPreset = 'smallBold',
  loading,
  ...rest
}: ButtonAtomProps) => {
  const [width, setWidth] = React.useState(WINDOW_WIDTH - mScale.lg3);
  const [height, setHeight] = React.useState(mScale.xl);
  const presetData = rest.disabled ? Presets.disabled : Presets[preset];

  const textStyle = ButtonText[preset];
  return (
    <View
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setWidth(width);
        setHeight(height);
      }}
      style={[
        preset === "tertiary"
          ? { borderRadius: mScale.sm, marginVertical: mScale.md }
          : undefined,
      ]}
    >
      {preset === "tertiary" ? (
        <View style={{ ...StyleSheet.absoluteFillObject, zIndex: -1 }}>
          <LinearGradientMolecule
            width={width}
            height={height}
            radius={mScale.sm}
          />
        </View>
      ) : null}
      <Pressable
        style={({ pressed }) => [presetData, { opacity: pressed ? 0.7 : 1 }]}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color={colorPresets.CTA} size={"small"} />
        ) : (
          <TextAtom style={textStyle} preset={textPreset} text={title} numberOfLines={1}  />
        )}
      </Pressable>
    </View>
  );
};
