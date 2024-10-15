import React from "react";
import { Spinner } from "reactstrap";

const CircularLoading: React.FC = () => {
  return (
    <React.Fragment>
      <Spinner color="dark" size="md"/>
    </React.Fragment>
  );
};

export default CircularLoading;