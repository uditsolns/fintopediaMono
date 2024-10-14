import { Platform } from "react-native";
import { Svg, Path, Circle, Defs, ClipPath, Rect, G } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const ContactIcon = ({ width = 27 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_28150)">
          <path
            d="M4.5 15.75V12.375C4.5 9.98805 5.44821 7.69887 7.13604 6.01104C8.82387 4.32321 11.1131 3.375 13.5 3.375C15.8869 3.375 18.1761 4.32321 19.864 6.01104C21.5518 7.69887 22.5 9.98805 22.5 12.375V15.75"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.25 21.375C20.25 23.2391 17.2282 24.75 13.5 24.75"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.5 15.75C4.5 15.1533 4.73705 14.581 5.15901 14.159C5.58097 13.7371 6.15326 13.5 6.75 13.5H7.875C8.47174 13.5 9.04403 13.7371 9.46599 14.159C9.88795 14.581 10.125 15.1533 10.125 15.75V19.125C10.125 19.7217 9.88795 20.294 9.46599 20.716C9.04403 21.1379 8.47174 21.375 7.875 21.375H6.75C6.15326 21.375 5.58097 21.1379 5.15901 20.716C4.73705 20.294 4.5 19.7217 4.5 19.125V15.75Z"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.875 15.75C16.875 15.1533 17.1121 14.581 17.534 14.159C17.956 13.7371 18.5283 13.5 19.125 13.5H20.25C20.8467 13.5 21.419 13.7371 21.841 14.159C22.2629 14.581 22.5 15.1533 22.5 15.75V19.125C22.5 19.7217 22.2629 20.294 21.841 20.716C21.419 21.1379 20.8467 21.375 20.25 21.375H19.125C18.5283 21.375 17.956 21.1379 17.534 20.716C17.1121 20.294 16.875 19.7217 16.875 19.125V15.75Z"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_28150">
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
      <G clip-path="url(#clip0_1795_28150)">
        <Path
          d="M4.5 15.75V12.375C4.5 9.98805 5.44821 7.69887 7.13604 6.01104C8.82387 4.32321 11.1131 3.375 13.5 3.375C15.8869 3.375 18.1761 4.32321 19.864 6.01104C21.5518 7.69887 22.5 9.98805 22.5 12.375V15.75"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M20.25 21.375C20.25 23.2391 17.2282 24.75 13.5 24.75"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M4.5 15.75C4.5 15.1533 4.73705 14.581 5.15901 14.159C5.58097 13.7371 6.15326 13.5 6.75 13.5H7.875C8.47174 13.5 9.04403 13.7371 9.46599 14.159C9.88795 14.581 10.125 15.1533 10.125 15.75V19.125C10.125 19.7217 9.88795 20.294 9.46599 20.716C9.04403 21.1379 8.47174 21.375 7.875 21.375H6.75C6.15326 21.375 5.58097 21.1379 5.15901 20.716C4.73705 20.294 4.5 19.7217 4.5 19.125V15.75Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M16.875 15.75C16.875 15.1533 17.1121 14.581 17.534 14.159C17.956 13.7371 18.5283 13.5 19.125 13.5H20.25C20.8467 13.5 21.419 13.7371 21.841 14.159C22.2629 14.581 22.5 15.1533 22.5 15.75V19.125C22.5 19.7217 22.2629 20.294 21.841 20.716C21.419 21.1379 20.8467 21.375 20.25 21.375H19.125C18.5283 21.375 17.956 21.1379 17.534 20.716C17.1121 20.294 16.875 19.7217 16.875 19.125V15.75Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_28150">
          <Rect width={width} height={width} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
