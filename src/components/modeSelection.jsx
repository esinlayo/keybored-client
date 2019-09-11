import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./gameContainer/gameContainer.css";

const Index = () => {
  return (
    <React.Fragment>
      <div
        id="modeSelection"
        style={{
          height: "100%"
        }}
      >
        <Link to="/play">
          <MyButtonComponent text="Single player" />
        </Link>
        <p />
        {/*
      <Link to="/multiplayer">
        <MyButtonComponent text="Multi player" />
      </Link>
      <p />
       */}
        <Link to="/withfriends">
          <MyButtonComponent text="Invite friends to play" />
        </Link>
      </div>
    </React.Fragment>
  );
};

function MyButtonComponent(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      style={{
        margin: "10px 0px 0px 0px",
        padding: "30px 2px",
        float: "center",
        clear: "both",
        width: "80%"
      }}
      component="div"
    >
      {props.text}
    </Button>
  );
}

export default Index;
