import React, { Component } from "react";

import ProgressContainer from "./gameContainer/progressContainer";
import ControlBox from "./gameContainer/controlBox";
import ScoresBox from "./gameContainer/scoresBox";
import TypeMeBox from "./gameContainer/typeMeBox";
import "./gameContainer/gameContainer.css";

import { getTextToType, generateIdx } from "../services.jsx";

class SinglePlayer extends Component {
  constructor() {
    super();
    const passageIdx = generateIdx();
    this.state = {
      passageIdx: passageIdx,
      textToType: getTextToType(passageIdx),
      textTyped: "",
      nextPassageSettings: {
        capsEnabled: true,
        punctuationEnabled: true
      },

      prevScore: null,
      startTime: null,
      lastErrorIdx: null,
      hasError: false,
      error: "",
      score: null,
      highScore: null
    };
  }

  render() {
    return (
      <div className="gameContainer">
        <ProgressContainer progress={this.getProgress()} />
        <div id="scoresAndControlContainer">
          <ControlBox
            onOptionsChange={this.handleOptions}
            onRestart={go => this.handleRestart()}
            onNewPassage={go => this.handleNewPassage()}
            startTime={this.state.startTime}
            nextPassageSettings={this.state.nextPassageSettings}
          />
          {this.renderScoresBox()}
        </div>

        <div id="instructions">{this.renderHelpMessage()}</div>
        <div id="typeboxContainer">
          <TypeMeBox
            className="typeBoxFont"
            id="typeMeBox"
            textToType={this.state.textToType}
            lastErrorIdx={this.state.lastErrorIdx}
            error={this.state.error}
          />
          <textarea
            autoFocus
            className="form-control transparent-input typeBoxFont"
            id="typedInputBox"
            type="text"
            spellCheck="false"
            autoComplete="off"
            onPaste={e => e.preventDefault()}
            onKeyPress={e => {
              if (e.keyCode === 13 || e.which === 13) e.preventDefault();
            }}
            onChange={this.handleChange}
            value={this.state.textTyped}
          />
        </div>
      </div>
    );
  }

  getProgress() {
    const { textToType, textTyped, lastErrorIdx } = this.state;
    const goal = textToType.length;
    return lastErrorIdx !== null
      ? lastErrorIdx / goal
      : textTyped.length / goal;
  }

  handleOptions = x => {
    const nextPassageSettings = { ...this.state.nextPassageSettings, ...x };
    this.setState({ nextPassageSettings });
    if (this.state.textTyped === "") this.handleRestart(nextPassageSettings);
  };

  handleRestart = newSettings => {
    this.setState({
      textToType: this.getTransformed(
        getTextToType(this.state.passageIdx),
        newSettings
      ),
      textTyped: "",
      error: "",
      startTime: null
    });
  };

  handleNewPassage = newSettings => {
    const passageIdx = generateIdx();
    this.setState({
      passageIdx,
      textToType: this.getTransformed(getTextToType(passageIdx), newSettings),
      textTyped: "",
      error: "",
      startTime: null
    });
  };

  getTransformed = (text, newSettings) => {
    let transformedText = text;
    const nextPassageSettings = newSettings
      ? newSettings
      : this.state.nextPassageSettings;
    const { capsEnabled, punctuationEnabled } = nextPassageSettings;

    if (!capsEnabled) transformedText = transformedText.toLowerCase();
    if (!punctuationEnabled)
      transformedText = transformedText.replace(
        /['".,/#!$%^&*;:{}=\-_`~()]/g,
        ""
      );

    return transformedText;
  };

  renderScoresBox = () => {
    if (this.state.score !== null) {
      return (
        <ScoresBox score={this.state.score} highScore={this.state.highScore} />
      );
    }
  };

  renderHelpMessage = () => {
    if (this.state.startTime) return "";
    return (
      <span style={{ padding: "10px" }}>
        {"The game will start when you begin typing in the box below!"}
      </span>
    );
  };

  handleChange = ({ currentTarget: input }) => {
    console.log(input.value);
    const textTyped = input.value;
    const changeIdx = textTyped.length - 1;
    const typedChar = [...textTyped][changeIdx];
    const charToType = [...this.state.textToType][changeIdx];

    let { lastErrorIdx, hasError, error, startTime } = this.state;

    if (changeIdx === 0 && startTime === null) {
      startTime = new Date().getTime();
    }

    if (hasError && changeIdx === lastErrorIdx - 1) {
      // Typebox contents have reverted back to contents before the last error was made.
      lastErrorIdx = null;
      hasError = false;
      error = "";
    }

    if (!hasError && typedChar !== charToType) {
      // A new error is detected.
      lastErrorIdx = changeIdx;
      hasError = true;
    }

    if (hasError) error = textTyped.substring(lastErrorIdx);

    if (!hasError && textTyped.length === this.state.textToType.length) {
      const elapsed = new Date().getTime() - this.state.startTime;
      const speed = this.state.textToType.length / ((elapsed / 1000 / 60) * 5);
      this.handleGameFinish(speed);
      return;
    }

    this.setState({
      textTyped,
      hasError,
      lastErrorIdx,
      error,
      startTime
    });
  };

  handleGameFinish = speed => {
    if (speed > this.state.highScore) this.setState({ highScore: speed });
    this.setState({ score: speed });
    this.handleNewPassage();
  };
}

export default SinglePlayer;
