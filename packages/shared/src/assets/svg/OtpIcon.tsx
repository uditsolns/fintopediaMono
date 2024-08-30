import { Platform } from "react-native";
import {
  Svg,
  Path,
  G,
  Defs,
  ClipPath,
  Rect,
  Mask,
  LinearGradient,
  Stop,
  Circle,
} from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const OtpIcon = ({ width = 88, color }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width="88"
        height="88"
        viewBox="0 0 88 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="44"
          cy="44"
          r="43.6829"
          fill="url(#paint0_linear_1796_1873)"
          stroke="url(#paint1_linear_1796_1873)"
          stroke-width="0.634138"
        />
        <g clip-path="url(#clip0_1796_1873)">
          <path
            d="M62 38V58C62 59.0609 61.5786 60.0783 60.8284 60.8284C60.0783 61.5786 59.0609 62 58 62H30C28.9391 62 27.9217 61.5786 27.1716 60.8284C26.4214 60.0783 26 59.0609 26 58V38"
            fill="#D9D9D9"
          />
          <path
            d="M62 38V58C62 59.0609 61.5786 60.0783 60.8284 60.8284C60.0783 61.5786 59.0609 62 58 62H30C28.9391 62 27.9217 61.5786 27.1716 60.8284C26.4214 60.0783 26 59.0609 26 58V38"
            stroke="#121522"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26 38L44 50L62 38L44 26L26 38Z"
            fill="#D9D9D9"
            stroke="#121522"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M26 58L38 46L26 58Z" fill="#D9D9D9" />
          <path
            d="M26 58L38 46"
            stroke="#121522"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M50 46L62 58L50 46Z" fill="#D9D9D9" />
          <path
            d="M50 46L62 58"
            stroke="#121522"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1796_1873"
            x1="88"
            y1="3.86942e-06"
            x2="-18.0464"
            y2="48.7159"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2D303D" />
            <stop offset="0.28602" stop-color="#212330" />
            <stop offset="0.651525" stop-color="#101320" />
            <stop offset="0.78" stop-color="#111521" />
            <stop offset="1" stop-color="#0D0F1B" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1796_1873"
            x1="98.4923"
            y1="-5.16049"
            x2="-29.0729"
            y2="23.5753"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7A7FA2" />
            <stop offset="1" stop-color="#141622" />
          </linearGradient>
          <clipPath id="clip0_1796_1873">
            <rect
              width="48"
              height="48"
              fill="white"
              transform="translate(20 20)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg width="88" height="88" viewBox="0 0 88 88" fill="none">
      <Circle
        cx="44"
        cy="44"
        r="43.6829"
        fill="url(#paint0_linear_1796_1873)"
        stroke="url(#paint1_linear_1796_1873)"
        stroke-width="0.634138"
      />
      <G clip-path="url(#clip0_1796_1873)">
        <Path
          d="M62 38V58C62 59.0609 61.5786 60.0783 60.8284 60.8284C60.0783 61.5786 59.0609 62 58 62H30C28.9391 62 27.9217 61.5786 27.1716 60.8284C26.4214 60.0783 26 59.0609 26 58V38"
          fill="#D9D9D9"
        />
        <Path
          d="M62 38V58C62 59.0609 61.5786 60.0783 60.8284 60.8284C60.0783 61.5786 59.0609 62 58 62H30C28.9391 62 27.9217 61.5786 27.1716 60.8284C26.4214 60.0783 26 59.0609 26 58V38"
          stroke="#121522"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M26 38L44 50L62 38L44 26L26 38Z"
          fill="#D9D9D9"
          stroke="#121522"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path d="M26 58L38 46L26 58Z" fill="#D9D9D9" />
        <Path
          d="M26 58L38 46"
          stroke="#121522"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path d="M50 46L62 58L50 46Z" fill="#D9D9D9" />
        <Path
          d="M50 46L62 58"
          stroke="#121522"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1796_1873"
          x1="88"
          y1="3.86942e-06"
          x2="-18.0464"
          y2="48.7159"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#2D303D" />
          <Stop offset="0.28602" stop-color="#212330" />
          <Stop offset="0.651525" stop-color="#101320" />
          <Stop offset="0.78" stop-color="#111521" />
          <Stop offset="1" stop-color="#0D0F1B" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1796_1873"
          x1="98.4923"
          y1="-5.16049"
          x2="-29.0729"
          y2="23.5753"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#7A7FA2" />
          <Stop offset="1" stop-color="#141622" />
        </LinearGradient>
        <ClipPath id="clip0_1796_1873">
          <Rect
            width="48"
            height="48"
            fill="white"
            transform="translate(20 20)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
