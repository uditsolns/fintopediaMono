import { Platform } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
import { ISVGProps } from "../../utils/types/main";

export const CheckBoxIcon2 = ({ width = 24 }: ISVGProps) => {
  if (Platform.OS === "web") {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5738 1.65039H6.42877C3.79083 1.65039 1.65234 3.78888 1.65234 6.42682V17.5718C1.65234 20.2098 3.79083 22.3482 6.42877 22.3482H17.5738C20.2118 22.3482 22.3502 20.2098 22.3502 17.5718V6.42682C22.3502 3.78888 20.2118 1.65039 17.5738 1.65039Z"
          fill="#D9EDFD"
        />
        <path
          d="M17.5738 1.65039H6.42877C3.79083 1.65039 1.65234 3.78888 1.65234 6.42682V17.5718C1.65234 20.2098 3.79083 22.3482 6.42877 22.3482H17.5738C20.2118 22.3482 22.3502 20.2098 22.3502 17.5718V6.42682C22.3502 3.78888 20.2118 1.65039 17.5738 1.65039Z"
          stroke="#0A0A0B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.6466 8.41797L10.278 16.3787L7.09375 13.9905"
          stroke="#0A0A0B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <Svg width={width} height={width} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.5738 1.65039H6.42877C3.79083 1.65039 1.65234 3.78888 1.65234 6.42682V17.5718C1.65234 20.2098 3.79083 22.3482 6.42877 22.3482H17.5738C20.2118 22.3482 22.3502 20.2098 22.3502 17.5718V6.42682C22.3502 3.78888 20.2118 1.65039 17.5738 1.65039Z"
        fill="#D9EDFD"
      />
      <Path
        d="M17.5738 1.65039H6.42877C3.79083 1.65039 1.65234 3.78888 1.65234 6.42682V17.5718C1.65234 20.2098 3.79083 22.3482 6.42877 22.3482H17.5738C20.2118 22.3482 22.3502 20.2098 22.3502 17.5718V6.42682C22.3502 3.78888 20.2118 1.65039 17.5738 1.65039Z"
        stroke="#0A0A0B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.6466 8.41797L10.278 16.3787L7.09375 13.9905"
        stroke="#0A0A0B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
