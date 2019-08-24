import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    float: "right",
    flexDirection: "row",
    background: "yellow"
  },
  formControl: {
    display: "flex",
    flexDirection: "row"
  },
  formControlLabel: {
    margin: 0,
    padding: 0
  },
  crazy: {
    padding: 0
  },
  controlbutton: {
    margin: 3
  }
}));

const classes = {
  root: {
    float: "right",
    flexDirection: "row",
    background: "yellow"
  },
  formControl: {
    display: "flex",
    flexDirection: "row"
  },
  formControlLabel: {
    margin: 0,
    padding: 0
  },
  crazy: {
    padding: 0
  },
  controlbutton: {
    margin: 3
  }
};

export default class ControlBox extends Component {
  render() {
    const handleChange = name => event => {
      this.props.onOptionsChange({ [name]: event.target.checked });
    };

    const capsEnabled = this.props.capsEnabled;
    const punctuationEnabled = this.props.punctuationEnabled;

    return (
      <div id="controlBox" className={classes.root}>
        <div style={classes.root}>
          <FormControl component="fieldset" style={classes.formControl}>
            <Button
              style={classes.controlbutton}
              size="small"
              color="secondary"
              variant="outlined"
              disabled={this.props.startTime === null}
              onClick={this.props.onRestart}
            >
              Restart
            </Button>
            <Button
              style={classes.controlbutton}
              size="small"
              color="secondary"
              variant="outlined"
              onClick={this.props.onNewPassage}
            >
              New Passage
            </Button>
            <FormGroup>
              <FormControlLabel
                style={classes.formControlLabel}
                control={
                  <Checkbox
                    style={classes.crazy}
                    checked={capsEnabled}
                    onChange={handleChange("capsEnabled")}
                    m={0}
                  />
                }
                label="Capital Letters"
              />
              <FormControlLabel
                style={classes.formControlLabel}
                control={
                  <Checkbox
                    style={classes.crazy}
                    checked={punctuationEnabled}
                    onChange={handleChange("punctuationEnabled")}
                  />
                }
                label="Punctuation"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}
