import React, { Component } from "react";
import "./gameContainer.css";

const Leaderboards = props => {
  return (
    <div id="leaderboards">
      <center>
        <table>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "top" }}>
                <Leaderboard
                  leaderboard={props.leaderboard2Days}
                  title="High Scores - Past Two Days"
                />
              </td>
              <td style={{ verticalAlign: "top" }}>
                <Leaderboard
                  leaderboard={props.leaderboardAllTime}
                  title="All Time High Scores"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
};

class Leaderboard extends Component {
  state = {
    changedIdx: null
  };

  componentDidUpdate(prevProps, prevState) {
    const prevS = JSON.stringify(prevProps.leaderboard);
    const currS = JSON.stringify(this.props.leaderboard);
    if (prevProps.leaderboard.length !== 0 && prevS !== currS) {
      const curr = this.props.leaderboard.map(obj => JSON.stringify(obj));
      const prev = prevProps.leaderboard.map(obj => JSON.stringify(obj));
      for (const [idx, entry] of curr.entries())
        if (!prev.includes(entry)) {
          this.setState({ changedIdx: idx });
          break;
        }
    }
  }

  render() {
    return (
      <table className="leaderboard">
        <tbody>
          <tr>
            <th colSpan="3">{this.props.title}</th>
          </tr>
          <tr>
            <td></td>
            <td align="left">
              <i>Name</i>
            </td>
            <td>
              <i>Score</i>
            </td>
          </tr>
          {this.props.leaderboard.map((entry, idx) => {
            return (
              <tr
                key={idx}
                className={`${
                  idx === this.state.changedIdx ? "newScoreEffect" : ""
                }`}
              >
                <td align="right" style={{ paddingRight: "5px" }}>
                  {idx + 1}
                </td>
                <td align="left">{entry.name}</td>
                <td> {Math.round(entry.score)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Leaderboards;
