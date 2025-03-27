import { Platform } from "react-native";
import { Svg, Path, Circle, Defs, ClipPath, Rect, G } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const DownloadIcon = ({ width = 20,color = "white" }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_29449)">
          <path
            d="M3.33325 14.1666V15.8333C3.33325 16.2753 3.50885 16.6992 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6992 16.6666 16.2753 16.6666 15.8333V14.1666"
            stroke={color}
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.83325 9.16663L9.99992 13.3333L14.1666 9.16663"
            stroke={color}
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 3.33337V13.3334"
            stroke={color}
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_29449">
            <rect width={width} height={width} fill={color} />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} fill="none">
      <G clip-path="url(#clip0_1795_29449)">
        <Path
          d="M3.33325 14.1666V15.8333C3.33325 16.2753 3.50885 16.6992 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6992 16.6666 16.2753 16.6666 15.8333V14.1666"
          stroke={color}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M5.83325 9.16663L9.99992 13.3333L14.1666 9.16663"
          stroke={color}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10 3.33337V13.3334"
          stroke={color}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_29449">
          <Rect width={width} height="20" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
