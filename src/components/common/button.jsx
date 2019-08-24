import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  buttonPadding: {
    margin: "5px",
    padding: "30px",
    float: "center",
    clear: "both"
  }
});

function MyButtonComponent(props) {
  const { classes } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      className={classes.buttonPadding}
      component="div"
    >
      {props.text}
    </Button>
  );
}

export default withStyles(styles)(MyButtonComponent);
