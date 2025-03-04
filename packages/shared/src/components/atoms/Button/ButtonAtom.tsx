import * as React from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
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
  textPreset?: TextPresetType;
  loadingColor?: string;
}

export const ButtonAtom = ({
  title,
  preset = "primary",
  textPreset = "smallBold",
  loading = false,
  loadingColor = colorPresets.BLACK,
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
            colors={[colorPresets.GRAY3, colorPresets.GRAY3]}
          />
        </View>
      ) : null}
      <Pressable
        disabled={loading}
        style={({ pressed }) => [presetData, { opacity: pressed ? 0.7 : 1 }]}
        {...rest}
      >
        <TextAtom
          style={textStyle}
          preset={textPreset}
          text={title}
          numberOfLines={1}
        />
      </Pressable>
    </View>
  );
};
