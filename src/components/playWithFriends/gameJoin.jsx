import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import config from "./../../config";
import roomfn from "./roomfunction";

class GameJoin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        "on console you can see people join this page but yea it's in progress"
      ]
    };

    this.roomId = props.match.params.gameId;
  }

  componentDidMount(props) {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.client !== undefined
    ) {
      this.client = this.props.location.state.client;
    } else {
      this.client = new Colyseus.Client(config.gameServer);
      this.joinRoom();
    }
  }

  joinRoom() {
    this.client
      .joinById(this.roomId)
      .then(room => {
        roomfn(room);
        console.log("joined successfully", room);
        this.setState({
          messages: [...this.state.messages, "joined successfully"]
        });
      })
      .catch(e => {
        console.error("join error", e);
        this.setState({
          messages: [...this.state.messages, "Could not join the game :("]
        });
      });
  }

  render() {
    return (
      <div className="gameJoin">
        {`${window.location}`}

        {this.state.messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    );
  }
}

export default GameJoin;
