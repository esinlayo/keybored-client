import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import GamePlay from './singlePlayer/gamePlay';

import "./common/style.css";
import './singlePlayer/singlePlayer.css'

const SinglePlayer = (props) => {
  return (
    <Switch>
      <Route path="/play/:userID" render={(routedata) => {
        props.setAuth(routedata.match.params.userID);
        return <Redirect to="/play" />
      }} />
      <Route path="/play" exact render={() => <GamePlay {...props} />} />
    </Switch>
  )
}

export default SinglePlayer;