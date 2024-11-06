import { Platform } from "react-native";
import { Svg, Path } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Check = ({ width, color }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          d="M19.78,2.2L24,6.42L8.44,22L0,13.55L4.22,9.33L8.44,13.55L19.78,2.2M19.78,5L8.44,16.36L4.22,12.19L2.81,13.55L8.44,19.17L21.19,6.42L19.78,5Z"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M19.78,2.2L24,6.42L8.44,22L0,13.55L4.22,9.33L8.44,13.55L19.78,2.2M19.78,5L8.44,16.36L4.22,12.19L2.81,13.55L8.44,19.17L21.19,6.42L19.78,5Z"
      />
    </Svg>
  );
};
