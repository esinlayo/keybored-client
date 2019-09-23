import React from 'react'

const CountdownBanner = (props) => {
    return (
        <React.Fragment>
            {props.display ?
                <div id="countdown">
                    Game starting in <font size={20}>{props.countdown}</font>
                </div> : null}
        </React.Fragment>
    );
}

export default CountdownBanner;