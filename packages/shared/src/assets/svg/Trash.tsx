import { Platform } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Trash = ({ width = 19 }: ISVGProps) => {
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
          d="M14.5904 5.31471L13.9319 14.5335C13.8752 15.3281 13.214 15.9438 12.4174 15.9438H6.13443C5.3378 15.9438 4.67661 15.3281 4.61985 14.5335L3.96137 5.31471M7.75746 8.35158V12.9069M10.7943 8.35158V12.9069M11.5536 5.31471V3.03705C11.5536 2.61775 11.2136 2.27783 10.7943 2.27783H7.75746C7.33816 2.27783 6.99824 2.61775 6.99824 3.03705V5.31471M3.20215 5.31471H15.3497"
          stroke="#FCFCFC"
          stroke-width="1.51844"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} fill="none">
      <Path
        d="M14.5904 5.31471L13.9319 14.5335C13.8752 15.3281 13.214 15.9438 12.4174 15.9438H6.13443C5.3378 15.9438 4.67661 15.3281 4.61985 14.5335L3.96137 5.31471M7.75746 8.35158V12.9069M10.7943 8.35158V12.9069M11.5536 5.31471V3.03705C11.5536 2.61775 11.2136 2.27783 10.7943 2.27783H7.75746C7.33816 2.27783 6.99824 2.61775 6.99824 3.03705V5.31471M3.20215 5.31471H15.3497"
        stroke="#FCFCFC"
        stroke-width="1.51844"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
