import React, { Component } from "react";
import TypeMeBox from "./typeMeBox";

class TypeBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastTypedIdx: -1,
      lastErrorIdx: null,
      hasError: false,
      error: "",
      startTime: null
    };
  }

  report = () => {
    const elapsed = new Date().getTime() - this.state.startTime;
    const speed = this.props.textToType.length / ((elapsed / 1000 / 60) * 5);

    this.props.onGameFinish(speed);
    return;
  };

  handleChange = ({ currentTarget: input }) => {
    const textTyped = input.value;
    const changeIdx = textTyped.length - 1;
    const typedChar = [...textTyped][changeIdx];
    const charToType = [...this.props.textToType][changeIdx];

    let { lastErrorIdx, hasError, error, startTime } = this.state;

    if (changeIdx === 0 && startTime === null) startTime = new Date().getTime();

    if (hasError && changeIdx === lastErrorIdx - 1) {
      // Typebox contents have reverted back to contents before the last error was made.
      lastErrorIdx = null;
      hasError = false;
    }

    if (!hasError && typedChar !== charToType) {
      // A new error is detected.
      lastErrorIdx = changeIdx;
      hasError = true;
    }

    if (hasError) error = textTyped.substring(lastErrorIdx);

    if (!hasError && textTyped.length === this.props.textToType.length)
      this.report();

    this.setState({
      lastTypedIdx: changeIdx,
      hasError,
      lastErrorIdx,
      error,
      startTime
    });

    this.props.onType(textTyped, lastErrorIdx, startTime);
  };

  render() {
    const { lastErrorIdx, lastTypedIdx } = this.state;

    return (
      <div id="typebox">
        <TypeMeBox
          id="typeMeBox"
          className="typeBoxFont"
          textToType={this.props.textToType}
          lastErrorIdx={lastErrorIdx}
          lastTypedIdx={lastTypedIdx}
          error={this.state.error}
        />
        <textarea
          autoFocus
          className="form-control transparent-input"
          id="typedInputBox"
          className="typeBoxFont"
          type="text"
          spellCheck="false"
          autoComplete="off"
          onPaste={e => e.preventDefault()}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TypeBox;
