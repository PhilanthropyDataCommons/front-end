import type { OidcConfiguration } from '@axa-fr/react-oidc';

const getConfiguration = (
	authority?: string,
	clientId?: string,
): OidcConfiguration => {
	if (!authority) {
		throw new Error('No OpenID Connect authority configured');
	}

	if (!clientId) {
		throw new Error('No OpenID Connect client ID configured');
	}

	return {
		authority,
		client_id: clientId,
		redirect_uri: `${window.location.origin}/authentication/callback`,
		silent_redirect_uri: `${window.location.origin}/authentication/silent-callback`,
		scope: 'openid',
		preload_user_info: true,
	};
};

export { getConfiguration };
