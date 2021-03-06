import React, { Component } from "react";

class Leaderboards extends Component {
  constructor() {
    super()
    this._isMounted = false;
    this.state = { connectingMessage: <font color="white">"."</font> } // not a hack
    setInterval(this.showConnectingMessage, 1000)
  }

  componentDidMount() { this._isMounted = true; }
  componentWillUnmount() { this._isMounted = false; }

  showConnectingMessage = () => {
    if (this._isMounted)
      return (
        this.setState({
          connectingMessage: <React.Fragment>
            <p>Connecting to the server...</p>
            <p>You can continue to play the game offline while we try to connect.<br />
              Your scores will still be submitted after connection is established.</p>
          </React.Fragment>
        })
      )
  }

  render() {
    const { mostRecentScores, topScores, topScores2Days } = this.props;
    return (
      <div id="leaderboards1"><div id="leaderboards2"><center><table><tbody><tr>
        {mostRecentScores.length === 0 ? <td style={{ padding: "4%" }}>{this.state.connectingMessage}</td> :
          <React.Fragment>
            <td style={{ verticalAlign: "top" }}>
              <Leaderboard
                leaderboard={mostRecentScores}
                title="Most Recent Scores"
                showRank={false}
                dateOptions={"mmdd,time"} />
            </td>
            <td style={{ verticalAlign: "top" }}>
              <Leaderboard
                leaderboard={topScores}
                title="High Scores - All Time"
                showRank={true}
                dateOptions={"mmdd,time"} />
            </td>
            <td style={{ verticalAlign: "top" }}>
              <Leaderboard
                leaderboard={topScores2Days}
                title="High Scores - Past Two Days"
                showRank={true}
                dateOptions={""} />
            </td>
          </React.Fragment>}
      </tr></tbody></table></center></div></div>
    );
  };
}

class Leaderboard extends Component {
  state = { changedIndices: [] };

  componentDidUpdate(prevProps, prevState) {
    const prevS = JSON.stringify(prevProps.leaderboard);
    const currS = JSON.stringify(this.props.leaderboard);
    if (prevProps.leaderboard.length !== 0 && prevS !== currS) {
      const changed = [];
      const curr = this.props.leaderboard.map(obj => JSON.stringify(obj));
      const prev = prevProps.leaderboard.map(obj => JSON.stringify(obj));

      for (const [idx, entry] of curr.entries())
        if (!prev.includes(entry)) changed.push(idx);
      this.setState({ changedIndices: changed });
      setTimeout(() => this.setState({ changedIndices: [] }), 3000);
    }
  }

  render() {
    return (<table className="leaderboards3"><tbody style={{ display: "table", width: "100%" }}>
      <tr><th colSpan="3" align="left">{this.props.title}</th></tr>
      {this.renderTableHeader()}
      {this.renderLeaderboard()}
    </tbody></table>);
  }

  renderLeaderboard() {
    return (
      <React.Fragment>
        {this.props.leaderboard.map((entry, idx) => {
          return (<tr key={idx} className={`${this.state.changedIndices.includes(idx) ? "newScoreEffect" : ""}`}>
            {this.props.showRank ? <td align="right" style={{ paddingRight: "5px" }}>{idx + 1} </td> : null}
            <td align="left">{entry.name}</td>
            <td> {Math.round(entry.score)}</td>
            {this.props.dateOptions
              ? this.formatDate(entry.date, this.props.dateOptions)
              : null}
          </tr>);
        })}
      </React.Fragment>
    );
  }

  renderTableHeader() {
    return (
      <React.Fragment>
        {this.props.leaderboard.length <= 0 ? null :
          <tr>
            {this.props.showRank ? <td></td> : null}
            <td align="left"><i>Name</i></td>
            <td><i>Score</i></td>
            {this.props.dateOptions ? <td align="right"><i>Date (UTC)</i></td> : null}
          </tr>}
      </React.Fragment>
    );
  }
  formatDate(date, options) {
    if (options === "mmdd,time")
      return (<td>
        {`${date.split("T")[0].substring(5).replace("-", "/")} 
            ${date.split("T")[1].substring(0, 5).replace("-", "/")}`}
      </td>);

    if (options === "yymmdd")
      return <td>{`${date.split("T")[0].substring(5).replace("-", "/")} ${date.split("T")[1].substring(0, 5).replace("-", "/")}`}</td>;
    return "";
  }
}

export default Leaderboards;
