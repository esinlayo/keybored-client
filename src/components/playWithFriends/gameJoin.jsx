import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import config from "./../../config";

import Button from "@material-ui/core/Button";
import ProgressContainer from "../common/progressContainer"
import CountdownBanner from "./countdownBanner"


import "./withFriends.css"
import TypeBoxContainer from './../gameContainer/typeBoxContainer';

class GameJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinError: null,
      players: {},
      countdown: 11,
      countingDown: false,
      textToType: ""
    };

  }

  async componentDidMount(props) {
    const { state: creationState } = this.props.location
    if (creationState !== undefined && creationState.client !== undefined) {
      this.client = creationState.client;
      this.room = await creationState.room;
    } else {
      this.client = await new Colyseus.Client(config.gameServer);
      await this.joinRoom();
    }
    if (this.room !== undefined) {
      this.room.onMessage(message => { console.log(message) });
      this.room.onStateChange(state => this.onUpdateRemote(state))
    }
  }
  componentWillUnmount() {
    if (this.room !== undefined)
      this.room.leave()
  }

  onUpdateRemote = state => {
    const { textToType, players, countdown } = state
    this.setState({ textToType, players, countdown })
  }


  async joinRoom() {
    try {
      this.room = await this.client.joinById(this.props.match.params.gameId)
    } catch (e) {
      console.error("join error", e);
      this.setState({ joinError: e })
    };
  }

  startGame = () => {
    this.room.send({ action: "start" })
  }

  render() {
    const gameCanStart = Object.keys(this.state.players).length > 1;

    return (
      <React.Fragment>
        <div id="gamewf">
          <CountdownBanner countdown={this.state.countdown} />

          {this.state.joinError !== null ?
            <p>Error joining game</p> :
            <React.Fragment>
              {`${window.location}`}
              <br />
              <Button
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  margin: "4px"
                }}
                className="controlElement controlButton"
                size="small"
                color="primary"
                variant="contained"
                disabled={!gameCanStart}
                onClick={this.startGame}
              >

                {gameCanStart ? "Start Game!" : "The game can start when someone else  joins"}
              </Button>
              {this.state.countdown}
              <br />
              <div>
                {Object.keys(this.state.players).map(key => {
                  return (
                    <ProgressContainer key={key}
                      progress={this.state.players[key].progress}
                      displayName={this.state.players[key].name}
                      className={"" + key !== this.room.sessionId ? "dull" : ""} />
                  );
                })}
              </div>
            </React.Fragment>}
        </div>
      </React.Fragment>
    );
  }
}

export default GameJoin;
