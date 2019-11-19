import axios from 'axios'
import { webServerURL } from './config.json'

let uid = null;

export const getname = async (setAuth) => {
    if (document.cookie.length >= 11) {
        uid = (document.cookie.substring(11, document.cookie.length - 3)) // trimLeft("j%3A%22").trimRight("%22");
        const user = await axios.get(`${webServerURL}/auth/byId/${uid}`);
        setAuth(user.data);
    } else if (document.cookie.length > 0) return;
    else setAuth(undefined);
}

export const getuid = () => uid;

/*
auth
----------------------------------------------------------------------------------
undefined: there is no cookie set, so show the login prompt in leaderboardNameInput
null :     cookie exists, auth remains null if we are processing the cookie or there
           was an error processing the cookie

auth's states are distict so that we have a chance to analyze the possible cookie
    before rendering the login prompt.
*/