import { Platform } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Upload = ({ width = 25 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 16L4.5 17C4.5 18.6569 5.84315 20 7.5 20L17.5 20C19.1569 20 20.5 18.6569 20.5 17L20.5 16M16.5 8L12.5 4M12.5 4L8.5 8M12.5 4L12.5 16"
          stroke="#090A0B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M4.5 16L4.5 17C4.5 18.6569 5.84315 20 7.5 20L17.5 20C19.1569 20 20.5 18.6569 20.5 17L20.5 16M16.5 8L12.5 4M12.5 4L8.5 8M12.5 4L12.5 16"
        stroke="#090A0B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
