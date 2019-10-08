import React, { useState } from "react";
import * as Colyseus from "colyseus.js";
import config from "./../../config";
import { Redirect } from "react-router-dom";

import ProfileCreator from './profileCreator';

const GameCreation = (props) => {
  const client = new Colyseus.Client(config.gameServer);

  const [connectionMsg, setConnectionMsg] = useState(null)
  const [creationComplete, setCreationComplete] = useState(false)

  const [room, setRoom] = useState(undefined)
  const createRoom = async (options) => {
    try {
      setConnectionMsg("Creating the game room...")
      setRoom(await client.create("gameRoom", options))
      setCreationComplete(true)
    }
    catch (ex) {
      console.log(ex)
      setConnectionMsg(`Error creating the game room: ${ex}`)
    }
  }
  const submitProfile = (profileCreatorOptions) => { createRoom(profileCreatorOptions) }

  return (
    <React.Fragment>
      {creationComplete
        ? <Redirect to={{ pathname: `/withfriends/${room.id}`, state: { room, client } }} />
        : <React.Fragment>
          {connectionMsg !== null ? <React.Fragment>{connectionMsg}</React.Fragment> :
            <ProfileCreator create={submitProfile} />}
        </React.Fragment>}
    </React.Fragment>
  );
}

export default GameCreation;
