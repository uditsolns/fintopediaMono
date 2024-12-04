import React, { CSSProperties } from "react";
import styles from "./ProgressBar.module.css";
import { colorPresets } from "shared/src/theme/color";

interface ProgressBarProps {
  level?: "Beginner" | "Intermediate" | "Advanced" | string;
  flex?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ level, flex = 1 }) => {
  return (
    <div className={styles.progressBarContainer} style={{ flex }}>
      <div className={styles.levelContainer}>
        {/* <div className={styles.progressBar}>
          <div
            className={styles.segment}
            style={{
              backgroundColor: ["Beginner", "Intermediate", "Advanced"].includes(
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
                level === "Intermediate" || level === "Advanced"
                  ? "#FFA11A"
                  : colorPresets.GRAY,
            }}
          />
          <div
            className={styles.segment}
            style={{
              backgroundColor:
                level === "Advanced" ? colorPresets.PRIMARY : colorPresets.GRAY,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          />
        </div> */}
        {level === "Beginner" ? (
          <div className={styles.progressBar}>
            <div
              className={styles.segment}
              style={{
                backgroundColor: [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ].includes(level || "")
                  ? colorPresets.PRIMARY
                  : undefined,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
            <div
              className={styles.segment}
              style={{
                backgroundColor: colorPresets.GRAY,
              }}
            />
            <div
              className={styles.segment}
              style={{
                backgroundColor: colorPresets.GRAY,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}
            />
          </div>
        ) : null}

        {level === "Intermediate" ? (
          <div className={styles.progressBar}>
            <div
              className={styles.segment}
              style={{
                backgroundColor: [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ].includes(level || "")
                  ? "#FFA11A"
                  : undefined,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
            <div
              className={styles.segment}
              style={{
                backgroundColor: "#FFA11A",
              }}
            />
            <div
              className={styles.segment}
              style={{
                backgroundColor: colorPresets.GRAY,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}
            />
          </div>
        ) : null}

        {level === "Advanced" ? (
          <div className={styles.progressBar}>
            <div
              className={styles.segment}
              style={{
                backgroundColor: [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ].includes(level || "")
                  ? "#FF5E1A"
                  : undefined,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
            <div
              className={styles.segment}
              style={{
                backgroundColor: "#FF5E1A",
              }}
            />
            <div
              className={styles.segment}
              style={{
                backgroundColor: "#FF5E1A",
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}
            />
          </div>
        ) : null}
        <span className={styles.text}>{level}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
