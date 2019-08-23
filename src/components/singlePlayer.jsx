import React, { Component } from "react";

import TypeboxContainer from "./typeboxContainer";
import ProgressContainer from "./progressContainer";

class SinglePlayer extends Component {
  state = {
    textToType: this.props.textToType,
    textTyped: "",
    progress: 0
  };

  render() {
    return (
      <div>
        <ProgressContainer progress={this.state.progress} />
        <TypeboxContainer
          textToType={this.props.textToType}
          onType={this.handleType}
        />
      </div>
    );
  }

  handleType = (typed, lastErrorIdx) => {
    console.log(typed);
    const goal = this.props.textToType.length;
    let progress;
    progress =
      lastErrorIdx !== null ? lastErrorIdx / goal : typed.length / goal;
    console.log(progress);

    this.setState({ textTyped: typed, progress });
  };
}

export default SinglePlayer;
