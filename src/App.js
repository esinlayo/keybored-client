import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";

import SinglePlayer from "./components/singlePlayer";
import "bootstrap/dist/css/bootstrap.css";
const nicka = "try to type me nicka";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",

      text: "",
      numErrors: 0,
      lastTypedIdx: null,
      lastErrorIdx: null,
      error: false
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
  render() {
    return <SinglePlayer textToType={nicka} />;
  }
}
export default App;
