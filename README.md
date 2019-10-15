This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Keybored

### Development
`npm start` is what I use for development.

Runs the app in the development mode.<br>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Staging
`npm run deploy` is what I use for staging, to https://esinlayo.github.io/keybored

For this setting, the "homepage" field in package.json must be set to `https://esinlayo.github.io/keybored`

This **does** affect the output in build, in that paths will prepend with /keybored

### Production

For this setting, the "homepage" field in package.json must be set to `https://keybored.fun` and run `npm run build`

Note that *npm run deploy* runs this build script as well, so we will be overwriting the build folder, but the staging was uploaded to the github repo already.

Now cd into the **build** folder. `scp -r . root@esinlayo.me:/var/www/keybored`


## Other possible scripts

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
