import React, { Component } from "react";
import axios from "axios";


import ProgressContainer from "./gameContainer/progressContainer";
import ScoresBox from "./gameContainer/scoresBox";
import TypeBox from "./gameContainer/typeBox";
import Leaderboards from "./gameContainer/leaderboards";

import "./gameContainer/gameContainer.css";
import config from "./../config";
import { generateRandomLeaderboardName } from "./../services";


axios.interceptors.response.use(null, err => {
  alert(`An unexpected error occured in connecting to the server...\r\nThe server is likely down. :(\r\n${err}`);
  return Promise.reject(err);
})

class SinglePlayer extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,

      startTime: null,

      score: null,
      highScore: null,

      enableScoreSubmission: true,
      nameForScores: generateRandomLeaderboardName(),
      mostRecentScores: [],
      leaderboard2Days: []
    };
  }

  async componentDidMount() {
    await this.updateLeaderboards();
  }

  render() {
    return (
      <React.Fragment>
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
              onLeaderboardNameChange={this.handleLeaderboardNameChange}
              nameForScores={this.state.nameForScores}
              enableScoreSubmission={this.state.enableScoreSubmission}
              onChangeScoreSubmissionSettings={
                this.handleChangeScoreSubmissionSettings
              }
              leaderboardRetrieved={this.state.mostRecentScores.length !== 0}
            />
          </div>
        </div>
        <div className="gameContainer">
          <Leaderboards
            mostRecentScores={this.state.mostRecentScores}
            leaderboard2Days={this.state.leaderboard2Days}
          />
        </div>
      </React.Fragment>
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

      if (this.state.enableScoreSubmission) this.submitScores(speed);
    }
    this.setState({ startTime: null, progress: 0 });
  };

  submitScores = async speed => {
    const scoreEntry = {
      name: this.state.nameForScores,
      score: Math.round(speed)
    };
    try {
      await axios.post(config.scoresApi, scoreEntry, {
        headers: { "Content-Size": 4 }
      });
      this.updateLeaderboards(speed);
    } catch (ex) {
      console.log("An unexpected error occured while trying to contact the server...", ex);
    }
  };

  handleLeaderboardNameChange = name => {
    this.setState({ nameForScores: name });
  };

  handleChangeScoreSubmissionSettings = () => {
    // Ideally would like to use nextPassageSettings (found in TypeBox component's state)
    //  to check if capital letters and punctuation is included, and only allow
    //  enabling of score submission if both are included. But this would involve
    //  lifting the state up... yet again.
    // I explore other state management for play with friends mode.
    this.setState({ enableScoreSubmission: !this.state.enableScoreSubmission });
  };

  async updateLeaderboards(score) {
    const origMostRecent = this.state.mostRecentScores;
    const orig2Days = this.state.leaderboard2Days;

    if (score) this.updateLdrBoardOptimistically(score);

    try {
      const { data } = await axios.get(config.scoresApi);
      const { mostRecentScores, topScores } = data;
      this.setState({ leaderboard2Days: topScores, mostRecentScores });
    } catch (ex) {
      console.log("Something failed while trying to update leaderboards with the new score.")
      this.setState({
        leaderboard2Days: orig2Days,
        mostRecentScores: origMostRecent
      });
    }
  }

  updateLdrBoardOptimistically = score => {
    const origMostRecent = this.state.mostRecentScores;
    const orig2Days = this.state.leaderboard2Days;
    const scoreEntry = {
      name: this.state.nameForScores,
      score,
      date: JSON.stringify(new Date(Date.now()))
    };

    let mostRecentScores = [
      scoreEntry,
      ...origMostRecent.slice(0, origMostRecent.length)
    ];
    if (mostRecentScores.length > 10)
      mostRecentScores = mostRecentScores.slice(0, 10);

    const replacementIdx = orig2Days.findIndex(e => e < score);
    if (replacementIdx !== -1)
      this.setState({
        leaderboard2Days: orig2Days.splice(replacementIdx, 1, scoreEntry)
      });

    this.setState({ mostRecentScores });
  }
}

export default SinglePlayer;
