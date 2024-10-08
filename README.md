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

Then run `npm start`.

### Production

The environment variables documented in `.env.example`
will need to be configured in your deployment system;
the values must be present at build time.
