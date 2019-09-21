import React from 'react'

const CountdownBanner = (props) => {
    return (
        <React.Fragment>
            {
                props.countdown <= 10 && props.countdown > 0 ?
                    <div id="countdown">
                        Game starting in <font size={20}>{props.countdown}</font>
                    </div> : null
            }
        </React.Fragment>
    );
}

export default CountdownBanner;