import React, { Component } from "react";

import ProgressContainer from "./gameContainer/progressContainer";
import ControlBox from "./gameContainer/controlBox";
import ScoresBox from "./gameContainer/scoresBox";
import Instructions from "./gameContainer/instructions";
import TypeBoxContainer from "./gameContainer/typeBoxContainer";
import "./gameContainer/gameContainer.css";

import { getTextToType, generateIdx } from "../services.jsx";

class SinglePlayer extends Component {
  constructor() {
    super();
    this.typedInputBox = React.createRef();
    const passageIdx = generateIdx();
    const nextPassageSettings = {
      capsEnabled: true,
      punctuationEnabled: true
    };
    this.state = {
      passageIdx: passageIdx,
      textToType: this.getTransformed(
        getTextToType(passageIdx),
        nextPassageSettings
      ),
      textTyped: "",
      nextPassageSettings,
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
          <ScoresBox
            score={this.state.score}
            highScore={this.state.highScore}
          />
          <ControlBox
            onOptionsChange={this.handleOptions}
            onRestart={go => this.handleRestart()}
            onNewPassage={go => this.handleNewPassage()}
            startTime={this.state.startTime}
            nextPassageSettings={this.state.nextPassageSettings}
          />
        </div>
        <Instructions startTime={this.state.startTime} />
        <TypeBoxContainer
          textToType={this.state.textToType}
          textTyped={this.state.textTyped}
          lastErrorIdx={this.state.lastErrorIdx}
          error={this.state.error}
          typedInputBox={this.typedInputBox}
          handleChange={this.handleChange}
        />
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
    this.typedInputBox.current.focus();
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
    this.typedInputBox.current.focus();
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
    this.typedInputBox.current.focus();
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
        /['".,/#!$%^&*;:{}=\-_`~()?]/g,
        ""
      );

    return transformedText;
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
