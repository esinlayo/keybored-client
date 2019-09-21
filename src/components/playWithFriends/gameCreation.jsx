import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import config from "./../../config";
import { Redirect } from "react-router-dom";

class GameCreation extends Component {
  state = { messages: [], creationComplete: false };

  constructor() {
    super();
    this.client = new Colyseus.Client(config.gameServer);
  }

  async componentDidMount() {
    this.setState({
      messages: [...this.state.messages, `Connected!`]
    });

    await this.createRoom()
    this.setState({ creationComplete: true })
  }

  async createRoom() {
    try {
      this.room = await this.client.create("gameRoom", {})
      console.log("gC - create successfully", this.room.id);
      this.setState({
        messages: [
          ...this.state.messages,
          `Room successfully created at ${window.location}/${this.room.id}.`
        ]
      });
      return true
    } catch (e) {
      console.error("create error", e);
      this.setState({
        messages: [...this.state.messages, `create error ${e.cnxnstr}`]
      });
      return false
    }

  }

  render() {
    if (this.state.creationComplete) {
      console.log("gC - creationCompleted - room", this.room)
      console.log("gC - creationCompleted - client", this.client)
      return (
        <Redirect
          to={{
            pathname: `/withfriends/${this.room.id}`,
            state: { room: this.room, client: this.client }
          }}
        />
      );
    }
    return (
      <React.Fragment>
        {"Trying to connect to the server..."}
        {this.state.messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </React.Fragment>
    );
  }
}

export default GameCreation;
