import React from "react";
import styles from "./LoadingOverlay.module.css";
import LoadingAtom from "./LoadingAtom";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <div className={styles.loadingOverlay}>
      {/* <p>Loading...</p>  */}
      <LoadingAtom
        style={{
          height: "5rem",
          width: "5rem",
        }}
      />
    </div>
  );
};
