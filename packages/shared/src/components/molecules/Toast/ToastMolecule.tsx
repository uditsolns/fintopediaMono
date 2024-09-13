import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
import { colorPresets } from "../../../theme/color";
import { TextAtom } from "../../atoms/Text/TextAtom";
import { Images } from "../../../assets";
import { mScale } from "../../../theme/metrics";

interface ToastMoleculeProps extends ToastProps {}

export enum ToastType {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info",
}

export const ToastMolecule: React.FC<ToastMoleculeProps> = ({
  message,
  type,
}) => {
  const color =
    type === ToastType.ERROR
      ? colorPresets.ERROR
      : type === ToastType.WARNING
      ? colorPresets.GRAY
      : type === ToastType.SUCCESS
      ? colorPresets.PRIMARY
      : colorPresets.SECONDARY;
  return (
    <View
      style={[
        styles.container,
        {
          borderLeftColor: color,
        },
      ]}
    >
      {type === ToastType.ERROR ? (
        <Images.SVG.Close width={mScale.lg3} color={colorPresets.CTA} />
      ) : type === ToastType.WARNING ? (
        <Images.SVG.Alert width={mScale.lg3} color={colorPresets.CTA} />
      ) : type === ToastType.SUCCESS ? (
        <Images.SVG.Check width={mScale.lg3} color={colorPresets.CTA} />
      ) : (
        <Images.SVG.Info width={mScale.lg3} color={colorPresets.CTA} />
      )}
      <TextAtom text={message as string} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    gap: mScale.md,
    paddingHorizontal: mScale.md,
    paddingVertical: mScale.md,
    borderRadius: mScale.md,
    backgroundColor: colorPresets.BG,
    borderLeftWidth: mScale.md,
    elevation: 5,
    shadowColor: "#FFF",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
