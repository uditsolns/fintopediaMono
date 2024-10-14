import { Platform } from "react-native";
import { Svg, Path, Circle, Defs, ClipPath, Rect, G } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const PurchaseHistoryIcon = ({ width = 27 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_28142)">
          <path
            d="M13.5 9V13.5L15.75 15.75"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.43127 12.375C3.68338 9.90002 4.83782 7.60452 6.67435 5.92642C8.51088 4.24831 10.9009 3.30507 13.3885 3.27666C15.8761 3.24825 18.2871 4.13665 20.1614 5.77237C22.0358 7.40809 23.2424 9.67662 23.551 12.1451C23.8595 14.6137 23.2485 17.1094 21.8344 19.1562C20.4204 21.203 18.3022 22.6575 15.8842 23.2423C13.4662 23.8271 10.9175 23.5012 8.7244 22.3268C6.5313 21.1524 4.84734 19.2117 3.99377 16.875M3.43127 22.5V16.875H9.05627"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_28142">
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
      <G clip-path="url(#clip0_1795_28142)">
        <Path
          d="M13.5 9V13.5L15.75 15.75"
          stroke="white"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3.43127 12.375C3.68338 9.90002 4.83782 7.60452 6.67435 5.92642C8.51088 4.24831 10.9009 3.30507 13.3885 3.27666C15.8761 3.24825 18.2871 4.13665 20.1614 5.77237C22.0358 7.40809 23.2424 9.67662 23.551 12.1451C23.8595 14.6137 23.2485 17.1094 21.8344 19.1562C20.4204 21.203 18.3022 22.6575 15.8842 23.2423C13.4662 23.8271 10.9175 23.5012 8.7244 22.3268C6.5313 21.1524 4.84734 19.2117 3.99377 16.875M3.43127 22.5V16.875H9.05627"
          stroke="white"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_28142">
          <Rect width={width} height={width} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
