import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface CourseProgressProps {
  progress: number; // The progress percentage (e.g., 20, 50, 100)
}

const CourseProgress = ({ progress }: CourseProgressProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
      }}
    >
      {/* <CircularProgress
        variant="determinate"
        value={100}
        size={40}
        thickness={3}
        color="success"
        sx={{ position: "absolute" }}
      /> */}
      {/* Progress circle */}
      <CircularProgress
        variant="determinate"
        value={progress}
        size={40}
        thickness={3}
        // color="info"
        sx={{
          color: "gray",
        }}
      />
    </Box>
  );
};

export default CourseProgress;
