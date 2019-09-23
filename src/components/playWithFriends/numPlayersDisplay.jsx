import React from 'react'
import Typography from "@material-ui/core/Typography";

const NumPlayersDisplay = (props) => {
    const { numPlayers } = props

    return (
        <Typography variant="body1" component="div">
            {`There ${numPlayers === 1 ? "is" : "are"} currently 
                ${numPlayers} player${numPlayers === 1 ? "" : "s"} in the game.`}< br />
            {numPlayers < 2 ? <React.Fragment>

                {`Invite at least one more person to be able to start the game!`}
            </React.Fragment> : <font color="white">.</font>}
        </Typography>
    );
}

export default NumPlayersDisplay;