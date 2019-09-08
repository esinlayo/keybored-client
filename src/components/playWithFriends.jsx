import React, { Component } from "react";

import ProgressContainer from "./gameContainer/progressContainer";
import ScoresBox from "./gameContainer/scoresBox";
import Instructions from "./gameContainer/instructions";
import TypeBox from "./gameContainer/typeBox";

import "./gameContainer/gameContainer.css";
import { Switch, Route, Link } from "react-router-dom";
import GameCreation from "./playWithFriends/gameCreation";
import GameJoin from "./playWithFriends/gameJoin";

class PlayWithFriends extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/playwithfriends" exact component={GameCreation} />
          <Route path="/playwithfriends" component={GameJoin} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default PlayWithFriends;
