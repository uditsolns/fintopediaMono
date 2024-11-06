import React from "react";
import { Spinner } from "reactstrap";

interface LoadingAtomProps {
  size?: string;
  color?: string;
  style?: React.CSSProperties;
}

const LoadingAtom: React.FC<LoadingAtomProps> = ({
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

export default LoadingAtom;
