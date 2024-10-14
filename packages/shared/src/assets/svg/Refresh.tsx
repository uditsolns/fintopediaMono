import { Platform } from "react-native";
import { Svg, Path, G, Defs, ClipPath, Rect } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Refresh = ({ width, color = "white" }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1817_2834)">
          <path
            d="M19.9321 13.041C19.7433 14.481 19.166 15.8424 18.2622 16.9792C17.3585 18.116 16.1623 18.9854 14.802 19.4941C13.4418 20.0027 11.9687 20.1315 10.5407 19.8666C9.11282 19.6017 7.78395 18.9531 6.69664 17.9904C5.60933 17.0276 4.8046 15.787 4.36876 14.4017C3.93292 13.0164 3.8824 11.5385 4.22264 10.1266C4.56287 8.71476 5.28102 7.42214 6.30006 6.3874C7.3191 5.35266 8.60059 4.61483 10.0071 4.25304C13.9061 3.25304 17.9421 5.26004 19.4321 9.00004"
            stroke={color}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 4V9H15"
            stroke={color}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1817_2834">
            <rect width={width} height={width} fill={color} />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1817_2834)">
        <Path
          d="M19.9321 13.041C19.7433 14.481 19.166 15.8424 18.2622 16.9792C17.3585 18.116 16.1623 18.9854 14.802 19.4941C13.4418 20.0027 11.9687 20.1315 10.5407 19.8666C9.11282 19.6017 7.78395 18.9531 6.69664 17.9904C5.60933 17.0276 4.8046 15.787 4.36876 14.4017C3.93292 13.0164 3.8824 11.5385 4.22264 10.1266C4.56287 8.71476 5.28102 7.42214 6.30006 6.3874C7.3191 5.35266 8.60059 4.61483 10.0071 4.25304C13.9061 3.25304 17.9421 5.26004 19.4321 9.00004"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M20 4V9H15"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1817_2834">
          <Rect width={width} height={width} fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
