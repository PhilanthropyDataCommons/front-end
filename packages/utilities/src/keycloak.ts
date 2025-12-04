import type { KeycloakServerConfig, KeycloakInitOptions } from 'keycloak-js';

interface VueKeycloakConfig {
	config: KeycloakServerConfig;
	init: KeycloakInitOptions;
}

const getKeycloakOptions = (
	authority?: string,
	clientId?: string,
	realm?: string,
): VueKeycloakConfig => {
	if (authority === undefined) {
		throw new Error('No Keycloak authority configured');
	}

	if (clientId === undefined) {
		throw new Error('No Keycloak client ID configured');
	}

	if (realm === undefined) {
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
			redirectUri: `${window.location.origin}${window.location.pathname}${window.location.search}`,
			scope: 'openid',
			checkLoginIframe: false,
		},
	};
};

export { getKeycloakOptions, type VueKeycloakConfig };
