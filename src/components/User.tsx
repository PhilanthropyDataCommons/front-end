import React from 'react';
import { useOidc, useOidcUser, OidcUserStatus } from '@axa-fr/react-oidc';
import { UserIcon } from '@heroicons/react/24/solid';
import { getLogger } from '../logger';

const logger = getLogger('<User>');

const User = () => {
	const { oidcUser, oidcUserLoadingState } = useOidcUser();
	const { login } = useOidc();

	switch (oidcUserLoadingState) {
		case OidcUserStatus.Loading:
			return (
				<div className="App-navbar__item App-navbar__item--loading">
					<UserIcon />
					Loading…
				</div>
			);
		case OidcUserStatus.Unauthenticated:
			return (
				<button
					className="App-navbar__item"
					onClick={() => {
						login('/proposals').catch(logger.error);
					}}
					type="button"
				>
					<UserIcon />
					Log in
				</button>
			);
		case OidcUserStatus.LoadingError:
			return (
				<div className="App-navbar__item App-navbar__item--error">
					<UserIcon />
					User loading failed
				</div>
			);
		default:
			return (
				<div className="App-navbar__item">
					<UserIcon />
					{oidcUser.name}
				</div>
			);
	}
};

export { User };
