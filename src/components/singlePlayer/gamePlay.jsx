import React, { Component } from "react";
import axios from "axios";

import ProgressCharacter from "../common/progressCharacter";
import ScoresBox from "./scoresBox";
import TypeArea from "./typeArea";
import Leaderboards from "./leaderboards";

import { webServerURL } from "../../config";
import { getuid } from "./../../auth.js"
const scoresAPI = webServerURL + "/scores"


axios.interceptors.response.use(null, err => {
    const msg = (err.response !== undefined) ? `\r\n${err.response.data}` : ""
    alert(`Sorry, something went wrong on our end! :(\r\n${err}${msg}`);
    return Promise.reject(err);
})

class GamePlay extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            progress: 0,

            startTime: null,

            score: null, highScore: null,

            enableScoreSubmission: (props.auth !== null && props.auth !== undefined) ? true : false,
            mostRecentScores: [],
            topScores: [],
            topScores2Days: []
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.updateLeaderboards();
    }
    componentWillUnmount() { this._isMounted = false }

    componentDidUpdate(oldProps) {
        if ((oldProps.auth !== this.props.auth) && this.props.auth)
            this.setState({ enableScoreSubmission: true })
    }

    render() {
        return (
            <React.Fragment>
                <div className="gameContainer">
                    <ProgressCharacter progress={this.state.progress} character="single-player" />
                    <div style={{ textAlign: "right" }}>
                        <ScoresBox score={this.state.score} highScore={this.state.highScore} />
                        <TypeArea
                            onChange={this.handleChange}
                            onGameFinish={this.handleGameFinish}
                            onGameStart={this.handleGameStart}
                            startTime={this.state.startTime}
                            onLeaderboardNameChange={this.handleLeaderboardNameChange}
                            nameForScores={this.state.nameForScores}
                            enableScoreSubmission={this.state.enableScoreSubmission}
                            onChangeScoreSubmissionSettings={this.handleChangeScoreSubmissionSettings}
                            leaderboardRetrieved={this.state.mostRecentScores.length !== 0}
                            auth={this.props.auth} setAuth={this.props.setAuth}
                        />
                    </div>
                </div>
                <div className="gameContainer">
                    <Leaderboards
                        mostRecentScores={this.state.mostRecentScores}
                        topScores={this.state.topScores}
                        topScores2Days={this.state.topScores2Days}
                    />
                </div>
            </React.Fragment>
        );
    }


    handleChange = progress => {
        this.setState({ progress });
    };

    handleGameStart = () => {
        this.setState({ startTime: new Date().getTime() });
    };

    handleGameFinish = score => {
        if (score) {
            if (score > this.state.highScore) this.setState({ highScore: score });
            this.setState({ score });

            if (this.state.enableScoreSubmission && score >= 0 && score < 180) this.submitScores(score);
        }
        this.setState({ startTime: null, progress: 0 });
    };

    submitScores = async speed => {
        const scoreEntry = {
            name: this.props.auth,
            score: Math.round(speed),
            uid: getuid()
        };
        try {
            await axios.post(scoresAPI, scoreEntry);
            this.updateLeaderboards(speed);
        } catch (ex) {
            console.log("An unexpected error occured while trying to submit scores:", ex);
        }
    };


    handleChangeScoreSubmissionSettings = (option) => {
        // Ideally would like to use nextPassageSettings (found in TypeBox component's state)
        //  to check if capital letters and punctuation is included, and only allow
        //  enabling of score submission if both are included. But this would involve
        //  lifting the state up... yet again.
        // I explore other state management for play with friends mode.
        if (option !== undefined && option === "enable") this.setState({ enableScoreSubmission: true });
        else if (option !== undefined && option === "disable") this.setState({ enableScoreSubmission: false });
        else this.setState({ enableScoreSubmission: !this.state.enableScoreSubmission });
    };

    async updateLeaderboards(score) {
        const origMostRecent = this.state.mostRecentScores;
        const origAllTime = this.state.topScores;
        const orig2Days = this.state.topScores2Days;

        if (score) this.updateLdrBoardOptimistically(score);

        try {

            if (
                (origMostRecent.length === 0 || orig2Days.length < 10 || origAllTime.length < 10)
                || (orig2Days.length > 0 && score > orig2Days[orig2Days.length - 1].score)
                || (origAllTime.length > 0 && score > origAllTime[origAllTime.length - 1].score)
            ) {
                const { data } = await axios.get(`${scoresAPI}/10`);
                const { mostRecentScores, topScores, topScores2Days } = data;
                if (this._isMounted) this.setState({ mostRecentScores, topScores, topScores2Days });
            } else {
                const { data } = await axios.get(scoresAPI);
                const { mostRecentScores } = data;
                if (this._isMounted) this.setState({ mostRecentScores });
            }

        } catch (ex) {
            if (this._isMounted) {
                console.log("An unexpected error occurred while trying to update the leaderboards.")
                this.setState({ mostRecentScores: origMostRecent, topScores: origAllTime, topScores2Days: orig2Days });
            }
        }
    }

    updateLdrBoardOptimistically = score => {
        const scoreEntry = { name: this.state.nameForScores, score, date: JSON.stringify(new Date(Date.now())) };
        const origMostRecent = this.state.mostRecentScores;

        let mostRecentScores = [
            scoreEntry,
            ...origMostRecent.slice(0, origMostRecent.length)
        ];
        if (mostRecentScores.length > 10)
            mostRecentScores = mostRecentScores.slice(0, 10);
        this.setState({ mostRecentScores });


        // const origTopScoresIn2Days = this.state.leaderboard2Days;
        /* different paths for optimistic update:
        - if score is lower than all entries in the leaderboard (no leaderboard change)
        - if name just beat a score, but wasn't previously on the leaderboard
        - if name already in the leaderboard but has lower score (no leaderboard change)
        - if name already in the leaderboard and position changes
        */
    }
}

export default GamePlay;
