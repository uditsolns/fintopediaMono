import React from "react";
import { Spinner } from "reactstrap";

interface CircularLoadingProps {
  size?: string;  
  color?: string; 
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ size = "lg", color = "light" }) => {
  return (
    <React.Fragment>
      <Spinner size={size} color={color} />
    </React.Fragment>
  );
};

export default CircularLoading;

