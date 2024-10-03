# Philanthropy Data Commons Front End

A UI for interacting with the data stored in the PDC service.

## Dependencies

The application depends on an
Open ID Connect ("OIDC")
identity provider ("IdP")
for authentication.
It should be agnostic about what kind of IdP is used.
To use the front-end application,
you will need to be able to log in.

## Configuration

### Identity Provider

The IdP needs a client for the front-end.
The IdP should be configured for the client to use the
[Authorization Code flow](https://oauth.net/2/grant-types/authorization-code/).
This client is a public client,
and so should _not_ have a secret,
and should not be able to log in with a client credentials grant.

Set the client root URL to the app's URL
(or `http://localhost:${PORT}` in development),
and set the redirect URI to `/authentication/callback`.

### Development

Run `npm install` from the top level of this tree.

Copy the `.env.example` file to `.env.local`,
and replace the placeholder values with your specifics.
Your new `.env.local` file will not be picked up by git.

Then run `npm start` (see [that script's documentation](#npm-start) for further details).

### Production

The environment variables documented in `.env.example`
will need to be configured in your deployment system;
the values must be present at build time.

This app can be deployed to Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/PhilanthropyDataCommons/front-end)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
