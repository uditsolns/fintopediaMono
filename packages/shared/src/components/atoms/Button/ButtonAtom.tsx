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
  numberOfLines?: number;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const ButtonAtom = ({
  title,
  preset = "primary",
  textPreset = "smallBold",
  loading = false,
  loadingColor = colorPresets.BLACK,
  numberOfLines = 1,
  iconLeft,
  iconRight,
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
          ? { borderRadius: 4, marginVertical: mScale.md }
          : undefined,
      ]}
    >
      {preset === "tertiary" ? (
        <View style={{ ...StyleSheet.absoluteFillObject, zIndex: -1 }}>
          <LinearGradientMolecule
            width={width}
            height={height}
            radius={4}
            colors={[colorPresets.GRAY3, colorPresets.GRAY3]}
          />
        </View>
      ) : null}
      <Pressable
        disabled={loading}
        style={({ pressed }) => [
          presetData,
          {
            opacity: pressed ? 0.7 : 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        {...rest}
      >
        {iconLeft && <View style={{ marginRight: 8 }}>{iconLeft}</View>}
        {loading ? (
          <ActivityIndicator size={"small"} color={loadingColor} />
        ) : (
          <TextAtom
            style={[textStyle, { textAlign: "center" }]}
            preset={textPreset}
            text={title}
            numberOfLines={numberOfLines}
          />
        )}
        {iconRight && <View style={{ marginLeft: 8 }}>{iconRight}</View>}
      </Pressable>
    </View>
  );
};
