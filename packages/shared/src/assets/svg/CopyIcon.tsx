import { Platform } from "react-native";
import { Svg, Path, Circle, G, Defs, ClipPath, Rect } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const CopyIcon = ({ width = 24 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_29185)">
          <path
            d="M7 9.667C7 8.95967 7.28099 8.28131 7.78115 7.78115C8.28131 7.28099 8.95967 7 9.667 7H18.333C18.6832 7 19.03 7.06898 19.3536 7.20301C19.6772 7.33704 19.9712 7.53349 20.2189 7.78115C20.4665 8.0288 20.663 8.32281 20.797 8.64638C20.931 8.96996 21 9.31676 21 9.667V18.333C21 18.6832 20.931 19.03 20.797 19.3536C20.663 19.6772 20.4665 19.9712 20.2189 20.2189C19.9712 20.4665 19.6772 20.663 19.3536 20.797C19.03 20.931 18.6832 21 18.333 21H9.667C9.31676 21 8.96996 20.931 8.64638 20.797C8.32281 20.663 8.0288 20.4665 7.78115 20.2189C7.53349 19.9712 7.33704 19.6772 7.20301 19.3536C7.06898 19.03 7 18.6832 7 18.333V9.667Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.012 16.737C3.70534 16.5622 3.45027 16.3095 3.27258 16.0045C3.09488 15.6995 3.00085 15.353 3 15V5C3 3.9 3.9 3 5 3H15C15.75 3 16.158 3.385 16.5 4"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_29185">
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
      <G clip-path="url(#clip0_1795_29185)">
        <Path
          d="M7 9.667C7 8.95967 7.28099 8.28131 7.78115 7.78115C8.28131 7.28099 8.95967 7 9.667 7H18.333C18.6832 7 19.03 7.06898 19.3536 7.20301C19.6772 7.33704 19.9712 7.53349 20.2189 7.78115C20.4665 8.0288 20.663 8.32281 20.797 8.64638C20.931 8.96996 21 9.31676 21 9.667V18.333C21 18.6832 20.931 19.03 20.797 19.3536C20.663 19.6772 20.4665 19.9712 20.2189 20.2189C19.9712 20.4665 19.6772 20.663 19.3536 20.797C19.03 20.931 18.6832 21 18.333 21H9.667C9.31676 21 8.96996 20.931 8.64638 20.797C8.32281 20.663 8.0288 20.4665 7.78115 20.2189C7.53349 19.9712 7.33704 19.6772 7.20301 19.3536C7.06898 19.03 7 18.6832 7 18.333V9.667Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M4.012 16.737C3.70534 16.5622 3.45027 16.3095 3.27258 16.0045C3.09488 15.6995 3.00085 15.353 3 15V5C3 3.9 3.9 3 5 3H15C15.75 3 16.158 3.385 16.5 4"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1795_29185">
          <Rect width={width} height={width} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
