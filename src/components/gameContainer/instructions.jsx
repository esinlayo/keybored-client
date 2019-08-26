import React from "react";
import Typography from "@material-ui/core/Typography";

const Instructions = props => {
  function renderMessage() {
    if (props.startTime) return <font color="white">.</font>; // not a hack
    return "The game will start when you begin typing in the box below!";
  }

  return (
    <div component="div" id="instructions">
      <Typography component="span">{renderMessage()}</Typography>
    </div>
  );
};

export default Instructions;
