import { StyleSheet } from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../theme/metrics";

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  flexCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fullPageLoading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  underline: {
    textDecorationLine: "underline",
  },
  play: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
