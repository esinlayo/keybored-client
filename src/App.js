import React, { Component } from "react";
import "./App.css";
import "typeface-roboto";

import SinglePlayer from "./components/singlePlayer";

import AppBar from "@material-ui/core/AppBar";
import { Switch, Route, Link } from "react-router-dom";

import Index from "./components/index";

//;;;;;;;import "bootstrap/dist/css/bootstrap.css";

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
    return (
      <React.Fragment>
        <AppBar
          color="primary"
          position="static"
          style={{ paddingLeft: "5%", width: "100%", marginBottom: 30 }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h1>keybored</h1>
          </Link>
        </AppBar>
        <div id="app">
          <Switch>
            <Route path="/play" render={() => <SinglePlayer />} />
            <Route path="/" exact component={Index} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
