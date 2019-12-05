# [Keybored](https://keybored.fun)

This repository is for the client of the game found at [www.keybored.fun](https://keybored.fun)!

Keybored is a fun web game for testing your typing speed that includes a mode to invite and compete with your friends! It's not that difficult to cheat, but that's no fun, especially with friends.

## Notes
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Typography and main components were developed using [Material-UI](https://material-ui.com/)
- The game's friendly car mascot can be found on [easydrawingguides](https://easydrawingguides.com/how-to-draw-a-cartoon-car/)
- Icons for characters in play with friends mode from [FontAwesome](https://fontawesome.com/), bundled using [IcoMoon](https://icomoon.io/app/)
- The HTTP client was provided by [Axios](https://github.com/axios/axios)
- The multiplayer game client for play with friends mode was provided by [Colyseus](https://github.com/colyseus/colyseus.js/)
- Keybored-Server should be [here](https://github.com/esinlayo/keybored-server)

## Development
- Edit `./src/config.json` as needed and then run `npm start`
- Do development and then revert `./src/config.json` as needed.
- `npm run deploy` builds to `./build` and this is also what is uploaded to the github page. 
This command also stages to the github page.
For this setting, the "homepage" field in `./package.json` must be set to https://esinlayo.github.io/keybored
The "homepage" in `./package.json` *does* affect the output in build in that paths will be prepended with /keybored if /keybored is put as a suffix
- Run `npm run build` setting the "homepage" field in package.json to `https://keybored.fun` or `https://esinlayo.github.io` 
Note that this will overwrite the build folder.
- Copy the built files to the server: `scp -r ./build root@esinlayo.me:/var/www/keybored`

