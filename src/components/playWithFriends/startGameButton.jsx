import React from 'react'
import Button from "@material-ui/core/Button";

const StartGameButton = (props) => {
    return (
        <Button
            style={{
                display: "inline-block",
                verticalAlign: "middle",
                margin: "4px"
            }}
            className="controlElement controlButton"
            size="small"
            color="primary"
            variant="contained"
            disabled={props.disabled}
            onClick={props.handleClick}>{"Start Game"}
        </Button>
    );
}

export default StartGameButton;