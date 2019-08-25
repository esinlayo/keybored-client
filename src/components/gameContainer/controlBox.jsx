import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const classes = {
  formControl: {
    float: "right",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "turquoise"
  },
  formControlLabel: {
    margin: 0,
    padding: 0
  },
  checkboxesRemovePadding: {
    padding: 0
  },
  controlbuttonsAddPadding: {
    margin: 3
  }
};

export default class ControlBox extends Component {
  render() {
    const handleChange = name => event => {
      this.props.onOptionsChange({ [name]: event.target.checked });
    };

    const { capsEnabled, punctuationEnabled } = this.props.nextPassageSettings;

    return (
      <FormControl component="fieldset" id="controlBox">
        <Button
          style={classes.controlbuttonsAddPadding}
          size="small"
          color="primary"
          variant="contained"
          disabled={this.props.startTime === null}
          onClick={this.props.onRestart}
        >
          Restart
        </Button>
        <Button
          style={classes.controlbuttonsAddPadding}
          size="small"
          color="primary"
          variant="contained"
          onClick={this.props.onNewPassage}
        >
          New Passage
        </Button>
        <FormGroup>
          <FormControlLabel
            style={classes.formControlLabel}
            m={0}
            p={0}
            control={
              <Checkbox
                style={classes.checkboxesRemovePadding}
                color="primary"
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
                style={classes.checkboxesRemovePadding}
                color="primary"
                checked={punctuationEnabled}
                onChange={handleChange("punctuationEnabled")}
              />
            }
            label="Punctuation"
          />
        </FormGroup>
      </FormControl>
    );
  }
}
