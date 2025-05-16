import type { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

interface vueKeycloakConfig {
	config: KeycloakConfig;
	init: KeycloakInitOptions;
}

const getOptions = (
	authority?: string,
	clientId?: string,
	realm?: string,
): vueKeycloakConfig => {
	if (!authority) {
		throw new Error('No OpenID Connect authority configured');
	}

	if (!clientId) {
		throw new Error('No OpenID Connect client ID configured');
	}

	if (!realm) {
		throw new Error('No Keycloak realm configured');
	}

	return {
		config: {
			url: authority,
			clientId: clientId,
			realm: realm,
		},
		init: {
			onLoad: 'check-sso',
			redirectUri: `${window.location.origin}/authentication/callback`,
			silentCheckSsoRedirectUri: `${window.location.origin}/authentication/silent-callback`,
			scope: 'openid',
			checkLoginIframe: false,
		},
	};
};

export { getOptions };
