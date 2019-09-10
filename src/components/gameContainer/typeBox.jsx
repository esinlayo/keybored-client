import React, { Component } from "react";
import TypeBoxContainer from "./typeBoxContainer";
import ControlBox from "./controlBox";
import Instructions from "./instructions";
import LeaderboardNameGetter from "./leaderboardName";

import { getTextToType, generateIdx } from "./../../services";

class TypeBox extends Component {
  constructor() {
    super();
    this.typedInputBox = React.createRef();

    const passageIdx = generateIdx();
    const nextPassageSettings = {
      capsEnabled: true,
      punctuationEnabled: true
    };
    const textToType = this.getTransformed(
      getTextToType(passageIdx),
      nextPassageSettings
    );

    this.state = {
      passageIdx,
      textToType,
      nextPassageSettings,
      textTyped: "",

      error: "",
      lastErrorIdx: null,
      hasError: false
    };
  }

  render() {
    const { nextPassageSettings } = this.state;
    return (
      <div id="typeBox">
        <ControlBox
          onOptionsChange={this.handleOptions}
          onRestart={go => this.handleRestart(nextPassageSettings)}
          onNewPassage={go => this.handleNewPassage(nextPassageSettings)}
          startTime={this.props.startTime}
          nextPassageSettings={nextPassageSettings}
        />
        <Instructions startTime={this.props.startTime} />
        <TypeBoxContainer
          textToType={this.state.textToType}
          textTyped={this.state.textTyped}
          lastErrorIdx={this.state.lastErrorIdx}
          error={this.state.error}
          typedInputBox={this.typedInputBox}
          handleChange={this.handleChange}
        />
        {this.props.leaderboardRetrieved ? (
          <LeaderboardNameGetter
            onOptionsChange={this.handleOptions}
            onLeaderboardNameChange={val => this.handleNameChange(val)}
            enableScoreSubmission={this.props.enableScoreSubmission}
            nameForScores={this.props.nameForScores}
          />
        ) : null}
      </div>
    );
  }
  handleNameChange = val => {
    this.props.onLeaderboardNameChange(val);
  };
  handleChange = ({ currentTarget: input }) => {
    const { textToType } = this.state;
    const textTyped = input.value;
    const changeIdx = textTyped.length - 1;
    const typedChar = [...textTyped][changeIdx];
    const charToType = [...this.state.textToType][changeIdx];

    let { lastErrorIdx, hasError, error } = this.state;
    let { startTime } = this.props;

    if (changeIdx === 0 && startTime === null) {
      this.props.onGameStart();
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

    const progress =
      lastErrorIdx !== null
        ? lastErrorIdx / textToType.length
        : textTyped.length / textToType.length;
    this.props.onChange(progress);

    if (!hasError && textTyped.length === this.state.textToType.length) {
      const elapsed = new Date().getTime() - this.props.startTime;
      const speed = this.state.textToType.length / ((elapsed / 1000 / 60) * 5);
      this.handleNewPassage();
      this.props.onGameFinish(speed);
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

  handleOptions = x => {
    if ("enableScoreSubmission" in x)
      this.props.onChangeScoreSubmissionSettings();

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
      hasError: false,
      lastErrorIdx: null,
      startTime: null
    });
    this.typedInputBox.current.focus();
    this.props.onGameFinish();
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
    this.props.onGameFinish();
  };
}

export default TypeBox;
