import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <React.Fragment>
      <Link to="/play">
        <MyButtonComponent text="Single player" />
      </Link>
      <br />
      <Link to="/multiplayer">
        <MyButtonComponent text="Multi player" />
      </Link>
      <br />
      <Link to="/playwithfriends">
        <MyButtonComponent text="Invite friends to play" />
      </Link>
    </React.Fragment>
  );
};

function MyButtonComponent(props) {
  const { classes } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      style={{
        margin: "5px",
        padding: "30px",
        float: "center",
        clear: "both",
        width: 300
      }}
      component="div"
    >
      {props.text}
    </Button>
  );
}

export default Index;
