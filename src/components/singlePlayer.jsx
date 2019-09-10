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

      leaderboard2Days: [],
      leaderboardAllTime: []
    };
  }

  async componentDidMount() {
    console.log("a");
    const getLeaderboard = await this.updateLeaderBoard();
    console.log("c");
  }

  async updateLeaderBoard() {
    const { data: leaderboard2Days } = await axios.get(scoresapi);
    this.setState({ leaderboard2Days });
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
            />
          </div>
        </div>
        {this.renderLeaderboards()}
      </React.Fragment>
    );
  }

  renderLeaderboards() {
    if (1)
      //if (this.state.leaderboard2Days.length > 0)
      return (
        <div className="gameContainer">
          <Leaderboards
            leaderboard2Days={this.state.leaderboard2Days}
            leaderboardAllTime={this.state.leaderboardAllTime}
          />
        </div>
      );
    else return "";
  }

  handleChange = progress => {
    this.setState({ progress });
  };

  handleGameStart = () => {
    this.setState({ startTime: new Date().getTime() });
  };

  handleGameFinish = async speed => {
    if (speed) {
      if (speed > this.state.highScore) this.setState({ highScore: speed });
      this.setState({ score: speed });

      try {
        const coolname = generateRandomLeaderboardName();
        const score = Math.round(speed);
        const entry = await axios.post(scoresapi, {
          name: coolname,
          score: score
        });
        this.updateLeaderBoard();
      } catch (ex) {
        console.log("err");
      }
    }
    this.setState({ startTime: null, progress: 0 });
  };
}

export default SinglePlayer;
