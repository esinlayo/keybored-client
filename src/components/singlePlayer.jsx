import React, { Component } from "react";
import axios from "axios";

import ProgressContainer from "./gameContainer/progressContainer";
import ScoresBox from "./gameContainer/scoresBox";
import TypeBox from "./gameContainer/typeBox";
import Leaderboards from "./gameContainer/leaderboards";

import "./gameContainer/gameContainer.css";

import { generateRandomLeaderboardName } from "./../services";

const scoresapi = "http://192.168.1.75:8000/scores";

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
        {this.renderLeaderboards()}
      </React.Fragment>
    );
  }

  renderLeaderboards() {
    //if (this.state.mostRecentScores.length > 0)
    return (
      <div className="gameContainer">
        <Leaderboards
          mostRecentScores={this.state.mostRecentScores}
          leaderboard2Days={this.state.leaderboard2Days}
        />
      </div>
    );
    //else return "";
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

  async submitScores(speed) {
    const scoreEntry = {
      name: this.state.nameForScores,
      score: Math.round(speed)
    };
    try {
      await axios.post(scoresapi, scoreEntry);
      this.updateLeaderboards(speed);
    } catch (ex) {
      console.log(ex);
    }
  }

  async updateLeaderboards(score) {
    const origMostRecent = this.state.mostRecentScores;
    const orig2Days = this.state.leaderboard2Days;

    if (score) this.leaderboardsOptimisticUpdate(score);

    try {
      const { data } = await axios.get(scoresapi);
      const { mostRecentScores, topScores } = data;
      this.setState({ leaderboard2Days: topScores, mostRecentScores });
    } catch (ex) {
      alert("top wa");
      this.setState({
        leaderboard2Days: orig2Days,
        mostRecentScores: origMostRecent
      });
    }
  }

  leaderboardsOptimisticUpdate(score) {
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

  handleLeaderboardNameChange = name => {
    this.setState({ nameForScores: name });
  };

  handleChangeScoreSubmissionSettings = () => {
    this.setState({ enableScoreSubmission: !this.state.enableScoreSubmission });
  };
}

export default SinglePlayer;
