This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This application runs on Mocha as test engine, it also has configuration to run on the [vscode Mocha sidebar](https://marketplace.visualstudio.com/items?itemName=maty.vscode-mocha-sidebar), if installed.

This applications uses [Chai](https://www.chaijs.com/api/) as assertion library and [chai-enzyme](https://github.com/producthunt/chai-enzyme), based on [Enzyme](https://airbnb.io/enzyme/docs/api/), for testing ReactJS components, this is just a minimal setup and you may need, or feel like using other libraries to test your ReactJS application.

As soon as you clone the project, in order to start working on it, do an npm install in the root folder.

Running on Linux, open vscode from the terminal, if the location of vscode is in your path (normally is). Otherwise vscode might not be able to find your local node install, this happens if you use mvn.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner MochaJS, not in watch mode.

Running on Windows: you will have to change the test script in your package.json, in the `scripts` object:
change the script as follows:
`set NODE_ENV=test&& mocha --require @babel/register --require ignore-styles src/test/*.test.js`

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
