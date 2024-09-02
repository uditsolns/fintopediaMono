import { Platform } from "react-native";
import { Svg, Path } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const ChevronDown = ({ width = 22, color = "white" }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5807 9.16667L10.9974 13.75L6.41406 9.16667"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} fill="none">
      <Path
        d="M15.5807 9.16667L10.9974 13.75L6.41406 9.16667"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
