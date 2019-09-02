import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class TypeMeBox extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        className={"form-control " + this.props.className}
        style={{ position: "relative" }}
      >
        {this.renderFeedback()}
      </div>
    );
  }

  renderFeedback = () => {
    const { textToType, lastErrorIdx, error } = this.props;
    if (lastErrorIdx !== null) {
      return (
        <React.Fragment>
          <span>{textToType.substring(0, lastErrorIdx)}</span>
          <span className="highlightError typeBoxWrapping">{error}</span>
          <span>{textToType.substring(lastErrorIdx)}</span>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>{textToType}</React.Fragment>;
    }
  };
}

const TypeBoxContainer = props => {
  return (
    <div id="typeboxContainer">
      <Typography
        variant="h6"
        component={TypeMeBox}
        id="typeMeBox"
        className="typeBox typeBoxWrapping"
        textToType={props.textToType}
        lastErrorIdx={props.lastErrorIdx}
        error={props.error}
      />
      <Typography
        variant="h6"
        component="textarea"
        autoFocus
        className="typeBox typeBoxWrapping form-control transparent-input"
        id="typedInputBox"
        ref={props.typedInputBox}
        type="text"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onPaste={e => e.preventDefault()}
        onKeyPress={e => {
          // disable return(enter) key
          if (e.keyCode === 13 || e.which === 13) e.preventDefault();
        }}
        onChange={props.handleChange}
        value={props.textTyped}
      />
    </div>
  );
};

export default TypeBoxContainer;
