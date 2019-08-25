import React from "react";

const ScoresBox = props => {
  if (props.score) {
    return (
      <div id="scoresBox">
        <span className="scoreMiniBox">
          <span className="textSayingScore">{"High Score"}</span>
          <span className="textScoreValue">{Math.round(props.highScore)}</span>
        </span>
        <span className="scoreMiniBox">
          <span className="textSayingScore">{"Score"}</span>
          <span className="textScoreValue">{Math.round(props.score)}</span>
        </span>
      </div>
    );
  } else return <div></div>;
};

export default ScoresBox;
