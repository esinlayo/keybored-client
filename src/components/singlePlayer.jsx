import React from "react";

import GamePlay from './singlePlayer/gamePlay'

import "./common/style.css";
import './singlePlayer/singlePlayer.css'

import { Analytics } from "./../services"


const SinglePlayer = () => {
  return (<React.Fragment>
    <GamePlay />
    <Analytics page_name="SINGLEPLAYER" />
  </React.Fragment>);
}

export default SinglePlayer;