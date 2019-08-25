import React, { Component } from "react";

class TypeMeBox extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        className={"form-control " + this.props.className}
        style={{ position: "relative" }}
      >
        {this.renderFeedback_weird()}
      </div>
    );
  }

  renderFeedback = () => {
    const { textToType, lastErrorIdx, lastTypedIdx } = this.props;
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
    const { textToType, lastErrorIdx, error } = this.props;
    if (lastErrorIdx !== null) {
      return (
        <React.Fragment>
          {textToType.substring(0, lastErrorIdx)}
          <span
            className="highlightError"
            style={{ position: "absolute", whiteSpace: "pre" }}
          >
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

export default TypeMeBox;
