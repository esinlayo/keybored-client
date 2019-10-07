import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import GameCreation from "./playWithFriends/gameCreation";
import GamePlay from "./playWithFriends/gamePlay";

import "./common/style.css";

import { Analytics } from "./../services"

class PlayWithFriends extends Component {
  render() {
    return (
      <div className="gameContainer">
        <Switch>
          <Route path="/withfriends/:gameId" component={GamePlay} />
          <Route path="/withfriends" exact component={GameCreation} />
        </Switch>
        <Analytics page_name="WITHFRIENDS" />
      </div>
    );
  }
}

export default PlayWithFriends;
