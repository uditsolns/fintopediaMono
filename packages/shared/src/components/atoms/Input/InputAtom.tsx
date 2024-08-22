import * as React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import { colorPresets } from "../../../theme/color";
import { WINDOW_WIDTH, mScale, moderateScale } from "../../../theme/metrics";
import { LinearGradientMolecule } from "../../molecules/Gradient/LinearGradientMolecule";
import { AppInput, InputPresets } from "./InputPresets";
import { TextAtom } from "../Text/TextAtom";

interface InputAtomProps extends TextInputProps {
  label?: string;
  shape: "square" | "circle" | "sharp";
  preset?: InputPresets;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  error?: string;
  touched?: boolean;
  errorMessage?: string;
  children?: React.ReactElement;
}

export const InputAtom: React.FC<InputAtomProps> = ({
  label,
  shape = "circle",
  preset = "primary",
  rightIcon,
  leftIcon,
  style,
  error,
  touched,
  errorMessage,
  children,
  ...rest
}) => {
  const [width, setWidth] = React.useState(WINDOW_WIDTH - mScale.lg3);
  const [height, setHeight] = React.useState(mScale.xl);

  const inputStyle = AppInput[preset];

  const inputColor = error && touched ? colorPresets.ERROR : undefined;
  const radius =
    shape === "circle" ? mScale.xxl : shape === "square" ? mScale.md : 0;
  return (
    <View>
      {label ? <TextAtom text={label} preset="medium" /> : null}
      <View
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setWidth(width);
          setHeight(height);
        }}
        style={{
          borderRadius: radius,
        }}
      >
        <View style={{ ...StyleSheet.absoluteFillObject, zIndex: -1 }}>
          <LinearGradientMolecule
            width={width}
            height={height}
            radius={radius}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 2,
            paddingVertical: 1,
            backgroundColor: colorPresets.TRANSPARENT,
          }}
        >
          <TextInput
            {...rest}
            placeholderTextColor={colorPresets.GRAY}
            style={[
              style,
              inputStyle,
              {
                flex: 1,
                height: rest.numberOfLines ? moderateScale(120) : undefined,
                backgroundColor: colorPresets.BG,
                borderRadius: radius,
              },
            ]}
          />
          {rightIcon ? (
            <View
              style={{
                position: "absolute",
                right: mScale.md3,
                top: mScale.md2,
              }}
            >
              {rightIcon}
            </View>
          ) : null}
        </View>
      </View>
      {error && errorMessage && (
        <TextAtom
          style={{
            color: colorPresets.ERROR,
            paddingTop: mScale.sm,
            paddingHorizontal: mScale.base,
          }}
          text={errorMessage}
        />
      )}
    </View>
  );
};
