import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div id="modeSelection" style={{ height: "100%" }} >
      <BigButton to="/play" text="Single player" />
      <BigButton to="/withfriends" text="Invite friends to play" />
    </div>
  );
};

function BigButton(props) {
  return (
    <div  >
      <Button
        style={{
          margin: "10px 0px 0px 0px",
          padding: "30px 2px",
          float: "center",
          clear: "both",
          width: "80%",
          maxWidth: "400px"
        }}
        component={Link} to={props.to}
        variant="contained" color="primary" size="medium">
        {props.text}
      </Button>
    </div>
  );
}

export default Index;
