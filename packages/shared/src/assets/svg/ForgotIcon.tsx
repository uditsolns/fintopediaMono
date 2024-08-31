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

export const ForgotIcon = ({ width = 88, color }: ISVGProps) => {
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
          fill="url(#paint0_linear_1795_28878)"
          stroke="url(#paint1_linear_1795_28878)"
          stroke-width="0.634138"
        />
        <g clip-path="url(#clip0_1795_28878)">
          <path
            d="M44 23C46.6522 23 49.1957 24.0536 51.0711 25.9289C52.9464 27.8043 54 30.3478 54 33V39C55.5913 39 57.1174 39.6321 58.2426 40.7574C59.3679 41.8826 60 43.4087 60 45V57C60 58.5913 59.3679 60.1174 58.2426 61.2426C57.1174 62.3679 55.5913 63 54 63H34C32.4087 63 30.8826 62.3679 29.7574 61.2426C28.6321 60.1174 28 58.5913 28 57V45C28 43.4087 28.6321 41.8826 29.7574 40.7574C30.8826 39.6321 32.4087 39 34 39V33C34 30.3478 35.0536 27.8043 36.9289 25.9289C38.8043 24.0536 41.3478 23 44 23ZM44 47C42.9908 46.9997 42.0189 47.3808 41.2789 48.067C40.5389 48.7532 40.0857 49.6937 40.01 50.7L40 51C40 51.7911 40.2346 52.5645 40.6741 53.2223C41.1136 53.8801 41.7384 54.3928 42.4693 54.6955C43.2002 54.9983 44.0044 55.0775 44.7804 54.9231C45.5563 54.7688 46.269 54.3878 46.8284 53.8284C47.3878 53.269 47.7688 52.5563 47.9231 51.7804C48.0775 51.0044 47.9983 50.2002 47.6955 49.4693C47.3928 48.7384 46.8801 48.1136 46.2223 47.6741C45.5645 47.2346 44.7911 47 44 47ZM44 27C42.4087 27 40.8826 27.6321 39.7574 28.7574C38.6321 29.8826 38 31.4087 38 33V39H50V33C50 31.4087 49.3679 29.8826 48.2426 28.7574C47.1174 27.6321 45.5913 27 44 27Z"
            fill="white"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1795_28878"
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
            id="paint1_linear_1795_28878"
            x1="98.4923"
            y1="-5.16049"
            x2="-29.0729"
            y2="23.5753"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7A7FA2" />
            <stop offset="1" stop-color="#141622" />
          </linearGradient>
          <clipPath id="clip0_1795_28878">
            <rect
              width="48"
              height="48"
              fill="white"
              transform="translate(20 19)"
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
        fill="url(#paint0_linear_1795_28878)"
        stroke="url(#paint1_linear_1795_28878)"
        stroke-width="0.634138"
      />
      <G clip-path="url(#clip0_1795_28878)">
        <Path
          d="M44 23C46.6522 23 49.1957 24.0536 51.0711 25.9289C52.9464 27.8043 54 30.3478 54 33V39C55.5913 39 57.1174 39.6321 58.2426 40.7574C59.3679 41.8826 60 43.4087 60 45V57C60 58.5913 59.3679 60.1174 58.2426 61.2426C57.1174 62.3679 55.5913 63 54 63H34C32.4087 63 30.8826 62.3679 29.7574 61.2426C28.6321 60.1174 28 58.5913 28 57V45C28 43.4087 28.6321 41.8826 29.7574 40.7574C30.8826 39.6321 32.4087 39 34 39V33C34 30.3478 35.0536 27.8043 36.9289 25.9289C38.8043 24.0536 41.3478 23 44 23ZM44 47C42.9908 46.9997 42.0189 47.3808 41.2789 48.067C40.5389 48.7532 40.0857 49.6937 40.01 50.7L40 51C40 51.7911 40.2346 52.5645 40.6741 53.2223C41.1136 53.8801 41.7384 54.3928 42.4693 54.6955C43.2002 54.9983 44.0044 55.0775 44.7804 54.9231C45.5563 54.7688 46.269 54.3878 46.8284 53.8284C47.3878 53.269 47.7688 52.5563 47.9231 51.7804C48.0775 51.0044 47.9983 50.2002 47.6955 49.4693C47.3928 48.7384 46.8801 48.1136 46.2223 47.6741C45.5645 47.2346 44.7911 47 44 47ZM44 27C42.4087 27 40.8826 27.6321 39.7574 28.7574C38.6321 29.8826 38 31.4087 38 33V39H50V33C50 31.4087 49.3679 29.8826 48.2426 28.7574C47.1174 27.6321 45.5913 27 44 27Z"
          fill="white"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1795_28878"
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
          id="paint1_linear_1795_28878"
          x1="98.4923"
          y1="-5.16049"
          x2="-29.0729"
          y2="23.5753"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#7A7FA2" />
          <Stop offset="1" stop-color="#141622" />
        </LinearGradient>
        <ClipPath id="clip0_1795_28878">
          <Rect
            width="48"
            height="48"
            fill="white"
            transform="translate(20 19)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
