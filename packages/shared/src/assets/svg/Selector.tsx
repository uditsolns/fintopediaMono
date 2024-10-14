import { Platform } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Selector = ({ width = 19 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
       <path d="M6.83936 7.31927L9.85003 4.30859L12.8607 7.31927M12.8607 11.8353L9.85003 14.846L6.83936 11.8353" stroke="#545F71" stroke-width="1.50534" stroke-linecap="round" stroke-linejoin="round"/>

      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 19 19" fill="none">
      <Path d="M6.83936 7.31927L9.85003 4.30859L12.8607 7.31927M12.8607 11.8353L9.85003 14.846L6.83936 11.8353" stroke="#545F71" stroke-width="1.50534" stroke-linecap="round" stroke-linejoin="round"/>

    </Svg>
  );
};
