import { Platform } from "react-native";
import {
  Svg,
  Path,
  Circle,
  G,
  Defs,
  ClipPath,
  Rect,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Fb3 = ({ width }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
          fill="url(#paint0_linear_4620_3382)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4620_3382"
            x1="36"
            y1="1.58294e-06"
            x2="-7.38263"
            y2="19.9292"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2D303D" />
            <stop offset="0.28602" stop-color="#212330" />
            <stop offset="0.651525" stop-color="#101320" />
            <stop offset="0.78" stop-color="#111521" />
            <stop offset="1" stop-color="#0D0F1B" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
        fill="url(#paint0_linear_4620_3382)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_4620_3382"
          x1="36"
          y1="1.58294e-06"
          x2="-7.38263"
          y2="19.9292"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#2D303D" />
          <Stop offset="0.28602" stop-color="#212330" />
          <Stop offset="0.651525" stop-color="#101320" />
          <Stop offset="0.78" stop-color="#111521" />
          <Stop offset="1" stop-color="#0D0F1B" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
