import React from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const superscript = (place) => {
    switch (place) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

const GameFinishMessage = (props) => {
    return (
        <div id="gameFinishMessage">
            You finished the game in
            <Typography variant="h4" component="div">{props.place}<sup>{superscript(props.place)}</sup></Typography>
            by typing at a pace of
            <Typography variant="h6" component="span"> {Math.round(props.speed)}</Typography> wpm.
            <br />
            You can wait for everyone to finish, or invite the room to
            <Button style={{ display: "inline-block", minWidth: "0", verticalAlign: "middle", margin: "0px 5px", padding: "1px 5px" }}
                size="small" color="primary" variant="contained"
                onClick={props.handlePlayAgainButton}>play again</Button>
        </div>
    );
}

export const PlayerFinishedMessage = (props) => {
    return (
        <div className="playerFinishMessage">
            <Typography variant="h4" component="span">{props.place}<sup>{superscript(props.place)}</sup></Typography>
            @
            <Typography variant="h6" component="span"> {Math.round(props.speed)}</Typography> wpm.
        </div>
    );
}

export default GameFinishMessage;