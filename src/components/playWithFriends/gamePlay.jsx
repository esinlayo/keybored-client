import React, { Component } from "react";
import * as Colyseus from "colyseus.js";
import config from "./../../config";

import ProgressCharacter from "../common/progressCharacter"
import TypeArea from "./typeArea"
import SendLinkPrompt from "./sendLinkPrompt"
import StartGameButton from "./startGameButton"
import ProfileCreator from './profileCreator'
import GameFinishMessage, { PlayerFinishedMessage } from './gameFinishMessage'

import "./withFriends.css"
import NumPlayersDisplay from "./numPlayersDisplay";

class GamePlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joined: false,
      joinError:
        <React.Fragment>
          Connecting to the game room...
          <p>The server is hosted on a heroku free plan which may take up to 30s to wake up, but
            after it wakes up it stays awake for at least 30 minutes or while there are still connections.</p>

        </React.Fragment>,

      players: {},
      countdown: 4,
      countingDown: false,
      textToType: "",
      progress: 0
    };
  }

  async componentDidMount(props) {
    const roomCreatorJoin = async () => {
      this.client = creationState.client;
      this.room = await creationState.room;
      this.setState({ joined: true, joinError: null })
    }
    const roomInviteeJoin = async () => {
      this.client = new Colyseus.Client(config.gameServer);
      const rooms = await this.client.getAvailableRooms();

      let matchFound = false
      rooms.forEach(room => {
        if (room.roomId === this.props.match.params.gameId) matchFound = true
      })
      if (!matchFound) this.setState({ joinError: "Game room not found..." })
      else this.setState({ joinError: null })
    }


    const { state: creationState } = this.props.location
    const isRoomCreator = creationState !== undefined && creationState.client !== undefined

    if (isRoomCreator) await roomCreatorJoin()
    else await roomInviteeJoin()

    if (this.room !== undefined) {
      this.room.onMessage(message => { console.log(message) });
      this.room.onStateChange(state => this.onUpdateRemote(state))
    }
  }
  componentWillUnmount() {
    if (this.room !== undefined) this.room.leave()
  }


  onUpdateRemote = state => {
    const { textToType, players, countdown } = state
    this.setState({ textToType, players, countdown })
  }


  async joinRoom(options) {
    try {
      this.setState({ joinError: "Joining the game room..." })
      this.room = await this.client.joinById(this.props.match.params.gameId, options)
      this.setState({ joined: true, joinError: null })
    } catch (e) {
      this.setState({ joinError: e })
    };

    if (this.room !== undefined) {
      this.room.onMessage(message => {
        console.log("om", message)
        if (message === "playAgain") this.setState({ progress: 0 })
      });
      this.room.onStateChange(state => this.onUpdateRemote(state))
    } else {
      this.setState({ joinError: "Error joining the game room..." })
    }
  }
  submitProfile = (profileCreatorOptions) => { this.joinRoom(profileCreatorOptions) }

  startGame = () => {
    this.room.send({ action: "start" })
  }
  handleChange = progress => {
    this.setState({ progress });
    this.room.send({ progress: progress });
  };

  onPlayAgainButton = () => {
    this.room.send({ action: "playAgain" })
  }

  render() {
    const { joined, players, countdown, joinError } = this.state

    const gameCanStart = Object.keys(players).length > 1;
    const gameStarting = countdown > 0 && countdown <= 3;
    const gameStarted = countdown <= 0;

    return (
      <div id="gamewf">
        {joinError ? joinError :
          !joined ?
            <ProfileCreator create={this.submitProfile} />
            : this.state.joinError !== null ?
              <p>Error joining game</p>
              : <React.Fragment>
                {gameStarting || gameStarted ?
                  <div style={{ width: "100%", position: "relative" }}>
                    <TypeArea
                      onChange={this.handleChange}
                      textToType={this.state.textToType}
                      lastErrorIdx={this.state.lastErrorIdx}
                      error={this.state.error}
                      handleChange={this.handleChange}
                      gameStarted={gameStarted}
                      gameStarting={gameStarting}
                      countdown={countdown}
                    />
                    {players.length !== 0 && players[this.room.sessionId].progress === 1
                      ? <GameFinishMessage
                        place={players[this.room.sessionId].finished}
                        speed={players[this.room.sessionId].speed}
                        handlePlayAgainButton={this.onPlayAgainButton} /> : null}
                  </div>
                  : null}

                {!(gameStarting || gameStarted) ?
                  <React.Fragment>
                    <SendLinkPrompt link={window.location} />
                    <hr />
                    <StartGameButton disabled={!gameCanStart} handleClick={this.startGame} />
                    <NumPlayersDisplay numPlayers={Object.keys(players).length} />
                    <hr />
                  </React.Fragment> : null}

                <div>
                  {Object.keys(players).map(key => {
                    return (
                      <div key={key} style={{ width: "100%", position: "relative" }}>
                        <ProgressCharacter
                          progress={players[key].progress}
                          displayName={players[key].name}
                          character={players[key].character}
                          color={players[key].color}
                          className={"" + key !== this.room.sessionId ? "dull" : ""} />
                        {players[key].finished !== -1
                          ? <PlayerFinishedMessage place={players[key].finished} speed={players[key].speed} />
                          : null}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
        }
      </div >
    );
  }
}







/*
const { useState, useEffect } = require('react')
const GameJoinFail = (props) => {
  const [joinComplete, setJoinComplete] = useState(false)
  const [joinError, setJoinError] = useState(null)
  const [textToType, setTextToType] = useState("")
  const [players, setPlayers] = useState({})
  const [countdown, setCountdown] = useState(4)

  const gameCanStart = Object.keys(players).length > 1;
  const gameStarting = countdown > 0 && countdown <= 3;
  const gameStarted = countdown <= 0;


  const { state: creationState } = props.location
  let room, client

  const onUpdateRemote = remoteState => {
    setTextToType(remoteState.textToType)
    setPlayers(remoteState.players)
    setCountdown(remoteState.countdown)
  }

  const startGame = () => {
    room.send({ action: "start" })
  }

  useEffect(() => {
    async function joinRoom() {
      try {
        room = await client.joinById(props.match.params.gameId, { name: "destroyer 2" })
      } catch (e) {
        setJoinError(e)
      };
    }

    if (creationState !== undefined && creationState.client !== undefined) {
      client = creationState.client;
      room = creationState.room;
      setJoinComplete(true);
    } else {
      client = new Colyseus.Client(config.gameServer);
      joinRoom();
      setJoinComplete(true);

    }
    if (room !== undefined) {
      room.onMessage(message => { console.log(message) });
      room.onStateChange(state => onUpdateRemote(state))
    }
    return (room) => { if (room !== undefined) room.leave() }
  })


  const joinRoom = async () => {
    try {
      room = await client.joinById(this.props.match.params.gameId, { name: "destroyer 2" })
    } catch (e) {
      setJoinError(e)
    };
  }
  const submitProfile = async (profileCreatorOptions) => {
    try {
      await joinRoom(profileCreatorOptions)
      setJoinComplete(true)
    } catch (e) {
      console.error("GameJoin - join error", e);
    }
  }

  const [lastErrorIdx] = useState(0);
  const [error] = useState("");

  return (
    <React.Fragment>
      {joinComplete ?
        <React.Fragment>
          {gameStarting || gameStarted ?
            <TypeArea
              textToType={textToType}
              lastErrorIdx={lastErrorIdx}
              error={error}
              gameStarted={gameStarted}
              gameStarting={gameStarting}
              countdown={countdown}
            /> : null}

          {!(gameStarting || gameStarted) ?
            <React.Fragment>
              <SendLinkPrompt link={window.location} />
              <hr />
              <StartGameButton disabled={!gameCanStart} handleClick={startGame} />
              <NumPlayersDisplay numPlayers={Object.keys(players).length} />
              <hr />
            </React.Fragment> : null}

          <div>
            {Object.keys(players).map(key => {
              return (
                <ProgressContainer key={key}
                  progress={players[key].progress}
                  displayName={players[key].name}
                  className={"" + key !== 1 ? "dull" : ""} />
              );
            })}
          </div>

        </React.Fragment>
        : <ProfileCreator create={submitProfile} />}
    </React.Fragment>
  );
}
*/
export default GamePlay;
