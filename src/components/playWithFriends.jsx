import React, { Component } from "react";

import "./gameContainer/gameContainer.css";
import { Switch, Route } from "react-router-dom";
import GameCreation from "./playWithFriends/gameCreation";
import GameJoin from "./playWithFriends/gameJoin";

class PlayWithFriends extends Component {
  render() {
    return (
      <div className="gameContainer">
        <Switch>
          <Route path="/withfriends/:gameId" component={GameJoin} />
          <Route path="/withfriends" exact component={GameCreation} />
        </Switch>
      </div>
    );
  }
}

export default PlayWithFriends;
