import React from "react";
import Typography from "@material-ui/core/Typography";

const ScoresBox = props => {
  if (1 === 1) {
    return (
      <div id="scoresBox">
        <div className="scoreMiniBox">
          <Typography
            variant="body2"
            component="span"
            className="textSayingScore"
          >
            {"High Score "}
          </Typography>
          <Typography variant="h5" component="span" className="textScoreValue">
            {Math.round(props.highScore)}
          </Typography>
          <Typography variant="caption" component="span">
            {" WPM"}
          </Typography>
        </div>
        <div className="scoreMiniBox">
          <Typography
            variant="body2"
            component="span"
            className="textSayingScore"
          >
            {"Score "}
          </Typography>
          <Typography variant="h5" component="span" className="textScoreValue">
            {Math.round(props.score)}
          </Typography>
          <Typography variant="caption" component="span">
            {" WPM"}
          </Typography>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default ScoresBox;
