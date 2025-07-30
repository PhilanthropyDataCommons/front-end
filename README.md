# Philanthropy Data Commons Front End Monorepo

A Monorepo for applications interacting with the data stored in the PDC service.

## Dependencies

Use of these applications depends on an
Open ID Connect ("OIDC")
identity provider ("IdP")
for authentication.
It should be agnostic about what kind of IdP is used.
To use the applications,
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

Application management is handled at the top level of the repository.
To install all application dependencies, run `npm install` from
the top level of the repository.

To install a specific application's dependencies, run `npm install`
from the application's directory.

Copy the `.env.example` file to `.env.local`,
and replace the placeholder values with your specifics.
Your new `.env.local` file will not be picked up by git.

Then run `npm start -w {application-name}`, where `{application-name}` is the name of the application you want to start.

### Production

The environment variables documented in `.env.example`
will need to be configured in your deployment system;
the values must be present at build time.

This app can be deployed to multiple platform services:

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/PhilanthropyDataCommons/front-end/tree/main)
