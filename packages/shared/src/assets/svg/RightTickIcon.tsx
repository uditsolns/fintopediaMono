import { Platform } from "react-native";
import { Svg, Path, Circle, Defs, ClipPath, Rect, G } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const RightTickIcon = ({ width = 9 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1796_2092)">
          <path
            d="M2.1543 4.48254L3.81701 6.14525L7.14244 2.81982"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1796_2092">
            <rect
              width="7.98103"
              height="7.98103"
              fill="white"
              transform="translate(0.492188 0.492065)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 9 9" fill="none">
      <G clip-path="url(#clip0_1796_2092)">
        <Path
          d="M2.1543 4.48254L3.81701 6.14525L7.14244 2.81982"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1796_2092">
          <Rect
            width="7.98103"
            height="7.98103"
            fill="white"
            transform="translate(0.492188 0.492065)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
