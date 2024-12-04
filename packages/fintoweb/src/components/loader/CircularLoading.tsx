import React from "react";
import { Spinner } from "reactstrap";

const CircularLoading: React.FC = () => {
  return (
    <React.Fragment>
      <Spinner color="dark" size="sm"/>
    </React.Fragment>
  );
};

export default CircularLoading;