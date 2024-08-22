import * as React from "react";
import {
  Canvas,
  RoundedRect,
  vec,
  LinearGradient,
} from "@shopify/react-native-skia";
import { colorPresets } from "../../../theme/color";
import { WINDOW_WIDTH, moderateScale, mScale } from "../../../theme/metrics";

interface LinearGradientMoleculeProps {
  width: number;
  height: number;
  radius?: number;
}

export const LinearGradientMolecule: React.FC<LinearGradientMoleculeProps> = ({
  width = WINDOW_WIDTH - moderateScale(32),
  height = mScale.xxl2,
  radius = mScale.base,
}) => {
  return (
    <Canvas style={{ flex: 1 }}>
      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        color="#FFFFFF"
        r={radius}
      >
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width / 2, width / 2)}
          colors={[colorPresets.OFFBLACK, colorPresets.GRAY3]}
        />
      </RoundedRect>
    </Canvas>
  );
};
