import React, { Component } from "react";
import TypeBox from "./../common/typeBox";
import CountdownBanner from "./countdownBanner"


class TypeArea extends Component {
    constructor() {
        super();
        this.typedInputBox = React.createRef();

        this.state = {
            textTyped: "",

            error: "",
            lastErrorIdx: null,
            hasError: false
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.countdown > 0 && newProps.countdown === 0) {
            this.typedInputBox.current.focus()
        }
    }

    render() {
        return (
            <div id="typeBox">
                <CountdownBanner display={this.props.gameStarting} countdown={this.props.countdown} />
                <TypeBox
                    textToType={this.props.textToType}
                    textTyped={this.state.textTyped}
                    lastErrorIdx={this.state.lastErrorIdx}
                    error={this.state.error}
                    typedInputBox={this.typedInputBox}
                    handleChange={this.handleChange} />
            </div>
        );
    }
    handleNameChange = val => {
        this.props.onLeaderboardNameChange(val);
    };
    handleChange = ({ currentTarget: input }) => {
        if (!this.props.gameStarted) return;
        const { textToType } = this.props;
        const textTyped = input.value;
        const probablyCheating = (textTyped) => {
            const typedAmountDelta = textTyped.length - this.state.textTyped.length
            if (typedAmountDelta > 1) return true;
            return false;
        }
        if (probablyCheating(textTyped)) return;
        const changeIdx = textTyped.length - 1;
        const typedChar = [...textTyped][changeIdx];
        const charToType = [...textToType][changeIdx];

        let { lastErrorIdx, hasError, error } = this.state;
        let { startTime } = this.props;

        if (changeIdx === 0 && startTime === null) {
            this.props.onGameStart();
        }

        if (hasError && changeIdx === lastErrorIdx - 1) {
            // Typebox contents have reverted back to contents before the last error was made.
            lastErrorIdx = null;
            hasError = false;
            error = "";
        }

        if (!hasError && typedChar !== charToType) {
            // A new error is detected.
            lastErrorIdx = changeIdx;
            hasError = true;
        }

        if (hasError) error = textTyped.substring(lastErrorIdx);

        const progress =
            lastErrorIdx !== null
                ? lastErrorIdx / textToType.length
                : textTyped.length / textToType.length;
        this.props.onChange(progress);

        this.setState({
            textTyped,
            hasError,
            lastErrorIdx,
            error,
            startTime
        });

        if (!hasError && textTyped.length === textToType.length) {
            return;
        }
    };

}

export default TypeArea;
