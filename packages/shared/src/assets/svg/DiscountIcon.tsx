import { Platform } from "react-native";
import { Svg, Path, Circle, G, Defs, ClipPath, Rect } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const DiscountIcon = ({ width = 30,color='white' }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_29192)">
          <path
            d="M18.75 6.25V8.75"
            stroke={color}
            stroke-width="1.875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.75 13.75V16.25"
            stroke={color}
            stroke-width="1.875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.75 21.25V23.75"
            stroke={color}
            stroke-width="1.875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.25 6.25H23.75C24.413 6.25 25.0489 6.51339 25.5178 6.98223C25.9866 7.45107 26.25 8.08696 26.25 8.75V12.5C25.587 12.5 24.9511 12.7634 24.4822 13.2322C24.0134 13.7011 23.75 14.337 23.75 15C23.75 15.663 24.0134 16.2989 24.4822 16.7678C24.9511 17.2366 25.587 17.5 26.25 17.5V21.25C26.25 21.913 25.9866 22.5489 25.5178 23.0178C25.0489 23.4866 24.413 23.75 23.75 23.75H6.25C5.58696 23.75 4.95107 23.4866 4.48223 23.0178C4.01339 22.5489 3.75 21.913 3.75 21.25V17.5C4.41304 17.5 5.04893 17.2366 5.51777 16.7678C5.98661 16.2989 6.25 15.663 6.25 15C6.25 14.337 5.98661 13.7011 5.51777 13.2322C5.04893 12.7634 4.41304 12.5 3.75 12.5V8.75C3.75 8.08696 4.01339 7.45107 4.48223 6.98223C4.95107 6.51339 5.58696 6.25 6.25 6.25Z"
            stroke={color}
            stroke-width="1.875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_29192">
            <rect width={width} height={width} fill={color} />
          </clipPath>
        </defs>
      </svg>
    );
  }
  return (
    <Svg
      width={width}
      height={width}
      viewBox="0 0 30 30"
      fill="none"
    >
      <G clip-path="url(#clip0_1795_29192)">
        <Path
          d="M18.75 6.25V8.75"
          stroke={color}
          stroke-width="1.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.75 13.75V16.25"
          stroke={color}
          stroke-width="1.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.75 21.25V23.75"
          stroke={color}
          stroke-width="1.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6.25 6.25H23.75C24.413 6.25 25.0489 6.51339 25.5178 6.98223C25.9866 7.45107 26.25 8.08696 26.25 8.75V12.5C25.587 12.5 24.9511 12.7634 24.4822 13.2322C24.0134 13.7011 23.75 14.337 23.75 15C23.75 15.663 24.0134 16.2989 24.4822 16.7678C24.9511 17.2366 25.587 17.5 26.25 17.5V21.25C26.25 21.913 25.9866 22.5489 25.5178 23.0178C25.0489 23.4866 24.413 23.75 23.75 23.75H6.25C5.58696 23.75 4.95107 23.4866 4.48223 23.0178C4.01339 22.5489 3.75 21.913 3.75 21.25V17.5C4.41304 17.5 5.04893 17.2366 5.51777 16.7678C5.98661 16.2989 6.25 15.663 6.25 15C6.25 14.337 5.98661 13.7011 5.51777 13.2322C5.04893 12.7634 4.41304 12.5 3.75 12.5V8.75C3.75 8.08696 4.01339 7.45107 4.48223 6.98223C4.95107 6.51339 5.58696 6.25 6.25 6.25Z"
          stroke={color}
          stroke-width="1.875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_29192">
          <Rect width={width} height={width} fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
