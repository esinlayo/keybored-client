import React, { Component } from "react";
import TextToTypeBox from "./textToTypebox";
import "./typeboxContainer.css";

class TypeboxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastTypedIdx: -1,
      lastErrorIdx: null,
      hasError: false,
      error: ""
    };
  }

  handleChange = ({ currentTarget: input }) => {
    const textTyped = input.value;
    const changeIdx = textTyped.length - 1;
    const typedChar = [...textTyped][changeIdx];
    const charToType = [...this.props.textToType][changeIdx];

    let { lastErrorIdx, hasError, error } = this.state;

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

    this.setState({
      lastTypedIdx: changeIdx,
      hasError,
      lastErrorIdx,
      error
    });

    this.props.onType(textTyped, lastErrorIdx);
  };

  render() {
    const { lastErrorIdx, lastTypedIdx } = this.state;

    return (
      <React.Fragment>
        <div id="typebox">
          <div className="form-group">
            <TextToTypeBox
              textToType={this.props.textToType}
              lastErrorIdx={lastErrorIdx}
              lastTypedIdx={lastTypedIdx}
              error={this.state.error}
            />
            <input
              className="form-control transparent-input"
              id="textTyped"
              type="text"
              autocomplete="off"
              onPaste={e => e.preventDefault()}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TypeboxContainer;
