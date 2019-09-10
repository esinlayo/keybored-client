import React, { Component } from "react";
import "./gameContainer.css";

const Leaderboards = props => {
  return (
    <div id="leaderboards1">
      <div id="leaderboards2">
        <center>
          <table>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top" }}>
                  <Leaderboard
                    leaderboard={props.mostRecentScores}
                    title="Most Recent Scores"
                    showRank={false}
                    dateOptions={"mmdd,time"}
                  />
                </td>
                <td style={{ verticalAlign: "top" }}>
                  <Leaderboard
                    leaderboard={props.leaderboard2Days}
                    title="High Scores - Past Two Days"
                    showRank={true}
                    dateOptions={""}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
    </div>
  );
};

class Leaderboard extends Component {
  state = {
    changedIndices: []
  };

  componentDidUpdate(prevProps, prevState) {
    const prevS = JSON.stringify(prevProps.leaderboard);
    const currS = JSON.stringify(this.props.leaderboard);
    if (prevProps.leaderboard.length !== 0 && prevS !== currS) {
      const changed = [];
      const curr = this.props.leaderboard.map(obj => JSON.stringify(obj));
      const prev = prevProps.leaderboard.map(obj => JSON.stringify(obj));
      for (const [idx, entry] of curr.entries())
        if (!prev.includes(entry)) {
          changed.push(idx);
        }
      this.setState({ changedIndices: changed });
      setTimeout(() => this.setState({ changedIndices: [] }), 3000);
    }
  }

  render() {
    return (
      <table className="leaderboard">
        <tbody>
          <tr>
            <th colSpan="3" align="left">
              {this.props.title}
            </th>
          </tr>
          {this.props.leaderboard.length > 0 ? (
            <tr>
              {this.props.showRank ? <td></td> : null}
              <td align="left">
                <i>Name</i>
              </td>
              <td>
                <i>Score</i>
              </td>
              {this.props.dateOptions ? (
                <td align="right">
                  <i>Date (UTC)</i>
                </td>
              ) : null}
            </tr>
          ) : null}
          {this.props.leaderboard.map((entry, idx) => {
            return (
              <tr
                key={idx}
                className={`${
                  this.state.changedIndices.includes(idx)
                    ? "newScoreEffect"
                    : ""
                }`}
              >
                {this.props.showRank ? (
                  <td align="right" style={{ paddingRight: "5px" }}>
                    {idx + 1}
                  </td>
                ) : null}
                <td align="left">{entry.name}</td>
                <td> {Math.round(entry.score)}</td>
                {this.props.dateOptions
                  ? this.renderDate(entry.date, this.props.dateOptions)
                  : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderDate(date, options) {
    console.log(date);
    if (options === "mmdd,time")
      return (
        <td>
          {`${date
            .split("T")[0]
            .substring(5)
            .replace("-", "/")} 
            ${date
              .split("T")[1]
              .substring(0, 5)
              .replace("-", "/")}`}
        </td>
      );

    if (options === "yymmdd")
      return (
        <td>
          {`${date
            .split("T")[0]
            .substring(5)
            .replace("-", "/")} ${date
            .split("T")[1]
            .substring(0, 5)
            .replace("-", "/")}`}
        </td>
      );
    return "";
  }
}

export default Leaderboards;
