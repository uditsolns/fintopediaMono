import React from "react";
import { Spinner } from "reactstrap";

interface CircularLoadingProps {
  size?: string;
  color?: string;
  style?: React.CSSProperties
}

const CircularLoading: React.FC<CircularLoadingProps> = ({
  size = "lg",
  color = "light",
  style,
  ...rest
}) => {
  return (
    <React.Fragment>
      <Spinner size={size} color={color} style={style} {...rest} />
    </React.Fragment>
  );
};

export default CircularLoading;
