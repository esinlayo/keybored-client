import React from "react";
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

export default function ControlBox(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    capitalsEnabled: true,
    punctuationEnabled: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    props.onOptionsChange({ name: event.target.checked });
  };

  const { capitalsEnabled, punctuationEnabled } = state;
  const error =
    [capitalsEnabled, punctuationEnabled].filter(v => v).length !== 2;

  return (
    <div id="controlBox">
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <Button
            className={classes.controlbutton}
            size="small"
            color="secondary"
            variant="outlined"
          >
            Restart
          </Button>
          <Button
            className={classes.controlbutton}
            size="small"
            color="secondary"
            variant="outlined"
          >
            New Passage
          </Button>
          <FormGroup>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  className={classes.crazy}
                  checked={capitalsEnabled}
                  onChange={handleChange("capitalsEnabled")}
                  value="capitalsEnabled"
                  m={0}
                />
              }
              label="Capital Letters"
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  className={classes.crazy}
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
