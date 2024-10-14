import { Platform } from "react-native";
import { Svg, Path, Circle, Defs, ClipPath, Rect, G } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const CertificationIcon2 = ({ width = 27 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_28107)">
          <path
            d="M15.75 3.375V7.875C15.75 8.17337 15.8685 8.45952 16.0795 8.67049C16.2905 8.88147 16.5766 9 16.875 9H21.375"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.625 9V5.625C5.625 5.02826 5.86205 4.45597 6.28401 4.03401C6.70597 3.61205 7.27826 3.375 7.875 3.375H15.75L21.375 9V21.375C21.375 21.9717 21.1379 22.544 20.716 22.966C20.294 23.3879 19.7217 23.625 19.125 23.625H13.5"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.375 15.75C3.375 16.6451 3.73058 17.5036 4.36351 18.1365C4.99645 18.7694 5.85489 19.125 6.75 19.125C7.64511 19.125 8.50355 18.7694 9.13649 18.1365C9.76942 17.5036 10.125 16.6451 10.125 15.75C10.125 14.8549 9.76942 13.9964 9.13649 13.3635C8.50355 12.7306 7.64511 12.375 6.75 12.375C5.85489 12.375 4.99645 12.7306 4.36351 13.3635C3.73058 13.9964 3.375 14.8549 3.375 15.75Z"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.0625 19.125L3.375 24.75L6.75 23.0625L10.125 24.75L8.4375 19.125"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_28107">
            <rect width={width} height={width} fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      fill="none"
    >
      <G clip-path="url(#clip0_1795_28107)">
        <Path
          d="M15.75 3.375V7.875C15.75 8.17337 15.8685 8.45952 16.0795 8.67049C16.2905 8.88147 16.5766 9 16.875 9H21.375"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M5.625 9V5.625C5.625 5.02826 5.86205 4.45597 6.28401 4.03401C6.70597 3.61205 7.27826 3.375 7.875 3.375H15.75L21.375 9V21.375C21.375 21.9717 21.1379 22.544 20.716 22.966C20.294 23.3879 19.7217 23.625 19.125 23.625H13.5"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3.375 15.75C3.375 16.6451 3.73058 17.5036 4.36351 18.1365C4.99645 18.7694 5.85489 19.125 6.75 19.125C7.64511 19.125 8.50355 18.7694 9.13649 18.1365C9.76942 17.5036 10.125 16.6451 10.125 15.75C10.125 14.8549 9.76942 13.9964 9.13649 13.3635C8.50355 12.7306 7.64511 12.375 6.75 12.375C5.85489 12.375 4.99645 12.7306 4.36351 13.3635C3.73058 13.9964 3.375 14.8549 3.375 15.75Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M5.0625 19.125L3.375 24.75L6.75 23.0625L10.125 24.75L8.4375 19.125"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_28107">
          <Rect width={width} height={width} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
