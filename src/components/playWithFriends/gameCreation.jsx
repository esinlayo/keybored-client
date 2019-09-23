import React, { useState } from "react";
import * as Colyseus from "colyseus.js";
import config from "./../../config";
import { Redirect } from "react-router-dom";

import ProfileCreator from './profileCreator';

const GameCreation = (props) => {
  const client = new Colyseus.Client(config.gameServer);

  const [creationComplete, setCreationComplete] = useState(false)
  const [room, setRoom] = useState(undefined)

  const createRoom = async (options) => {
    setRoom(await client.create("gameRoom", options))
  }
  const submitProfile = async (profileCreatorOptions) => {
    try {
      await createRoom(profileCreatorOptions)
      setCreationComplete(true)
    } catch (e) {
      console.error("GameCreation - create error", e);
    }
  }

  return (
    <React.Fragment>
      {creationComplete ?
        <Redirect
          to={{
            pathname: `/withfriends/${room.id}`,
            state: { room, client }
          }} />
        : <ProfileCreator create={submitProfile} />}
    </React.Fragment>
  );
}

export default GameCreation;
