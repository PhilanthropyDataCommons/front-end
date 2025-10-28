import { createApp } from 'vue';
import App from './App.vue';
import type { Component } from 'vue';
import VueKeycloak from '@dsb-norge/vue-keycloak-js';
import './assets/main.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';
import {
	getLogger,
	reportWebVitals,
	getKeycloakOptions,
	setupAuthGuard,
} from '@pdc/utilities';
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import { initRouter } from './router';

const logger = getLogger('index');

const keycloakOptions = getKeycloakOptions(
	import.meta.env.VITE_KEYCLOAK_AUTHORITY,
	import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
	import.meta.env.VITE_KEYCLOAK_REALM,
);
const app = createApp(App as Component);
const router = initRouter();
logger.debug(keycloakOptions, 'Keycloak options');

(async () => {
	app.use(VueKeycloak, {
		...keycloakOptions,
		onReady: () => {
			setupAuthGuard(router, useKeycloak());
			app.use(router).mount('#app');
		},
	});
})().catch((error: unknown) => {
	logger.error(error, 'error initializing application');
});

reportWebVitals();
