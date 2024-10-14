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

export const EmailVerifyIcon = ({ width = 88, color }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 88 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="44"
          cy="44"
          r="43.6829"
          fill="url(#paint0_linear_1796_1653)"
          stroke="url(#paint1_linear_1796_1653)"
          stroke-width="0.634138"
        />
        <g clip-path="url(#clip0_1796_1653)">
          <path
            d="M64.6615 31.0992H38.2187C35.9812 31.0992 34.1506 32.9299 34.1506 35.1674V53.4739C34.1506 54.5529 34.5792 55.5876 35.3421 56.3505C36.105 57.1135 37.1397 57.5421 38.2187 57.5421H64.6615C66.9193 57.5421 68.7296 55.7318 68.7296 53.4739V35.1674C68.7296 34.0884 68.301 33.0537 67.5381 32.2908C66.7752 31.5278 65.7404 31.0992 64.6615 31.0992ZM64.6615 38.5643L51.4401 45.3377L38.2187 38.5643V35.1674L51.4401 41.9001L64.6615 35.1674V38.5643ZM30.0824 53.4739C30.0824 53.8197 30.1434 54.1452 30.1841 54.491H21.9462C20.8234 54.491 19.9121 53.5756 19.9121 52.4569C19.9121 51.3382 20.8234 50.4228 21.9462 50.4228H30.0824V53.4739ZM26.0143 34.1503H30.1841C30.1434 34.4961 30.0824 34.8216 30.0824 35.1674V38.2185H26.0143C24.8956 38.2185 23.9802 37.3031 23.9802 36.1844C23.9802 35.0657 24.8956 34.1503 26.0143 34.1503ZM21.9462 44.3207C21.9462 43.2019 22.8615 42.2866 23.9802 42.2866H30.0824V46.3547H23.9802C22.8615 46.3547 21.9462 45.4394 21.9462 44.3207Z"
            fill="white"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1796_1653"
            x1={width}
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
            id="paint1_linear_1796_1653"
            x1="98.4923"
            y1="-5.16049"
            x2="-29.0729"
            y2="23.5753"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7A7FA2" />
            <stop offset="1" stop-color="#141622" />
          </linearGradient>
          <clipPath id="clip0_1796_1653">
            <rect
              width="48.8175"
              height="48.8175"
              fill="white"
              transform="translate(19.9121 19.9124)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 88 88" fill="none">
      <Circle
        cx="44"
        cy="44"
        r="43.6829"
        fill="url(#paint0_linear_1796_1653)"
        stroke="url(#paint1_linear_1796_1653)"
        stroke-width="0.634138"
      />
      <G clip-path="url(#clip0_1796_1653)">
        <Path
          d="M64.6615 31.0992H38.2187C35.9812 31.0992 34.1506 32.9299 34.1506 35.1674V53.4739C34.1506 54.5529 34.5792 55.5876 35.3421 56.3505C36.105 57.1135 37.1397 57.5421 38.2187 57.5421H64.6615C66.9193 57.5421 68.7296 55.7318 68.7296 53.4739V35.1674C68.7296 34.0884 68.301 33.0537 67.5381 32.2908C66.7752 31.5278 65.7404 31.0992 64.6615 31.0992ZM64.6615 38.5643L51.4401 45.3377L38.2187 38.5643V35.1674L51.4401 41.9001L64.6615 35.1674V38.5643ZM30.0824 53.4739C30.0824 53.8197 30.1434 54.1452 30.1841 54.491H21.9462C20.8234 54.491 19.9121 53.5756 19.9121 52.4569C19.9121 51.3382 20.8234 50.4228 21.9462 50.4228H30.0824V53.4739ZM26.0143 34.1503H30.1841C30.1434 34.4961 30.0824 34.8216 30.0824 35.1674V38.2185H26.0143C24.8956 38.2185 23.9802 37.3031 23.9802 36.1844C23.9802 35.0657 24.8956 34.1503 26.0143 34.1503ZM21.9462 44.3207C21.9462 43.2019 22.8615 42.2866 23.9802 42.2866H30.0824V46.3547H23.9802C22.8615 46.3547 21.9462 45.4394 21.9462 44.3207Z"
          fill="white"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1796_1653"
          x1={width}
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
          id="paint1_linear_1796_1653"
          x1="98.4923"
          y1="-5.16049"
          x2="-29.0729"
          y2="23.5753"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#7A7FA2" />
          <Stop offset="1" stop-color="#141622" />
        </LinearGradient>
        <ClipPath id="clip0_1796_1653">
          <Rect
            width="48.8175"
            height="48.8175"
            fill="white"
            transform="translate(19.9121 19.9124)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
