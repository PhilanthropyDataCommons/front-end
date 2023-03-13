import React from 'react';
import { useOidc, useOidcUser, OidcUserStatus } from '@axa-fr/react-oidc';
import { UserIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';
import { getLogger } from '../logger';

const logger = getLogger('<User>');

const User = () => {
  const { oidcUser, oidcUserLoadingState } = useOidcUser();
  const { login } = useOidc();

  switch (oidcUserLoadingState) {
    case OidcUserStatus.Loading:
      return (
        <Button bordered disabled>
          <UserIcon />
          Loading…
        </Button>
      );
    case OidcUserStatus.Unauthenticated:
      return (
        <Button
          bordered
          onClick={() => { login('/').catch(logger.error); }}
        >
          <UserIcon />
          Log in
        </Button>
      );
    case OidcUserStatus.LoadingError:
      return (
        <Button bordered color="red">
          <UserIcon />
          User loading failed
        </Button>
      );
    default:
      return (
        <Button bordered>
          <UserIcon />
          {oidcUser.name}
        </Button>
      );
  }
};

export { User };
