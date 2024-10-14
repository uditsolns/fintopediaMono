import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";

export const interTight: NextFontWithVariable = localFont({
  src: [
    {
      path: "../assets/fonts/InterTight-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../assets/fonts/InterTight-SemiBold.ttf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../assets/fonts/InterTight-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/InterTight-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-interTight",
});
