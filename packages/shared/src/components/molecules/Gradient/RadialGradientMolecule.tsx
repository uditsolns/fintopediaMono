import {
  Blend,
  Canvas,
  RadialGradient,
  Rect,
  vec,
  LinearGradient,
  BackdropBlur,
} from "@shopify/react-native-skia";
import * as React from "react";
import { colorPresets } from "../../../theme/color";
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  moderateScale,
} from "../../../theme/metrics";

interface RadialGradientMoleculeProps {}

export const RadialGradientMolecule: React.FC<
  RadialGradientMoleculeProps
> = ({}) => {
  return (
    <Canvas style={{ flex: 1, backgroundColor: colorPresets.BG }}>
      <Rect x={0} y={0} width={WINDOW_WIDTH} height={WINDOW_HEIGHT}>
        <Blend mode="difference">
          <LinearGradient
            start={vec(0, WINDOW_WIDTH)}
            end={vec(WINDOW_HEIGHT, 0)}
            colors={[
              "#2D303D00",
              "#21233047",
              "#101320A6",
              "#111521C7",
              "#0D0F1BFF",
            ]}
          />
          <RadialGradient
            c={vec(0, WINDOW_HEIGHT * 0.1)}
            r={moderateScale(86)}
            colors={[colorPresets.TERTIARY, colorPresets.BG]}
          />
          <RadialGradient
            c={vec(WINDOW_WIDTH, WINDOW_HEIGHT / 1.4)}
            r={moderateScale(86)}
            colors={[colorPresets.SECONDARY, colorPresets.BG]}
          />
        </Blend>
      </Rect>
      <BackdropBlur
        blur={100}
        clip={{
          x: 0,
          y: 0,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
        }}
      />
    </Canvas>
  );
};
