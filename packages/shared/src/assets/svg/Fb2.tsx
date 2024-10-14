import { Platform } from "react-native";
import { Svg, Path, Rect, G, Defs, ClipPath } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const Fb2 = ({ width = 40 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg width={width} height={width} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={width} height={width} rx="20" fill="#292B38"/>
      <g clip-path="url(#clip0_1796_3679)">
      <path d="M30 20C30 14.4771 25.5229 10 20 10C14.4771 10 10 14.4771 10 20C10 24.9912 13.6568 29.1283 18.4375 29.8785V22.8906H15.8984V20H18.4375V17.7969C18.4375 15.2906 19.9305 13.9062 22.2146 13.9062C23.3084 13.9062 24.4531 14.1016 24.4531 14.1016V16.5625H23.1922C21.95 16.5625 21.5625 17.3334 21.5625 18.125V20H24.3359L23.8926 22.8906H21.5625V29.8785C26.3432 29.1283 30 24.9912 30 20Z" fill="#FCFCFC"/>
      </g>
      <defs>
      <clipPath id="clip0_1796_3679">
      <rect width="20" height="20" fill="white" transform="translate(10 10)"/>
      </clipPath>
      </defs>
      </svg>
      

    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 40 40" fill="none">
    <Rect width={width} height={width} rx="20" fill="#292B38"/>
    <G clip-path="url(#clip0_1796_3679)">
    <Path d="M30 20C30 14.4771 25.5229 10 20 10C14.4771 10 10 14.4771 10 20C10 24.9912 13.6568 29.1283 18.4375 29.8785V22.8906H15.8984V20H18.4375V17.7969C18.4375 15.2906 19.9305 13.9062 22.2146 13.9062C23.3084 13.9062 24.4531 14.1016 24.4531 14.1016V16.5625H23.1922C21.95 16.5625 21.5625 17.3334 21.5625 18.125V20H24.3359L23.8926 22.8906H21.5625V29.8785C26.3432 29.1283 30 24.9912 30 20Z" fill="#FCFCFC"/>
    </G>
    <Defs>
    <ClipPath id="clip0_1796_3679">
    <Rect width="20" height="20" fill="white" transform="translate(10 10)"/>
    </ClipPath>
    </Defs>
    </Svg>
    

  );
};
