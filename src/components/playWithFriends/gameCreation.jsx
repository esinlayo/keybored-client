import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import config from "./../../config";
import { Redirect } from "react-router-dom";
import roomfn from "./roomfunction";

class GameCreation extends Component {
  state = { messages: [], creationComplete: false };

  constructor() {
    super();
    this.client = new Colyseus.Client(config.gameServer);
  }

  componentDidMount() {
    this.setState({
      messages: [...this.state.messages, `Connected!`]
    });

    this.createRoom().then(val => {
      this.roomid = val;
      this.setState({ creationComplete: true });
    });

    this.client = null;
  }

  createRoom() {
    return this.client
      .create("gameRoom", {
        /* options */
      })
      .then(room => {
        roomfn(room);
        console.log("create successfully", room.id);
        this.setState({
          messages: [
            ...this.state.messages,
            `Room successfully created at ${window.location}/${room.id}`
          ]
        });

        return room.id;
      })
      .catch(e => {
        console.error("create error", e);
        this.setState({
          messages: [...this.state.messages, `create error ${e.cnxnstr}`]
        });
      });
  }

  render() {
    if (this.state.creationComplete) {
      return (
        <Redirect
          to={{
            pathname: `/playwithfriends/${this.roomid}`,
            state: { client: this.client }
          }}
        />
      );
    }
    return (
      <div className="gameContainer">
        {"Trying to connect to the server..."}
        {this.state.messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    );
  }
}

export default GameCreation;
