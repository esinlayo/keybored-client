import React, { Component } from "react";

import "./gameContainer/gameContainer.css";
import { Switch, Route } from "react-router-dom";
import GameCreation from "./playWithFriends/gameCreation";
import GameJoin from "./playWithFriends/gameJoin";

class PlayWithFriends extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/playwithfriends/:gameId" component={GameJoin} />
          <Route path="/playwithfriends" exact component={GameCreation} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default PlayWithFriends;
