import { Platform } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const PlusCircle = ({ width = 19 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.48846 7.26542V9.63982M9.48846 9.63982V12.0142M9.48846 9.63982H11.8629M9.48846 9.63982H7.11405M16.6117 9.63982C16.6117 13.5739 13.4225 16.763 9.48846 16.763C5.55441 16.763 2.36523 13.5739 2.36523 9.63982C2.36523 5.70578 5.55441 2.5166 9.48846 2.5166C13.4225 2.5166 16.6117 5.70578 16.6117 9.63982Z"
          stroke="#121212"
          stroke-width="1.58294"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height="20" viewBox="0 0 19 20" fill="none">
      <Path
        d="M9.48846 7.26542V9.63982M9.48846 9.63982V12.0142M9.48846 9.63982H11.8629M9.48846 9.63982H7.11405M16.6117 9.63982C16.6117 13.5739 13.4225 16.763 9.48846 16.763C5.55441 16.763 2.36523 13.5739 2.36523 9.63982C2.36523 5.70578 5.55441 2.5166 9.48846 2.5166C13.4225 2.5166 16.6117 5.70578 16.6117 9.63982Z"
        stroke="#121212"
        stroke-width="1.58294"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
