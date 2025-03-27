import { Platform } from "react-native";
import { Svg, Path, G, Defs, ClipPath, Rect } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const RightArrow = ({ width, color="black" }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
      >
        <g clip-path="url(#clip0_1795_27645)">
          <path
            d="M3.71582 8H13.0492"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.04932 12L13.0493 8"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.04932 4L13.0493 8"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_27645">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0.382568)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
      <G clip-path="url(#clip0_1795_27645)">
        <Path
          d="M3.71582 8H13.0492"
          stroke={color}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9.04932 12L13.0493 8"
          stroke={color}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9.04932 4L13.0493 8"
          stroke={color}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_27645">
          <Rect
            width="16"
            height="16"
            fill={color}
            transform="translate(0.382568)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
