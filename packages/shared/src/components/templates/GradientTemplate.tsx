import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, mScale } from "../../theme/metrics";
import { RadialGradientMolecule } from "../molecules/Gradient/RadialGradientMolecule";

interface GradientTemplateProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GradientTemplate: React.FC<GradientTemplateProps> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const hasNotch = insets.top > 20;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...StyleSheet.absoluteFillObject, zIndex: -1 }}>
        <RadialGradientMolecule />
      </View>
      <View
        style={[
          styles.container,
          { paddingTop: hasNotch ? insets.top - mScale.sm : mScale.base },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: mScale.lg,
  },
});
