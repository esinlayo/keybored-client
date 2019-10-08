import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const classes = {
  formControlLabel: { marginLeft: 1, padding: 0 },
  checkboxesRemovePadding: { padding: 0 },
  controlbuttons: { margin: 3, display: "inline-block" },
  inline: { display: "inline-block", textAlign: "left" },
  button: { display: "inline-block", verticalAlign: "middle", margin: "4px" }
};

export default class ControlBox extends Component {
  render() {
    const handleChange = name => event => {
      this.props.onOptionsChange({ [name]: event.target.checked });
    };

    const { capsEnabled, punctuationEnabled } = this.props.nextPassageSettings;

    return (
      <div id="controlBox">
        <span style={{ display: "inline", verticalAlign: "middle" }} >
          <Button
            style={classes.button}
            className="controlElement controlButton"
            size="small" color="primary" variant="contained"
            disabled={this.props.startTime === null}
            onClick={this.props.onRestart}
          >
            Restart
          </Button>
          <Button
            style={classes.button}
            className="controlElement controlButton"
            size="small" color="primary" variant="contained"
            onClick={this.props.onNewPassage}
          >
            New Passage
          </Button>
        </span>
        <div style={{ display: "inline-block", verticalAlign: "middle" }} >
          <FormGroup style={{ display: "inline-block", textAlign: "left" }} >
            <FormControlLabel
              style={classes.formControlLabel}
              control={<Checkbox
                style={classes.checkboxesRemovePadding}
                color="primary"
                checked={capsEnabled}
                onChange={handleChange("capsEnabled")} />}
              label="Capital Letters"
            />
            <br />
            <FormControlLabel
              style={classes.formControlLabel}
              control={<Checkbox
                style={classes.checkboxesRemovePadding}
                color="primary"
                checked={punctuationEnabled}
                onChange={handleChange("punctuationEnabled")}
              />}
              label="Punctuation"
            />
          </FormGroup>
        </div>
      </div>
    );
  }
}
