import * as React from "react";
import {
  Canvas,
  RoundedRect,
  vec,
  LinearGradient,
} from "@shopify/react-native-skia";
import { WINDOW_WIDTH, moderateScale, mScale } from "../../../theme/metrics";
import { colorPresets } from "../../../theme/color";

interface LinearGradientMoleculeProps {
  width?: number;
  height?: number;
  radius?: number;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export const LinearGradientMolecule: React.FC<LinearGradientMoleculeProps> = ({
  width = WINDOW_WIDTH - moderateScale(32),
  height = mScale.xxl2,
  radius = mScale.base,
  colors = [colorPresets.BLACK, colorPresets.GRAY3],
  start = { x: 0, y: 0 },
  end = { x: width / 2, y: height / 2 },
}) => {
  return (
    <Canvas style={{ flex: 1 }}>
      <RoundedRect x={0} y={0} width={width} height={height} r={radius}>
        <LinearGradient start={vec(start.x, start.y)} end={vec(end.x, end.y)} colors={colors} />
      </RoundedRect>
    </Canvas>
  );
};
