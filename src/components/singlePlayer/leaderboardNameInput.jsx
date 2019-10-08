import React, { Component } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

class LeaderboardNameInput extends Component {
  render() {
    const handleCheckboxChange = name => event => {
      this.props.onOptionsChange({ [name]: event.target.checked });
    };

    const handleNameChange = ({ currentTarget: input }) => {
      this.props.onLeaderboardNameChange(input.value);
    };

    return (
      <div style={{ display: "inline-block", verticalAlign: "middle" }} >
        <FormGroup style={{ display: "inline-block", textAlign: "left" }}>
          <FormControlLabel
            style={{ marginLeft: 1, padding: 0, marginRight: 5 }}
            control={<Checkbox
              style={{ padding: 0 }} color="primary"
              checked={this.props.enableScoreSubmission}
              onChange={handleCheckboxChange("enableScoreSubmission")} />}
            label="Submit my scores to leaderboards as " />
          <input
            style={{ padding: 0, margin: 0 }}
            type="text" maxLength="25"
            onChange={handleNameChange}
            value={this.props.nameForScores} />
        </FormGroup>
      </div>
    );
  }
}

export default LeaderboardNameInput;
