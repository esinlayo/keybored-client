import React, { Component } from "react";

import ProgressContainer from "./gameContainer/progressContainer";
import ScoresBox from "./gameContainer/scoresBox";
import Instructions from "./gameContainer/instructions";
import TypeBox from "./gameContainer/typeBox";
import "./gameContainer/gameContainer.css";

class SinglePlayer extends Component {
  constructor() {
    super();

    this.state = {
      progress: 0,

      startTime: null,

      score: null,
      highScore: null
    };
  }

  render() {
    return (
      <div className="gameContainer">
        <ProgressContainer progress={this.state.progress} />
        <div style={{ textAlign: "right" }}>
          <ScoresBox
            score={this.state.score}
            highScore={this.state.highScore}
          />
          <TypeBox
            onChange={this.handleChange}
            onGameFinish={this.handleGameFinish}
            onGameStart={this.handleGameStart}
            startTime={this.state.startTime}
          />
        </div>
      </div>
    );
  }

  handleChange = progress => {
    this.setState({ progress });
  };

  handleGameStart = () => {
    this.setState({ startTime: new Date().getTime() });
  };

  handleGameFinish = speed => {
    if (speed) {
      if (speed > this.state.highScore) this.setState({ highScore: speed });
      this.setState({ score: speed });
    }
    this.setState({ startTime: null, progress: 0 });
  };
}

export default SinglePlayer;
