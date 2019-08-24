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
  state = {
    capsEnabled: true,
    punctuationEnabled: true
  };
  render() {
    const handleChange = name => event => {
      this.setState({ ...this.state, [name]: event.target.checked });
      this.props.onOptionsChange({ [name]: event.target.checked });
    };

    const { capsEnabled, punctuationEnabled } = this.state;
    const error = [capsEnabled, punctuationEnabled].filter(v => v).length !== 2;

    return (
      <div id="controlBox" className={classes.root} cd>
        <div style={classes.root}>
          <FormControl component="fieldset" style={classes.formControl}>
            <Button
              style={classes.controlbutton}
              size="small"
              color="secondary"
              variant="outlined"
            >
              Restart
            </Button>
            <Button
              style={classes.controlbutton}
              size="small"
              color="secondary"
              variant="outlined"
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
                    value="capsEnabled"
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
                    value="punctuationEnabled"
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
