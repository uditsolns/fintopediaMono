import { Platform } from "react-native";
import { Svg, Path } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const ChevronLeft = ({ width = 24, color = "white" }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19L8 12L15 5"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19L8 12L15 5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
