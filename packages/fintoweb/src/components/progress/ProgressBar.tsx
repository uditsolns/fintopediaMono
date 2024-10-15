import React, { CSSProperties } from "react";
import styles from "./ProgressBar.module.css";
import { colorPresets } from "shared/src/theme/color";

interface ProgressBarProps {
  level?: "Beginner" | "Intermediate" | "Expert" | string;
  flex?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ level, flex = 1 }) => {
  return (
    <div className={styles.progressBarContainer} style={{ flex }}>
      <div className={styles.levelContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.segment}
            style={{
              backgroundColor: ["Beginner", "Intermediate", "Expert"].includes(
                level || ""
              )
                ? colorPresets.PRIMARY
                : undefined,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          />
          <div
            className={styles.segment}
            style={{
              backgroundColor:
                level === "Intermediate" || level === "Expert"
                  ? "#FFA11A"
                  : colorPresets.GRAY,
            }}
          />
          <div
            className={styles.segment}
            style={{
              backgroundColor:
                level === "Expert" ? colorPresets.PRIMARY : colorPresets.GRAY,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          />
        </div>
        <span className={styles.text}>{level}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
