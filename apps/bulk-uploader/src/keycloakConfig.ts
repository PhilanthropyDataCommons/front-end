import type { KeycloakServerConfig, KeycloakInitOptions } from 'keycloak-js';

interface VueKeycloakConfig {
	config: KeycloakServerConfig;
	init: KeycloakInitOptions;
}

const getOptions = (
	authority?: string,
	clientId?: string,
	realm?: string,
): VueKeycloakConfig => {
	if (authority == null) {
		throw new Error('No Keycloak authority configured');
	}

	if (clientId == null) {
		throw new Error('No Keycloak client ID configured');
	}

	if (realm == null) {
		throw new Error('No Keycloak realm configured');
	}

	return {
		config: {
			url: authority,
			clientId,
			realm,
		},
		init: {
			onLoad: 'check-sso',
			redirectUri: `${window.location.origin}/`,
			scope: 'openid',
			checkLoginIframe: false,
		},
	};
};

export { getOptions };
