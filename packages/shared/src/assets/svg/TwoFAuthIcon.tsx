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

export const TwoFAuthIcon = ({ width = 88, color }: ISVGProps) => {
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
          fill="url(#paint0_linear_1796_1780)"
          stroke="url(#paint1_linear_1796_1780)"
          stroke-width="0.634138"
        />
        <g clip-path="url(#clip0_1796_1780)">
          <path
            d="M62 44C62 46.3638 61.5344 48.7044 60.6298 50.8883C59.7253 53.0722 58.3994 55.0565 56.7279 56.7279C55.0565 58.3994 53.0722 59.7253 50.8883 60.6298C48.7044 61.5344 46.3638 62 44 62C41.6362 62 39.2956 61.5344 37.1117 60.6298C34.9278 59.7253 32.9435 58.3994 31.2721 56.7279C29.6006 55.0565 28.2748 53.0722 27.3702 50.8883C26.4656 48.7044 26 46.3638 26 44C26 39.2261 27.8964 34.6477 31.2721 31.2721C34.6477 27.8964 39.2261 26 44 26C48.7739 26 53.3523 27.8964 56.7279 31.2721C60.1036 34.6477 62 39.2261 62 44Z"
            fill="white"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M44 40C44 41.0609 44.4214 42.0783 45.1716 42.8284C45.9217 43.5786 46.9391 44 48 44C49.0609 44 50.0783 43.5786 50.8284 42.8284C51.5786 42.0783 52 41.0609 52 40C52 38.9391 51.5786 37.9217 50.8284 37.1716C50.0783 36.4214 49.0609 36 48 36C46.9391 36 45.9217 36.4214 45.1716 37.1716C44.4214 37.9217 44 38.9391 44 40Z"
            fill="white"
            stroke="#121522"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M45 43L37 51L40 54"
            stroke="#121522"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M44 50L41 47"
            stroke="#121522"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1796_1780"
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
            id="paint1_linear_1796_1780"
            x1="98.4923"
            y1="-5.16049"
            x2="-29.0729"
            y2="23.5753"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7A7FA2" />
            <stop offset="1" stop-color="#141622" />
          </linearGradient>
          <clipPath id="clip0_1796_1780">
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
    <Svg width={width} height={width} viewBox="0 0 88 88" fill="none">
      <Circle
        cx="44"
        cy="44"
        r="43.6829"
        fill="url(#paint0_linear_1796_1780)"
        stroke="url(#paint1_linear_1796_1780)"
        stroke-width="0.634138"
      />
      <G clip-path="url(#clip0_1796_1780)">
        <Path
          d="M62 44C62 46.3638 61.5344 48.7044 60.6298 50.8883C59.7253 53.0722 58.3994 55.0565 56.7279 56.7279C55.0565 58.3994 53.0722 59.7253 50.8883 60.6298C48.7044 61.5344 46.3638 62 44 62C41.6362 62 39.2956 61.5344 37.1117 60.6298C34.9278 59.7253 32.9435 58.3994 31.2721 56.7279C29.6006 55.0565 28.2748 53.0722 27.3702 50.8883C26.4656 48.7044 26 46.3638 26 44C26 39.2261 27.8964 34.6477 31.2721 31.2721C34.6477 27.8964 39.2261 26 44 26C48.7739 26 53.3523 27.8964 56.7279 31.2721C60.1036 34.6477 62 39.2261 62 44Z"
          fill="white"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M44 40C44 41.0609 44.4214 42.0783 45.1716 42.8284C45.9217 43.5786 46.9391 44 48 44C49.0609 44 50.0783 43.5786 50.8284 42.8284C51.5786 42.0783 52 41.0609 52 40C52 38.9391 51.5786 37.9217 50.8284 37.1716C50.0783 36.4214 49.0609 36 48 36C46.9391 36 45.9217 36.4214 45.1716 37.1716C44.4214 37.9217 44 38.9391 44 40Z"
          fill="white"
          stroke="#121522"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M45 43L37 51L40 54"
          stroke="#121522"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M44 50L41 47"
          stroke="#121522"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1796_1780"
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
          id="paint1_linear_1796_1780"
          x1="98.4923"
          y1="-5.16049"
          x2="-29.0729"
          y2="23.5753"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#7A7FA2" />
          <Stop offset="1" stop-color="#141622" />
        </LinearGradient>
        <ClipPath id="clip0_1796_1780">
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
