import { createApp } from 'vue';
import { initRouter } from '@/router';
import App from '@/App.vue';
import type { Component } from 'vue';
import VueKeycloak from '@dsb-norge/vue-keycloak-js';
import { getOptions } from './keycloakConfig';
import './assets/main.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';

const keycloakOptions = getOptions(
	import.meta.env.VITE_KEYCLOAK_AUTHORITY,
	import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
	import.meta.env.VITE_KEYCLOAK_REALM,
);
const app = createApp(App as Component);

(async () => {
	app.use(VueKeycloak, {
		...keycloakOptions,
		onReady: () => {
			app.use(initRouter()).mount('#app');
		},
	});
})().catch((error) => {
	console.error('error initializing application', error);
});
