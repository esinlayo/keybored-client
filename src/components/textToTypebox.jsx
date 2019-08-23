import React, { Component } from "react";

class TextToTypeBox extends Component {
  render() {
    return (
      <div
        id="textToTypebox"
        className="form-control"
        style={{ position: "relative" }}
      >
        {this.renderFeedback_weird()}
      </div>
    );
  }

  renderFeedback = () => {
    const { textToType, lastErrorIdx, lastTypedIdx, error } = this.props;
    return (
      <React.Fragment>
        {[...textToType].map((c, idx) => {
          return (
            <span
              key={idx}
              className={
                lastErrorIdx !== null &&
                idx >= lastErrorIdx &&
                idx <= lastTypedIdx
                  ? "highlightError"
                  : ""
              }
            >
              {c}
            </span>
          );
        })}
      </React.Fragment>
    );
  };

  renderFeedback_weird = () => {
    const { textToType, lastErrorIdx, lastTypedIdx, error } = this.props;
    if (lastErrorIdx !== null) {
      return (
        <React.Fragment>
          {textToType.substring(0, lastErrorIdx)}
          <span class="highlightError" style={{ position: "absolute" }}>
            {error}
          </span>
          {textToType.substring(lastErrorIdx)}
        </React.Fragment>
      );
    } else {
      return <React.Fragment>{textToType}</React.Fragment>;
    }
  };
}

export default TextToTypeBox;
