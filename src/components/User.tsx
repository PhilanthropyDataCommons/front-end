import React from 'react';
import { useOidc, useOidcUser, OidcUserStatus } from '@axa-fr/react-oidc';
import { getLogger } from '../logger';

const logger = getLogger('<User>');

const User = () => {
  const { oidcUser, oidcUserLoadingState } = useOidcUser();
  const { login } = useOidc();

  switch (oidcUserLoadingState) {
    case OidcUserStatus.Loading:
      return <p>User information loading...</p>;
    case OidcUserStatus.Unauthenticated:
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => { login('/').catch(logger.error); }}
        >
          Login
        </button>
      );
    case OidcUserStatus.LoadingError:
      return <p>Failed to load user information</p>;
    default:
      return (
        <div>
          {oidcUser.name}
        </div>
      );
  }
};

export { User };
