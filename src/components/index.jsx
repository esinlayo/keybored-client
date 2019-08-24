import React from "react";
import MyButtonComponent from "./common/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <React.Fragment>
      <Link to="/play">
        <MyButtonComponent text="Single player" />
      </Link>
      <MyButtonComponent text="Multi player" />
    </React.Fragment>
  );
};

export default Index;
