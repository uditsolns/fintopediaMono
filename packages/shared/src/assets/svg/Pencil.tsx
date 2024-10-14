import { Platform } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Pencil = ({ width = 19 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5647 3.97259L14.249 6.65683M12.7036 2.83376C13.4448 2.09252 14.6466 2.09252 15.3878 2.83376C16.129 3.57499 16.129 4.77677 15.3878 5.518L4.9351 15.9707H2.27783V13.2595L12.7036 2.83376Z"
          stroke="#FCFCFC"
          stroke-width="1.51844"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 19 19" fill="none">
      <Path
        d="M11.5647 3.97259L14.249 6.65683M12.7036 2.83376C13.4448 2.09252 14.6466 2.09252 15.3878 2.83376C16.129 3.57499 16.129 4.77677 15.3878 5.518L4.9351 15.9707H2.27783V13.2595L12.7036 2.83376Z"
        stroke="#FCFCFC"
        stroke-width="1.51844"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
