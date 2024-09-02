import { Platform } from "react-native";
import { Svg, Path } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const ChevronTop = ({ width = 24,height = 25, color = "white" }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 15.5L12 8.5L19 15.5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <Path
        d="M5 15.5L12 8.5L19 15.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
