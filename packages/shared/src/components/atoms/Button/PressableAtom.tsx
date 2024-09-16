import * as React from "react";
import { Pressable, PressableProps } from "react-native";
import { mScale } from "../../../theme/metrics";

interface PressableAtomProps extends PressableProps {
  disableOpacity?: boolean;
  opacity?: number;
  hitSlop?: number;
}

export const PressableAtom: React.FC<PressableAtomProps> = ({
  disableOpacity = false,
  opacity,
  hitSlop = mScale.sm,
  ...rest
}) => {
  return (
    <Pressable
      hitSlop={{
        top: hitSlop,
        bottom: hitSlop,
        left: hitSlop,
        right: hitSlop,
      }}
      style={({ pressed }) => [
        {
          opacity: pressed && !disableOpacity ? (opacity ? opacity : 0.7) : 1,
        },
      ]}
      {...rest}
    />
  );
};
