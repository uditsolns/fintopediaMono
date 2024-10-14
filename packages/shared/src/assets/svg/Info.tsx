import { Platform } from "react-native";
import { Svg, Path } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Info = ({ width, color }: ISVGProps) => {
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
          d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
      />
    </Svg>
  );
};
