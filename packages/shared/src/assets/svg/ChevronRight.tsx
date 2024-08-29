import { Platform } from "react-native";
import { Svg, Path } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const ChevronRight = ({ width, color = "white" }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 15L15 5M5 5L15 15"
          stroke={color}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 15L15 5M5 5L15 15"
        stroke={color}
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
