import { Platform } from "react-native";
import { Svg, Path, Rect } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const SupportEmailIcon = ({ width = 40 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={width} height={width} rx="20" fill="#222431" />
        <path
          d="M11.25 17.2242V24.375C11.25 25.7557 12.3693 26.875 13.75 26.875H26.25C27.6307 26.875 28.75 25.7557 28.75 24.375V17.2242L21.3102 21.8026C20.5067 22.297 19.4933 22.297 18.6898 21.8026L11.25 17.2242Z"
          fill="#FCFCFC"
        />
        <path
          d="M28.75 15.7565V15.625C28.75 14.2443 27.6307 13.125 26.25 13.125H13.75C12.3693 13.125 11.25 14.2443 11.25 15.625V15.7565L19.3449 20.738C19.7466 20.9852 20.2534 20.9852 20.6551 20.738L28.75 15.7565Z"
          fill="#FCFCFC"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 40 40" fill="none">
      <Rect width={width} height={width} rx="20" fill="#222431" />
      <Path
        d="M11.25 17.2242V24.375C11.25 25.7557 12.3693 26.875 13.75 26.875H26.25C27.6307 26.875 28.75 25.7557 28.75 24.375V17.2242L21.3102 21.8026C20.5067 22.297 19.4933 22.297 18.6898 21.8026L11.25 17.2242Z"
        fill="#FCFCFC"
      />
      <Path
        d="M28.75 15.7565V15.625C28.75 14.2443 27.6307 13.125 26.25 13.125H13.75C12.3693 13.125 11.25 14.2443 11.25 15.625V15.7565L19.3449 20.738C19.7466 20.9852 20.2534 20.9852 20.6551 20.738L28.75 15.7565Z"
        fill="#FCFCFC"
      />
    </Svg>
  );
};
