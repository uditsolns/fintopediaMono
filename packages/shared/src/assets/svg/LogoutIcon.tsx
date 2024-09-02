import { Platform } from "react-native";
import { Svg, Path, Circle, Defs, ClipPath, Rect, G } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const LogoutIcon = ({ width = 27 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_28160)">
          <path
            d="M15.75 9V6.75C15.75 6.15326 15.5129 5.58097 15.091 5.15901C14.669 4.73705 14.0967 4.5 13.5 4.5H5.625C5.02826 4.5 4.45597 4.73705 4.03401 5.15901C3.61205 5.58097 3.375 6.15326 3.375 6.75V20.25C3.375 20.8467 3.61205 21.419 4.03401 21.841C4.45597 22.2629 5.02826 22.5 5.625 22.5H13.5C14.0967 22.5 14.669 22.2629 15.091 21.841C15.5129 21.419 15.75 20.8467 15.75 20.25V18"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.125 13.5H23.625L20.25 10.125"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.25 16.875L23.625 13.5"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_28160">
            <rect width={width} height={width} fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      fill="none"
    >
      <G clip-path="url(#clip0_1795_28160)">
        <Path
          d="M15.75 9V6.75C15.75 6.15326 15.5129 5.58097 15.091 5.15901C14.669 4.73705 14.0967 4.5 13.5 4.5H5.625C5.02826 4.5 4.45597 4.73705 4.03401 5.15901C3.61205 5.58097 3.375 6.15326 3.375 6.75V20.25C3.375 20.8467 3.61205 21.419 4.03401 21.841C4.45597 22.2629 5.02826 22.5 5.625 22.5H13.5C14.0967 22.5 14.669 22.2629 15.091 21.841C15.5129 21.419 15.75 20.8467 15.75 20.25V18"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.125 13.5H23.625L20.25 10.125"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M20.25 16.875L23.625 13.5"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_28160">
          <Rect width={width} height={width} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
