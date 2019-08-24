import React, { Component } from "react";

import ProgressContainer from "./gameContainer/progressContainer";
import ControlBox from "./gameContainer/controlBox";
import TypeBox from "./gameContainer/typeBox";
import "./gameContainer/gameContainer.css";

import { getTextToType, generateIdx } from "../services.jsx";

class SinglePlayer extends Component {
  constructor() {
    super();

    const passageIdx = generateIdx();

    const initPassageSettings = {
      capsEnabled: true,
      punctuationEnabled: true
    };

    this.state = {
      passageIdx: passageIdx,
      textToType: getTextToType(passageIdx),
      textTyped: "",
      progress: 0,
      typingStarted: false,
      nextPassageSettings: initPassageSettings
    };
  }

  render() {
    return (
      <div className="gameContainer">
        <ProgressContainer progress={this.state.progress} />
        <ControlBox onOptionsChange={this.handleOptions} />
        <div id="instructions">{this.renderHelpMessage()}</div>
        <TypeBox
          textToType={this.state.textToType}
          onType={this.handleTyping}
          onGameFinish={this.handleGameFinish}
        />
      </div>
    );
  }

  handleOptions = x => {
    let newSettings = { ...this.state.nextPassageSettings, ...x };

    if (!this.state.typingStarted) {
      let { capsEnabled, punctuationEnabled } = newSettings;

      let nextPassage = getTextToType(this.state.passageIdx);
      if (!capsEnabled) nextPassage = nextPassage.toLowerCase();
      if (!punctuationEnabled)
        nextPassage = nextPassage.replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      this.setState({
        textToType: nextPassage,
        nextPassageSettings: newSettings
      });
      return;
    }
    this.setState({
      nextPassageSettings: newSettings
    });
  };

  renderHelpMessage = () => {
    if (this.state.typingStarted) return "";
    return "When you begin typing, the timer will start!";
  };

  handleTyping = (typed, lastErrorIdx, startTime) => {
    const goal = this.state.textToType.length;
    let progress =
      lastErrorIdx !== null ? lastErrorIdx / goal : typed.length / goal;
    let typingStarted = startTime !== null;

    this.setState({ textTyped: typed, typingStarted, progress });
  };

  handleGameFinish = speed => {
    const message = "Good job! You typed at <b>" + speed + " WPM</b>!";
    console.log(message);

    const passageIdx = generateIdx();
    const news = getTextToType(passageIdx);
    const none = "";
    const zero = 0;
    const cool = {
      passageIdx: passageIdx,
      textToType: news,
      textTyped: none,
      progress: zero,
      typingStarted: false
    };
    console.log(cool);
    this.setState(cool);
  };
}

export default SinglePlayer;
