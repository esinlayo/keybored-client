import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

function GameRoomNotFound() {
    const [redirect, setRedirect] = useState(false);
    useEffect(() => { setTimeout(() => setRedirect(true), 3000); }, []);

    return (
        redirect ? <Redirect to={'/'} /> :
            <React.Fragment>
                Game room not found!
            <p />
                You will be redirected to the main page soon. <br />
                Or you can click "keybored" above to go to the main page.
        </React.Fragment>
    );
}

export default GameRoomNotFound