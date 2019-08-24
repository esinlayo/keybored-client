import React, { Component } from "react";

import ProgressContainer from "./gameContainer/progressContainer";
import ControlBox from "./gameContainer/controlBox";
import TypeMeBox from "./gameContainer/typeMeBox";
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
      nextPassageSettings: initPassageSettings,

      lastErrorIdx: null,
      hasError: false,
      error: "",
      startTime: null
    };
  }

  getTransformed = (text, newSettings) => {
    let transformed = text;
    const nextPassageSettings = newSettings
      ? newSettings
      : this.state.nextPassageSettings;
    const { capsEnabled, punctuationEnabled } = nextPassageSettings;
    if (!capsEnabled) transformed = transformed.toLowerCase();
    if (!punctuationEnabled)
      transformed = transformed.replace(/['".,/#!$%^&*;:{}=\-_`~()]/g, "");

    return transformed;
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

  handleNew = newSettings => {
    const passageIdx = generateIdx();
    this.setState({
      passageIdx,
      textToType: this.getTransformed(getTextToType(passageIdx), newSettings),
      textTyped: "",
      error: "",
      startTime: null
    });
  };

  handleOptions = x => {
    const nextPassageSettings = { ...this.state.nextPassageSettings, ...x };
    this.setState({ nextPassageSettings });
    if (this.state.textTyped === "") this.handleRestart(nextPassageSettings);
  };

  render() {
    return (
      <div className="gameContainer">
        <ProgressContainer progress={this.getProgress()} />
        <ControlBox
          onOptionsChange={this.handleOptions}
          startTime={this.state.startTime}
          onRestart={go => this.handleRestart()}
          onNewPassage={go => this.handleNew()}
          capsEnabled={this.state.nextPassageSettings.capsEnabled}
          punctuationEnabled={this.state.nextPassageSettings.punctuationEnabled}
        />
        <div id="instructions">{this.renderHelpMessage()}</div>
        <div id="typebox">
          <TypeMeBox
            id="typeMeBox"
            textToType={this.state.textToType}
            lastErrorIdx={this.state.lastErrorIdx}
            error={this.state.error}
          />
          <textarea
            autoFocus
            className="form-control transparent-input"
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

  renderHelpMessage = () => {
    if (this.state.typingStarted) return "";
    return "When you begin typing, the timer will start!";
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

  getProgress() {
    const { textToType, textTyped, lastErrorIdx } = this.state;
    const goal = textToType.length;
    return lastErrorIdx !== null
      ? lastErrorIdx / goal
      : textTyped.length / goal;
  }

  handleGameFinish = speed => {
    const message = "Good job! You typed at <b>" + speed + " WPM</b>!";
    console.log(message);

    const passageIdx = generateIdx();
    const news = getTextToType(passageIdx);
    const cool = {
      passageIdx: passageIdx,
      textToType: news,
      textTyped: "",
      startTime: null
    };
    this.setState(cool);
  };
}

export default SinglePlayer;
