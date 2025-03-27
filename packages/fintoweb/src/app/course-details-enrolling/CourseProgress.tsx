import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface CourseProgressProps {
  progress: number;
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
      <CircularProgress
        variant="determinate"
        value={progress}
        size={30}
        thickness={3}
        sx={{
          color: "gray",
        }}
      />
    </Box>
  );
};

export default CourseProgress;
