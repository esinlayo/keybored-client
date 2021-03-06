import React, { Component } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { webServerURL } from '../../config.json'
import discord_icon from "../../img/discord.png";
import google_icon from "../../img/google.png";

class LeaderboardNameInput extends Component {
  render() {
    const handleCheckboxChange = name => event => {
      if (this.props.auth !== null && this.props.auth !== undefined)
        this.props.onCheckboxChange({ [name]: event.target.checked });
    };
    return (
      <div style={{ display: "inline-block", verticalAlign: "middle", minHeight: 30 }} >
        {
          this.props.auth === null ? <font color="white">.</font> : <React.Fragment>
            <FormGroup style={{ display: "inline-block", textAlign: "left" }}>
              <FormControlLabel
                style={{ marginLeft: 1, padding: 0, marginRight: 5 }}
                control={<Checkbox
                  style={{ padding: 0 }} color="primary"
                  checked={this.props.enableScoreSubmission}
                  onChange={handleCheckboxChange("enableScoreSubmission")} />} />
              <Typography variant="body1" component="span">
                {"Submit my scores to leaderboards "}
              </Typography>

              {this.props.auth === undefined ?
                <React.Fragment>
                  <Typography variant="body1" component="span">
                    {"using my name on"}
                  </Typography>
                  <div style={{ display: "inline-block" }}>
                    <a href={`${webServerURL}/auth/login/discord`} >
                      <img src={discord_icon} alt="Discord Icon" style={{ padding: "0px 3px ", width: 20, height: 20 }} />
                    </a>
                    <a href={`${webServerURL}/auth/login/google`} >
                      <img src={google_icon} alt="Google Icon" style={{ padding: "0px 3px ", width: 20, height: 20 }} />
                    </a>
                  </div>
                </React.Fragment>
                :
                <React.Fragment>
                  <Typography variant="body1" component="span">{`as ${this.props.auth}`}</Typography>

                  <Button style={{ display: "inline-block", verticalAlign: "middle", margin: "0px 0px 0px 10px", padding: "2px" }}
                    size="small" color="primary" variant="outlined"
                    onClick={() => {
                      this.props.onChangeScoreSubmissionSettings("disable");
                      this.props.setAuth(undefined);
                      document.cookie = "uid=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    }}>
                    clear name</Button>

                </React.Fragment>
              }
            </FormGroup>
          </React.Fragment>
        }
      </div >
    );
  }
}

export default LeaderboardNameInput;
